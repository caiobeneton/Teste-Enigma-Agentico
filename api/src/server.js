import { createApp } from "./app.js";

const production = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;
const app = createApp({ production });
app.listen(port, () => console.log(`Servidor disponível em http://localhost:${port}`));
