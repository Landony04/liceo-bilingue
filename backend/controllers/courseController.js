import Course from "../models/Course.js";

const addCourse = async (req, res) => {
  const { name } = req.body;
  const { role } = req.user.role;

  if (role !== "director") {
    const error = new Error("No tienes permisos para está acción");
    return res.status(400).json({ message: error.message });
  }

  try {
    const courseExist = await Course.findOne({ name });

    if (courseExist) {
      return res.status(400).json({ message: "Este curso ya existe" });
    }

    const course = new Course(req.body);
    const saveCourse = await course.save();

    return res.status(200).json(saveCourse);
  } catch (error) {
    if (error.name === "ValidationError") {
      const newError = new Error("Todos los campos son necesarios");
      return res.status(400).json({ message: newError.message });
    }

    const newError = new Error("Error al agregar el curso");
    return res.status(500).json({ message: newError.message });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user.role;

  if (role !== "director") {
    return res
      .status(400)
      .json({ message: "No tienes permisos para realizar esta acción" });
  }
  try {
    const courseExist = Course.findById({ id });

    if (!courseExist) {
      return res.status(400).json({ message: "Curso no existe" });
    }

    await courseExist.deleteOne();
    return res.status(200).json({ message: "Curso eliminado exitosamente" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Curso no existe" });
    }

    return res.status(500).json({ message: "No se pudo eliminar el curso" });
  }
};

const getCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(400).json({ message: "Curso no existe" });
    }

    return res.status(200).json(course);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Curso no existe" });
    }

    const newError = new Error("Error al obtener el curso");
    return res.status(500).json({ message: newError.message });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { role } = req.user.role;

  if (role !== "director") {
    return res
      .status(400)
      .json({ message: "No tienes permisos para realizar está acción" });
  }

  try {
    const course = Course.findById({ id });

    if (!course) {
      return res.status(400).json({ message: "Curso no existe" });
    }

    // Update properties
    course.name = req.body.name || course.name;
    course.grade = req.body.grade || course.grade;
    course.ownerTeacher = req.body.ownerTeacher || course.ownerTeacher;
    course.modifiedAt = Date.now();

    const updatedcourse = await course.save();
    return res.status(200).json(updatedcourse);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Curso no existe" });
    }

    const newError = new Error("Error al eliminar el curso");
    return res.status(500).json({ message: newError.message });
  }
};

export { addCourse, deleteCourse, getCourse, updateCourse };
