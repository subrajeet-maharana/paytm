import express from "express";
import { z } from "zod";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/auth.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

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
  console.log(firstName);
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
    console.log(existingUser);
    if (existingUser) {
      res.status(411).json({
        message: "Email Already Taken | Write a valid Email ID",
      });
    }

    const newUser = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });

    await newUser.save();

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "5h" });
    res.status(200).json({
      user: newUser,
      message: "User Created Successfully",
      jwt: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid User Input from Catch Block",
      details: error.errors,
    });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    loginSchema.parse({ email, password });
    const existingUser = await User.findOne({ email, password });
    if (!existingUser) {
      res.status(411).json({
        message: "User doesn't exist.",
      });
    }
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "5h" });
    res.status(200).json({
      jwt: token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Invalid User Input",
      details: error.errors,
    });
  }
});

export default router;
