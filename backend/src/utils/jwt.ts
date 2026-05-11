import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

export type AuthTokenPayload = {
  userId: string;
  role: "adopter" | "rescuer" | "admin";
};

export const generateToken = (payload: AuthTokenPayload) => {
  const signOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    ...signOptions,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload;
};
