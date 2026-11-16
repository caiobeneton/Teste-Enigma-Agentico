import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const buildDirectory = fileURLToPath(new URL("../../web/dist/", import.meta.url));

export function createApp({ production = false } = {}) {
  const app = express();

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api", (_req, res) => res.status(404).json({ error: { code: "NOT_FOUND", message: "Recurso não encontrado." } }));

  if (production) {
    const index = path.join(buildDirectory, "index.html");
    if (!existsSync(index)) throw new Error("Build do frontend ausente; execute npm run build.");
    app.use(express.static(buildDirectory));
    app.use((req, res, next) => {
      const html = /(?:^|,)\s*text\/html\s*(?:;[^,]*)?(?:,|$)/i.test(req.get("accept") || "");
      if ((req.method === "GET" || req.method === "HEAD") && html && req.accepts("html") && !path.extname(req.path)) {
        return res.sendFile(index);
      }
      return next();
    });
  }

  return app;
}
