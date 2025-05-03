import { Request, Response, NextFunction } from "express";
import { User, UserDoc } from "../models";
import { validateToken } from "../utils/token_util";

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await validateToken(req, res, async () => {
      const user = await User.findById(req.user?._id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user as UserDoc;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
};
