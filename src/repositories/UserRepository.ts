import bcrypt from "bcryptjs";
import { client } from "@database";
import { UserSchema, UserLoginSchema } from "@DTOs";
import { QueryResponseUser } from "@repositories";

class UserRepository {
  async createUser(
    username: string,
    password: string,
    email: string
  ): Promise<{ status: number; data: { message: string } | Error }> {
    try {
      const { error } = UserSchema.validate({ username, password, email }, { abortEarly: false });
      if (error) {
        return { status: 400, data: new Error(error.message) };
      }

      const passwordEncrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      await client.query(
        `INSERT INTO public.user (id, username, password, email) VALUES (DEFAULT, $1, $2, $3)`,
        [username, passwordEncrypted, email]
      );

      return { status: 201, data: { message: "Usuario criado com sucesso!" } };
    } catch (error) {
      console.log(error);
      return { status: 400, data: new Error(error) };
    }
  }

  async loginUser(
    username: string,
    password: string
  ): Promise<{ status: number; data: { message: string } | Error }> {
    const { error } = UserLoginSchema.validate({ username, password }, { abortEarly: false });
    if (error) {
      return { status: 400, data: new Error(error.message) };
    }
    const { rows } = await client.query<QueryResponseUser>(
      "SELECT * FROM public.user WHERE username=$1",
      [username]
    );

    if (rows.length === 0) {
      return { status: 400, data: new Error("Usuario não existe!") };
    }

    const user = rows[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return { status: 401, data: new Error("Senha incorreta!") };
    }

    return { status: 200, data: { message: "Usuario Logado" } };
  }
}

export default new UserRepository();
