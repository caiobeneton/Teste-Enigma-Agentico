import { createApp } from "./app.js";
import { loadConfig, validateStorage } from "./config.js";

try {
  const config = loadConfig(process.env);
  validateStorage(config);
  const app = createApp({ production: config.mode === "production" });
  app.listen(config.port, () => console.log(`Servidor disponível em http://localhost:${config.port}`));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
