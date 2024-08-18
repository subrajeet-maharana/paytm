import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const decoded = jwt.verify(token, JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(400).json({
          message: "From JWT.verify() " + error.message,
        });
      }
      return decoded;
    });
    console.log(decoded);
    const currenTime = Date.now() / 1000;
    if (decoded.exp < currenTime) {
      res.json({
        message: "Token Expired",
      });
    }
    console.log("Middleware: " + decoded);
    if (decoded) {
      req.userId = decoded._id;
      next();
    } else {
      res.json({
        message: "Invalid User Credentials",
      });
    }
  } catch (error) {
    res.json({
      message: "From catch of auth middleware " + error.message,
    });
  }
};

export default authMiddleware;
