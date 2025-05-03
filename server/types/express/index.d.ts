import { TokenPayload } from "../../utils/token_util";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}
