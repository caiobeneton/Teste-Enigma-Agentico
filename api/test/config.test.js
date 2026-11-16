import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { loadConfig, validateStorage } from "../src/config.js";
import { createApp } from "../src/app.js";

const serverFile = fileURLToPath(new URL("../src/server.js", import.meta.url));
const migrateFile = fileURLToPath(new URL("../src/migrate.js", import.meta.url));
const dir = mkdtempSync(path.join(os.tmpdir(), "nexo-config-test-"));
const valid = { NODE_ENV: "production", PORT: "4321", APP_ORIGIN: "https://example.test", DATABASE_PATH: path.join(dir, "test.sqlite"), SESSION_SECRET: "test-secret-value" };
test.after(() => rmSync(dir, { recursive: true, force: true }));

test("valida ambiente sem alterar segredo", () => {
  assert.equal(loadConfig({}).port, 3000);
  assert.equal(loadConfig(valid).sessionSecret, valid.SESSION_SECRET);
  for (const [env, variable] of [
    [{...valid, NODE_ENV: "unknown"}, "NODE_ENV"],
    [{...valid, PORT: "123abc"}, "PORT"],
    [{...valid, PORT: "0"}, "PORT"],
    [{...valid, PORT: "65536"}, "PORT"],
    [{...valid, APP_ORIGIN: "http://example.test"}, "APP_ORIGIN"],
    [{...valid, APP_ORIGIN: "https://example.test/path"}, "APP_ORIGIN"],
    [{...valid, APP_ORIGIN: "https://user:pass@example.test"}, "APP_ORIGIN"],
    [{...valid, DATABASE_PATH: "relative.sqlite"}, "DATABASE_PATH"],
    [{...valid, SESSION_SECRET: " "}, "SESSION_SECRET"],
  ]) assert.throws(() => loadConfig(env), new RegExp(variable));
  assert.throws(() => loadConfig({NODE_ENV: "production"}), /APP_ORIGIN/);
  assert.throws(() => validateStorage(loadConfig({...valid, DATABASE_PATH: path.join(dir,"missing","test.sqlite")})), /DATABASE_PATH/);
  assert.throws(() => validateStorage(loadConfig({...valid, DATABASE_PATH: dir})), /DATABASE_PATH/);
  validateStorage(loadConfig(valid));
});

test("configurações inválidas encerram processo antes de ouvir e não revelam segredo", () => {
  for (const [overrides, variable] of [
    [{NODE_ENV: "invalid"}, "NODE_ENV"],
    [{PORT: "invalid"}, "PORT"],
    [{APP_ORIGIN: "http://example.test"}, "APP_ORIGIN"],
    [{DATABASE_PATH: "relative.sqlite"}, "DATABASE_PATH"],
    [{SESSION_SECRET: " "}, "SESSION_SECRET"],
    [{DATABASE_PATH: path.join(dir, "missing", "file.sqlite")}, "DATABASE_PATH"],
  ]) {
    const child = spawnSync(process.execPath, [serverFile], {env: {...process.env, ...valid, ...overrides}, encoding: "utf8", timeout: 3000});
    assert.ifError(child.error);
    assert.notEqual(child.status, 0);
    assert.match(child.stderr, new RegExp(variable));
    assert.doesNotMatch(child.stderr + child.stdout, /test-secret-value|Servidor disponível/);
  }
});

test("nome de arquivo inválido no Windows falha antes de abrir porta", {skip: process.platform !== "win32"}, () => {
  const child = spawnSync(process.execPath, [serverFile], {
    env: {...process.env, ...valid, DATABASE_PATH: path.join(dir, "nexo?.sqlite")},
    encoding: "utf8", timeout: 3000,
  });
  assert.ifError(child.error);
  assert.notEqual(child.status, 0);
  assert.match(child.stderr, /DATABASE_PATH/);
  assert.doesNotMatch(child.stderr + child.stdout, /test-secret-value|Servidor disponível/);
});

test("migração pendente informa a tarefa 2.1 e falha", () => {
  const child = spawnSync(process.execPath, [migrateFile], {encoding: "utf8", timeout: 3000});
  assert.ifError(child.error);
  assert.notEqual(child.status, 0);
  assert.match(child.stderr, /2\.1/);
});

test("servidor de produção mantém contratos HTTP", async () => {
  const config = loadConfig(valid);
  validateStorage(config);
  const server = createApp({production: true}).listen(0, "127.0.0.1");
  await new Promise(resolve => server.once("listening", resolve));
  try {
    const base = `http://127.0.0.1:${server.address().port}`;
    const health = await fetch(base + "/api/health");
    assert.equal(health.status, 200);
    assert.deepEqual(await health.json(), {status: "ok"});
    const missing = await fetch(base + "/api/ausente", {headers:{accept:"text/html"}});
    assert.equal(missing.status, 404);
    assert.match(missing.headers.get("content-type"), /application\/json/);
    assert.equal((await fetch(base + "/nexo/novo", {headers:{accept:"text/html"}})).status, 200);
    assert.equal((await fetch(base + "/ausente.js", {headers:{accept:"text/html"}})).status, 404);
    assert.equal((await fetch(base + "/nexo/novo", {headers:{accept:"*/*"}})).status, 404);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
