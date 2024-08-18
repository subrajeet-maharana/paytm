import express from "express";
import { z } from "zod";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/auth.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5s" });
};

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

const signupSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  password: z.string().min(3),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const updateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        message: "Give valid input",
      });
    } else {
      await User.updateOne(req.userId, req.body);
      res.status(200).json({
        message: "User Updated Successfully",
      });
    }
  } catch (error) {
    res.status(411).json({
      message: "Error while updating information" + error.message,
    });
  }
});

router.get("/auth", authMiddleware, async (req, res) => {
  const { firstName } = await User.findOne({ email: req.email });
  res.json({
    firstName: firstName,
    message: "Authenticated Routes",
  });
});

router.post("/signup", async (req, res) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    signupSchema.safeParse(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(411).json({
        message: "Email Already Taken | Write a valid Email ID",
      });
    }

    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    const newUser = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      refreshToken: refreshToken,
    });

    await newUser.save();

    res.status(200).json({
      message: "User Created Successfully",
      user: newUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid User Input ",
      details: error.errors,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const { success } = loginSchema.safeParse({ email, password });

    if (!success) {
      res.status(400).json({
        message: "Invalid User Input",
        details: error.errors,
      });
    }
    const existingUser = await User.findOne({ email, password });
    if (!existingUser) {
      res.status(411).json({
        message: "User doesn't exist.",
      });
    }
    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.status(200).json({
      user: existingUser,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/refresh", async (req, res) => {
  //Get the refresh token from the request header
  const authorization = req.headers.authorization;
  console.log(authorization);

  const refreshToken = authorization.split(" ")[1];
  console.log(refreshToken);
  //Check if the refreshTOken is valid or not
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res
      .status(400)
      .json({ message: "Refresh token is not valid or User not present" });
  }
  console.log(user);
  //If valid then we'll verify the refreshToken if that belong to that user
  jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (decoded.email === user.email) {
      //then we'll create a new access token and send that to user
      const newAccessToken = generateAccessToken({ email: user.email });
      return res.status(200).json({ accessToken: newAccessToken });
    }
  });
});

export default router;
