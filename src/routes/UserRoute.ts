import { UserController } from "@controllers";
import { Router } from "express";

const UserRouter = Router()

UserRouter.post("/", UserController.userPost);
UserRouter.post("/login", UserController.userLogin);

export default UserRouter;