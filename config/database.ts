//database connectivity

//requive .env
require("dotenv").config();

//import mongoose for database
import mongoose from "mongoose";


//export the database connection
exports.connect = ()=>{
    mongoose.connect(process.env.MONGO_URL || "");
}