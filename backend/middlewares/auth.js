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
          message: error.message,
        });
      }
      return decoded;
    });

    //Check if the access token is expired or not
    const currenTime = Date.now() / 1000;
    if (decoded.exp < currenTime) {
      res.json({
        message: "Token Expired",
      });
    }

    //If successfully decoded then pass the userId in request
    if (decoded) {
      req.userId = decoded.userId;
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
