import Teacher from "../models/Teacher.js";

const addTeacher = async (req, res) => {
  const { email } = req.body;

  // Validate if user exist
  const teacherExist = await Teacher.findOne({ email });

  if (teacherExist) {
    const error = new Error("Maestro ya registrado");
    return res.status(400).json({ message: error.message });
  }

  try {
    // Save new Teacher
    const teacher = new Teacher(req.body);
    const saveTeacher = await teacher.save();

    res.status(200).json(saveTeacher);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Get error specific messages
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    // Message default
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const getTeacherProfile = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    const error = new Error("Maestro no encontrado");
    return res.status(400).json({ message: error.message });
  }

  res.status(200).json(teacher);
};

const updateTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    const error = new Error("Maestro no encontrado");
    return res.status(400).json({ message: error.message });
  }

  // Update properties
  teacher.firstName = req.body.firstName || teacher.firstName;
  teacher.lastName = req.body.lastName || teacher.lastName;
  teacher.phoneNumber = req.body.phoneNumber || teacher.phoneNumber;
  teacher.curses = req.body.curses || teacher.curses;
  teacher.grades = req.body.grades || teacher.grades;

  try {
    const updatedTeacher = await teacher.save();
    return res.status(200).json(updatedTeacher);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Get error specific messages
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    const newError = new Error("Error al actualizar el maestro");
    return res.status(500).json({ message: newError.message });
  }
};

const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);

  if (!teacher) {
    const error = new Error("Maestro no encontrado");
    return res.status(400).json({ message: error.message });
  }

  try {
    await teacher.deleteOne();
    res.status(200).json({ message: "Maestro eliminado exitosamente" });
  } catch (error) {
    const newError = new Error("Error al eliminar el maestro");
    return res.status(500).json({ message: newError.message });
  }
};

export { addTeacher, getTeacherProfile, updateTeacher, deleteTeacher };
