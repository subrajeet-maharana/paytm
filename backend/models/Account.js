import mongoose from "mongoose";
import User from "./User.js";

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
