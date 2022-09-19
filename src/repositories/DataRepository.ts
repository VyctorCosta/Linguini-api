import { client } from "@database";

type QueryResult = {
  id: number;
  recipe_title: string;
  vote_count: number;
  rating: number;
  description: string;
  cuisine: string;
  course: string;
  diet: string;
  prep_time: number;
  cook_time: number;
  ingredients: string;
  instructions: string;
  author: string;
  tags: string;
  category: string;
}[];

type QueryRecipeResult = {
  id: number;
  recipe_title: string;
  cuisine: string;
  diet: string;
  prep_time: string;
  ingredients: string;
};

type QueryIngredientsResult = {
  ingredient: string;
};

class UserRepository {
  async get(id: number): Promise<{ status: number; data: QueryResult | Error }> {
    try {
      if (!id) {
        return { status: 400, data: new Error("Precisa enviar um id") };
      }

      const {
        rows: [data],
      } = await client.query<QueryResult>(`SELECT * FROM public.data WHERE id=$1`, [id]);

      if (!data) {
        return { status: 400, data: new Error("Esse id não corresponde a nenhuma receita.") };
      }

      return { status: 200, data };
    } catch (error) {
      console.log(error);
      return { status: 400, data: new Error(error) };
    }
  }

  async getRecipes(
    ingredients: string[]
  ): Promise<{ status: number; data: QueryRecipeResult[] | Error | null }> {
    try {
      if (!ingredients || !(ingredients instanceof Array) || ingredients?.length === 0) {
        return {
          status: 400,
          data: new Error("Você precisa enviar um array de ingredients válido"),
        };
      }
      const checker = (arr: string[], target: string[]) => target.some((v) => arr.includes(v));

      const { rows } = await client.query<QueryRecipeResult>(
        `SELECT id, recipe_title, cuisine, diet, prep_time, ingredients FROM public.data`
      );

      const data = rows.filter(({ ingredients: ingredient_row }) => {
        const array_ingredients = ingredient_row
          .split("|")
          .map((value) => value.trim().toLowerCase());
        const lower_ingredients = ingredients.map((value) => value.toLowerCase());

        return checker(array_ingredients, lower_ingredients);
      });

      return { status: 200, data };
    } catch (error) {
      console.log(error);
      return { status: 400, data: new Error(error) };
    }
  }

  async getIngredients(): Promise<{ status: number; data: string[] | Error }> {
    try {
      const { rows } = await client.query<QueryIngredientsResult>(
        `SELECT ingredient FROM public.ingredients`
      );

      const data = rows.map(({ ingredient }) => ingredient[0].toUpperCase() + ingredient.slice(1));

      return { status: 200, data };
    } catch (error) {
      console.log(error);
      return { status: 400, data: new Error(error) };
    }
  }
}

export default new UserRepository();
