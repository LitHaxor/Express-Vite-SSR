import express from "express";
import morganBody from "morgan-body";
import authRouter from "./routes/auth.routes";
import taskRouter from "./routes/task.routes";
import { configureDatabase } from "./database";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { configureVite } from "./configure.vite";
import { configureSwagger } from "./swagger.config";
import { PORT, NODE_ENV } from "./config";

export async function bootstrap() {
  const app = express();

  // Middlewares
  app.use(express.json());
  morganBody(app);

  // Routes
  app.use("/api/tasks/", taskRouter);
  app.use("/api/auth/", authRouter);

  // database
  configureDatabase();

  configureVite(app);

  // Swagger
  configureSwagger(app);

  // Error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on http://[::]:${PORT} in ${NODE_ENV} mode`);
  });
}
