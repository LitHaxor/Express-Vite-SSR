import fs from "fs/promises";
import type { Request, Response, NextFunction } from "express";
import { Express } from "express";
import compression from "compression";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";
import express from "express";

// let __filename = fileURLToPath(import.meta.url);
// let __dirname = dirname(__filename);

const resolve = (p: string) => path.resolve(__dirname, p);

const getStyleSheets = async () => {
  try {
    const assetpath = resolve("public");
    const files = await fs.readdir(assetpath);
    const cssAssets = files.filter((l: any) => l.endsWith(".css"));
    const allContent = [];
    for (const asset of cssAssets) {
      const content = await fs.readFile(path.join(assetpath, asset), "utf-8");
      allContent.push(`<style type="text/css">${content}</style>`);
    }
    return allContent.join("\n");
  } catch {
    return "";
  }
};

export async function configureVite(app: Express) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    optimizeDeps: { include: [] },
  });

  app.use(vite.middlewares);

  const assetsDir = resolve("public");
  const requestHandler = express.static(assetsDir);
  app.use(requestHandler);
  app.use("/public", requestHandler);

  const stylesheets = getStyleSheets();

  const baseTemplate = await fs.readFile(`${__dirname}/../index.html`, "utf-8");
  const buildPath = path.join(__dirname, "/client/entry-server.tsx");

  const { render } = await import(buildPath);

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      const template = await vite.transformIndexHtml(url, baseTemplate);

      const appHtml = await render(url);
      const cssAssets = await stylesheets;

      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--head-->`, cssAssets);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      vite.ssrFixStacktrace(e);
      console.log(e.stack);

      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
