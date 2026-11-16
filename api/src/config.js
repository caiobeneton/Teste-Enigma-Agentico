import path from "node:path";
import { fileURLToPath } from "node:url";
import { accessSync, constants, mkdirSync, mkdtempSync, rmdirSync, statSync, existsSync } from "node:fs";

const defaultDataDirectory = fileURLToPath(new URL("../../data/", import.meta.url));

export function loadConfig(env) {
  const mode = env.NODE_ENV === undefined ? "development" : env.NODE_ENV;
  if (!["development", "test", "production"].includes(mode)) throw new Error("NODE_ENV deve ser development, test ou production.");
  const rawPort = env.PORT === undefined ? "3000" : env.PORT;
  if (!/^\d+$/.test(rawPort) || Number(rawPort) < 1 || Number(rawPort) > 65535) throw new Error("PORT deve ser inteiro entre 1 e 65535.");
  const production = mode === "production";
  const rawOrigin = env.APP_ORIGIN === undefined && !production ? "http://localhost:5173" : env.APP_ORIGIN;
  let origin;
  try { origin = new URL(rawOrigin); } catch { throw new Error("APP_ORIGIN deve ser uma origem válida."); }
  if (origin.username || origin.password || origin.pathname !== "/" || origin.search || origin.hash || !["http:", "https:"].includes(origin.protocol)) throw new Error("APP_ORIGIN deve conter somente uma origem HTTP(S).");
  if (production && origin.protocol !== "https:") throw new Error("APP_ORIGIN deve usar HTTPS em produção.");
  if (!production && !["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname)) throw new Error("APP_ORIGIN deve ser local em desenvolvimento e teste.");
  const databasePath = env.DATABASE_PATH === undefined && !production ? path.join(defaultDataDirectory, "nexo.sqlite") : env.DATABASE_PATH;
  if (!databasePath || !path.isAbsolute(databasePath) || /[\\/]$/.test(databasePath)) throw new Error("DATABASE_PATH deve ser um caminho absoluto para arquivo.");
  if (process.platform === "win32") {
    const parts = databasePath.slice(path.parse(databasePath).root.length).split(/[\\/]/);
    const invalid = parts.some(part => /[<>:"|?*\x00-\x1f]/.test(part) || /[. ]$/.test(part) || /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part));
    if (invalid) throw new Error("DATABASE_PATH contém nome de arquivo ou diretório inválido no Windows.");
  }
  if (production && (!env.SESSION_SECRET || !env.SESSION_SECRET.trim())) throw new Error("SESSION_SECRET é obrigatório em produção.");
  return { mode, port: Number(rawPort), origin: origin.origin, databasePath, sessionSecret: env.SESSION_SECRET };
}

export function validateStorage(config) {
  const directory = path.dirname(config.databasePath);
  try {
    if (config.mode !== "production" && directory === defaultDataDirectory.replace(/[\\/]$/, "")) mkdirSync(directory, { recursive: true });
    if (!statSync(directory).isDirectory()) throw new Error();
    accessSync(directory, constants.W_OK);
    if (existsSync(config.databasePath) && !statSync(config.databasePath).isFile()) throw new Error();
    const probe = mkdtempSync(path.join(directory, ".nexo-write-check-"));
    rmdirSync(probe);
  } catch { throw new Error("DATABASE_PATH exige arquivo e diretório pai existente e gravável."); }
}
