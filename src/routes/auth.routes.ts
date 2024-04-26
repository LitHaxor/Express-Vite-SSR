import express from "express";
import userController from "../controller/user.controller";

const authRouter = express.Router();

authRouter.post("/login", userController.login);
authRouter.post("/register", userController.register);

export default authRouter;
