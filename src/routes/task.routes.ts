import express from "express";
import taskController from "../controller/task.controller";
import { jwtVerifyToken } from "../middlewares/jwtVerify.middleware";

const taskRouter = express.Router();

taskRouter.get("/", jwtVerifyToken, taskController.getAll);
taskRouter.get("/:id", jwtVerifyToken, taskController.get);
taskRouter.post("/", jwtVerifyToken, taskController.create);
taskRouter.put("/:id", jwtVerifyToken, taskController.update);
taskRouter.delete("/:id", jwtVerifyToken, taskController.delete);

export default taskRouter;
