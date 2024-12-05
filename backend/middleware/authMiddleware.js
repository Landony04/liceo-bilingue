import jwt from "jsonwebtoken";
import User from "../models/User.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password -token");

      req.user = {
        id: decoded.id,
        role: decoded.role,
      };

      return next();
    } catch (error) {
      const newError = new Error("Token no Válido");
      return res.status(403).json({ message: newError.message });
    }
  }

  if (!token) {
    const error = new Error("Token no Válido o inexistente");
    return res.status(403).json({ message: error.message });
  }

  next();
};

export default checkAuth;
