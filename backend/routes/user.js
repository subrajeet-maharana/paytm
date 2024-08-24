import express from "express";
import { z } from "zod";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authMiddleware from "../middlewares/auth.js";
import Account from "../models/Account.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
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

router.get("/auth", authMiddleware, async (req, res) => {
  const { firstName } = await User.findOne({ email: req.email });
  res.json({
    firstName: firstName,
    message: "Authenticated Routes",
  });
});

router.post("/signup", async (req, res) => {
  //To caonvert all the values of the req.body object to lowercase
  // req.body = Object.fromEntries(
  //     Object.entries(req.body).map(([key, value]) => [key, value.toLowerCase()]),
  // );
  req.body.email = req.body.email.toLowerCase();
  const { firstName, lastName, email, password } = req.body;

  try {
    signupSchema.safeParse(req.body);
    const existingUser = await User.findOne({ email });
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

    const accessToken = generateAccessToken({ userId: newUser._id });
    const refreshToken = generateRefreshToken({ userId: newUser._id });
    newUser.refreshToken = refreshToken;
    await newUser.save();

    const balance = Math.floor(10000 * 100 * Math.random()) + 1;

    //Creating account and linking with the user account
    try {
      const newAccount = new Account({
        user: newUser._id,
        balance: balance,
      });
      await newAccount.save();
      newUser.account = newAccount._id;
      newUser.save();
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
    return res.status(200).json({
      message: "User Created Successfully",
      user: newUser,
      balance: balance / 100.0,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid User Input ",
      details: error.errors,
    });
  }
});

router.post("/signin", async (req, res) => {
  //To caonvert all the values of the req.body object to lowercase
  // req.body = Object.fromEntries(
  //     Object.entries(req.body).map(([key, value]) => [key, value.toLowerCase()]),
  // );
  req.body.email = req.body.email.toLowerCase();
  const { email, password } = req.body;
  try {
    loginSchema.safeParse({ email, password });
    const options = { email };
    const existingUser = await User.findOne(options);
    if (!existingUser) {
      return res.status(404).json({
        message: "User doesn't exist.",
      });
    }
    const accessToken = generateAccessToken({ userId: existingUser._id });
    const refreshToken = generateRefreshToken({ userId: existingUser._id });

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    return res.status(200).json({
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

router.put("/update", authMiddleware, async (req, res) => {
  //To caonvert all the values of the req.body object to lowercase
  // req.body = Object.fromEntries(
  //     Object.entries(req.body).map(([key, value]) => [key, value.toLowerCase()]),
  // );
  req.body.email = req.body.email.toLowerCase();
  try {
    const { success } = updateSchema.safeParse(req.body);
    if (!success) {
      res.status(411).json({
        message: "Give valid input",
      });
    } else {
      await User.updateOne(req.userId, req.body);
      return res.status(200).json({
        message: "User Updated Successfully",
      });
    }
  } catch (error) {
    res.status(411).json({
      message: "Error while updating information" + error.message,
    });
  }
});

router.post("/refresh", async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/search", authMiddleware, async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [{ firstName: filter }, { lastName: filter }],
    });

    return res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/allusers", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    });
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    return res.status(400).json({
      Errormessage: error.message,
    });
  }
});

export default router;
