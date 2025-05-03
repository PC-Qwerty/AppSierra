import jwt from "jsonwebtoken";
import { createError } from "./error";
import { NextFunction, Request, Response } from "express";
import { UserDoc } from "../models/user.model";
import { Types } from "mongoose";

interface TokenPayload {
  id: Types.ObjectId;
  name: string;
  email: string;
  country: string;
  projectCount: number;
}

export const generateToken = (user: UserDoc) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(user.toJSON(), secret, {
    expiresIn: "1d",
  });
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      return next(createError(401, "User not logged in or is not authorized!"));
    }

    const bearerToken = token.split(" ")[1];
    if (!bearerToken) {
      return next(createError(403, "Invalid Token"));
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const payload = jwt.verify(bearerToken, secret) as TokenPayload;
    req.user = payload as UserDoc;

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};
