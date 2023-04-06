// const express = require('express')
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routers/productsRoutes.js";
import userRouter from "./routers/usersRoutes.js";
import billRouter from "./routers/billRoutes.js";
// require('color')

dotenv.config();

//Conect DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//router
app.use("/api/products/", productRouter);
app.use("/api/users/", userRouter);
app.use("/api/bills/", billRouter);

//create port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running port: http://localhost:${PORT}`);
});
