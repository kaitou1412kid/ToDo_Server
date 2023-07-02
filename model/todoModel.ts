//create todo schema and models

import mongoose from "mongoose";

export interface todoList {
    title : string,
    completed? : boolean,
    edit? : boolean
}

const todoSchema = new mongoose.Schema({
    title : String,
    completed : {
        type : Boolean,
        default : false
    },
    edit : {
        type : Boolean,
        default : false,
    }
});

export default mongoose.model<todoList>("todo",todoSchema);