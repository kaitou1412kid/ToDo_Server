
import mongoose from "mongoose";
import todoModel from "./todoModel";

interface User {
    _id? : number,
    username : string,
    password : string,
    todolist :  any
}

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    todolist : {
        type : Array
    }
})

export default mongoose.model<User>("user", userSchema);