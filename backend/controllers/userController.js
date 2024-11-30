import User from "../models/User.js";
import generateJWT from "../helpers/generateJWT.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si usuario existe
  const user = await User.findOne({ email });

  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({ message: error.message });
  }

  if (await usuario.checkPassword(password)) {
    res.json({
      _id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      token: generateJWT(),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({
      message: error.message,
    });
  }
};

const profile = (req, res) => {
  const { user } = req;

  res.json(user);
};

const register = (req, res) => {
  res.send("Desde API/USERS/REGISTER");
};

export { login, profile, register };
