import { UserRepository } from "@repositories";
import { Request, Response } from "express";

class UserController {
  async userPost(req: Request, res: Response) {
    try {
      const { username, password, email } = req.body;

      const { status, data } = await UserRepository.createUser(username, password, email);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      const { status, data } = await UserRepository.loginUser(username, password);

      if (data instanceof Error) {
        return res.status(status).json({ message: data.message });
      }

      return res.status(status).json(data);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
}

export default new UserController();
