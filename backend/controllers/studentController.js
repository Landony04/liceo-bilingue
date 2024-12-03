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
  const { student } = req;

  res.json(student);
};

export { addStudent, getStudentProfile };
