import Student from "../models/Student.js";

const addStudent = async (req, res) => {
  const { email } = req.body;

  // Validate if user exist
  const userExist = await Student.findOne({ email });

  if (userExist) {
    const error = new Error("Estudiante ya esta registrado");
    return res.status(400).json({ message: error.message });
  }

  try {
    // Save new student
    const student = new Student(req.body);
    const saveStudent = await student.save();

    res.status(200).json(saveStudent);
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

const getStudentProfile = async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);

  if (!student) {
    const error = new Error("Estudiante no encontrado");
    return res.status(400).json({ message: error.message });
  }

  return res.status(200).json(student);
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      const error = new Error("El estudiante no existe");
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {
    const newError = new Error("El estudiante no existe");
    return res.status(400).json({ message: newError.message });
  }

  // Update properties
  student.firstName = req.body.firstName || student.firstName;
  student.lastName = req.body.lastName || student.lastName;
  student.enrollment = req.body.enrollment || student.enrollment;
  student.phoneNumber = req.body.phoneNumber || student.phoneNumber;
  student.courses = req.body.curses || student.curses;
  student.grade = req.body.grade || student.grade;
  student.statusPayment = req.body.statusPayment || student.statusPayment;

  try {
    const updatedStudent = await student.save();
    return res.status(200).json(updatedStudent);
  } catch (error) {
    if (error.name === "ValidationError") {
      // Get error specific messages
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Datos inválidos", errors });
    }

    const newError = new Error("Error al actualizar el estudiante");
    return res.status(500).json({ message: newError.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id);

    if (!student) {
      const error = new Error("El estudiante no existe");
      return res.status(400).json({ message: error.message });
    }
  } catch (error) {
    const newError = new Error("El estudiante no existe");
    return res.status(400).json({ message: newError.message });
  }

  try {
    await student.deleteOne();
    return res.status(200).json({ message: "Alumno eliminado exitosamente " });
  } catch (error) {
    const newError = new Error("Error al eliminar el estudiante");
    return res.status(500).json({ message: newError.message });
  }
};

export { addStudent, getStudentProfile, updateStudent, deleteStudent };
