import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Vite middleware for development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);

  // API routes
  app.get("/api/status", (req, res) => {
    res.json({ status: "OK", timestamp: Date.now() });
  });

  // Catch-all para SPA com transformação do Vite
  app.get("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      let template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`=== SERVIDOR COM VITE RODANDO NA PORTA ${PORT} ===`);
  });
}

startServer();
