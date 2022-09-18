import { DataController } from "@controllers";
import { Router } from "express";

const DataRouter = Router()

DataRouter.get("/:id?", DataController.getData);
DataRouter.post("/", DataController.getRecipes);

export default DataRouter;