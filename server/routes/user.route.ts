import express from "express";
import { registerUser, loginUser, getMe, editProfile } from "../controllers";
import { validateAuth } from "../middleware/auth.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", validateAuth, getMe);
router.put("/profile/edit", validateAuth, editProfile);

export { router as userRouter };
