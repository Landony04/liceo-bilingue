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

  if (await user.checkPassword(password)) {
    res.json({
      _id: user._id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
      token: generateJWT(user._id, user.role),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  const { email } = req.body;

  if (req.user.role !== "director") {
    return res
      .status(403)
      .json({ message: "No tienes permisos para esta acción" });
  }

  // Validate if user exist
  const userExist = await User.findOne({ email });

  if (userExist) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ message: error.message });
  }

  try {
    const user = new User(req.body);
    const userSave = await user.save();

    return res.status(200).json(userSave);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { login, register };
