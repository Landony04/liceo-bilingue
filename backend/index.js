import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

const app = express();

// Init enviroment var
dotenv.config();

// Connect to db in mongoose
connectDb();

// Path default
app.use("/", (req, res) => {
  res.send("Hola mundo");
});

// Get port for default in server
const PORT = process.env.PORT || 4000;

// Apply for listen successfull server
app.listen(PORT, () => {
  console.log("Escuchando en el puerto 4000");
});
