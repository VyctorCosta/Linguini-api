import { DataRepository } from "@repositories";
import { Request, Response } from "express";

class UserController {
  async getData(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { status, data } = await DataRepository.get(+id);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async getRecipes(req: Request, res: Response) {
    try {
      const { ingredients } = req.body;

      const { status, data } = await DataRepository.getRecipes(ingredients);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async getIngredients(req: Request, res: Response) {
    try {
      const { status, data } = await DataRepository.getIngredients();

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
}

export default new UserController();
