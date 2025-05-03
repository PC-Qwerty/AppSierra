import { UserDoc } from "../models/user.model";
import { Types } from "mongoose";

declare module "express" {
  interface Request {
    user?: UserDoc & { _id: Types.ObjectId };
  }
}
