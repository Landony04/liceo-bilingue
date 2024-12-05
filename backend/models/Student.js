import mongoose from "mongoose";
import bcrypt from "bcrypt";

const studentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  enrollment: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  grade: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Curso",
      required: true,
    },
  ],
  statusPayment: [
    {
      month: {
        type: String,
        required: false,
      },
      year: {
        type: Number,
        required: false,
      },
      status: {
        type: String,
        enum: ["pagado", "moroso"],
        required: false,
      },
      dateRegister: {
        type: Date,
      },
      createdBy: mongoose.Schema.Types.ObjectId,
    },
  ],
});

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
