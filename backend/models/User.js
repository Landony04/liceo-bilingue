import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  nombre: {
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
  rol: {
    type: String,
    required: false,
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
