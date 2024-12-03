import Director from "../models/Director.js";

const addDirector = async (req, res) => {
  const { email } = req.body;

  // Validate if director exist
  const directorExist = Director.findOne({ email });

  if (directorExist) {
    const error = new Error("El director ya existe");
    return res.status(400).json({ message: error.message });
  }

  try {
    // Save new Director
    const director = new Director(req.body);
    const saveDirector = await director.save();

    return res.status(200).json(saveDirector);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Get error specific messages
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    const newError = new Error("Error al crear el Director");
    return res.status(500).json({ message: newError.message });
  }
};

const getDirectorProfile = async (req, res) => {
  const { id } = req.params;
  const director = await Director.findById(id);

  if (!director) {
    const error = new Error("Director no encontrado");
    return res.status(400).json({ message: error.message });
  }

  res.status(200).json(director);
};

const updateDirector = async (req, res) => {
  const { id } = req.params;
  const director = await Director.findById(id);

  if (!director) {
    const error = new Error("Director no encontrado");
    return res.status(400).json({ message: error.message });
  }

  // Update properties
  director.firstName = req.body.firstName || director.firstName;
  director.lastName = req.body.lastName || director.lastName;
  director.phoneNumber = req.body.phoneNumber || director.phoneNumber;

  try {
    const updatedDirector = await director.save();
    return res.status(200).json(updatedDirector);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Get error specific messages
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    const newError = new Error("Error al actualizar el Director");
    return res.status(500).json({ message: newError.message });
  }
};

const deleteDirector = async (req, res) => {
  const { id } = req.params;
  const director = await Director.findById(id);

  if (!director) {
    const error = new Error("Director no encontrado");
    return res.status(400).json({ message: error.message });
  }

  try {
    await director.deleteOne();
    return res.status(200).json({ message: "Director eliminado exitosamente" });
  } catch (error) {
    const newError = new Error("Error al actualizar el Director");
    return res.status(500).json({ message: newError.message });
  }
};

export { addDirector, getDirectorProfile, updateDirector, deleteDirector };
