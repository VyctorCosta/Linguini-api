import { Router } from "express";
import UserRouter from "./UserRoute";
import DataRouter from "./DataRoute";
import { DataController } from '@controllers';

const routes = Router();

routes.use("/user", UserRouter);
routes.use("/data", DataRouter);
routes.get('/ingredients', DataController.getIngredients);

export default routes;