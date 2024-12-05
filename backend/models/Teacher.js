import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdBy: mongoose.Schema.Types.ObjectId,
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
      required: false,
    },
  ],
  grades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grado",
      required: false,
    },
  ],
});

const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
