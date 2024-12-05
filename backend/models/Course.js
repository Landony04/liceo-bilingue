import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: mongoose.Schema.Types.ObjectId,
  createdBy: mongoose.Schema.Types.ObjectId,
  ownerTeacher: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: String,
    required: false,
    default: Date.now(),
  },
  modifiedAt: {
    type: String,
    required: false,
  },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
