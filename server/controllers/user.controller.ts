import bcrypt from "bcryptjs";
import { User, UserDoc } from "../models";
import { Request, Response } from "express";
import { generateToken } from "../utils/token_util";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, country } = req.body;

  if (!name || !email || !password || !country) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    country,
  });

  if (user) {
    const userDoc = user as UserDoc;
    res.status(201).json({
      user: userDoc,
      token: generateToken(userDoc),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const userDoc = user as UserDoc;
    res.status(200).json({
      user: userDoc,
      token: generateToken(userDoc),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
};

const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    throw new Error("Not Authorized");
  }

  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    country: req.user.country,
    projectCount: req.user.projectCount,
  };
  res.status(200).json(user);
};

const editProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized" });
    throw new Error("Not Authorized");
  }
  const { id } = req.user;
  const { name, email, country } = req.body;

  if (!name && !email && !country) {
    res.status(400);
    throw new Error("Please provide at least one field to update");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  if (country) {
    user.country = country;
  }

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
};

export { registerUser, loginUser, getMe, editProfile };
