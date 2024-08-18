import mongoose from "mongoose";
import Account from "./Account.js";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    maxlength: 50,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: false,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Account,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
