import Joi from "joi";

export const UserSchema = Joi.object<UserType>({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const UserLoginSchema = Joi.object<UserType>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export type UserType = {
  username: string;
  password: string;
  email: string;
};