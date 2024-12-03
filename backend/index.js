import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import directorRoutes from "./routes/directorRoutes.js";

const app = express();
app.use(express.json());

// Init enviroment var
dotenv.config();

// Connect to db in mongoose
connectDb();

// Path default
app.use("/api", userRoutes);

// Path for student
app.use("/api/student", studentRoutes);

// Path for teacher
app.use("/api/teacher", teacherRoutes);

//Path for director
app.use("/api/director", directorRoutes);

// Get port for default in server
const PORT = process.env.PORT || 4000;

// Apply for listen successfull server
app.listen(PORT, () => {
  console.log("Escuchando en el puerto 4000");
});
