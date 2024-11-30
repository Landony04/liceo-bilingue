import mongoose from "mongoose";
import bcrypt from "bcrypt";
import generateId from "../helpers/generateId.js";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  cellPhone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: false,
  },
  token: {
    type: String,
    default: generateId(),
  },
});

userSchema.methods.checkPassword = async function (formPassword) {
  return await bcrypt.compare(formPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
