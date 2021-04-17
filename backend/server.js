import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

import productRoutes from "./routes/productRoutes.js";
connectDB();

const app = express();
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on PORT ${PORT}`)
);
