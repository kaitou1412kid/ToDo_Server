import exp from "constants";
import express from "express";
import apiRouter from "./router/apiRoute";
import userRouter from "./router/userRoute";
require("./config/database").connect();
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use("/todo",apiRouter);
app.use("/user",userRouter);
app.listen(3080,()=>{
    console.log("Server succesfully started");
});