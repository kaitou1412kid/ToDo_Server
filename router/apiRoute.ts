//router for todo-api

import express from "express";
import Todo from "../model/todoModel";
import auth from "../middleware/auth";
import User from "../model/userModel";
const apiRouter = express.Router();

apiRouter.get("/", (req, res) => {
  res.send("Welcome to TodoList");
});

//add to the todo list, need authentication
apiRouter.post("/add", async (req, res) => {
  try {
    const {title} = req.body; //collect title from the user

    //const user = await User.findOne({username : username});
    if (!title) {
      return res.status(400).send({ message: "Enter title" });
    }

    const todo = await Todo.create({
      //create todo list
      title,
    });
    //user?.todolist.push(todo);
    await todo.save();

    res.status(200).json({
      message: "Data is added",
      data: todo,
    });
  } catch (e) {
    res.status(500).send({ messsage: "Data entry failed" });
  }
});

//display all the todo list
apiRouter.post("/all", async (req, res) => {
  const { page = 1, limit = 10 } = req.query; //query is an object with item page and limit
  try {
    //const {username} = req.body.username;
    //const user = await User.findOne({username : username});
    const todo = await Todo.find()
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit)); //pagination
    const count = await Todo.countDocuments(); //count the number of document that matches the filter

    res.status(200).send({
      message: "All Todo List",
      data: todo,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: page,
    });
  } catch (e) {
    res.status(500).send({ message: "Couldn't display the list" });
  }
});

//display all the done list
apiRouter.get("/done", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const todo = await Todo.find({ done: true })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const count = await Todo.countDocuments();

    res.status(200).send({
      message: "Done tasks",
      data: todo,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: page,
    });
  } catch (e) {
    res.status(500).send({ message: "Couldn't display the List" });
  }
});

//display all the in progress todo list
apiRouter.get("/inprogress", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const todo = await Todo.find({ inprogress: true })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const count = await Todo.countDocuments();
    res.status(200).send({
      message: "Task in progess",
      data: todo,
      totalPages: Math.ceil(count / Number(limit)),
      currentPage: page,
    });
  } catch (e) {
    res.status(500).send({ message: "Couldn't display the list" });
  }
});

//update the item of todolist , requires authentication
apiRouter.put("/:id/update", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(400).send({ message: "No item found" });
    }
    // let condition = req.body.condition;
    // todo.condition = condition;
    //todo.completed = Boolean(req.body.done);
    todo.title = req.body.title;

    // if(!todo.completed){
    //     return res.status(400).send({message : "No data entered"});
    // }
    // todo.inprogress = Boolean(req.body.inprogress);
    // if(!todo.inprogress){
    //     return res.status(400).send({message : "No data entered"});
    // }
    todo.save();
    res.status(200).send({ message: "Todo list updated" });
  } catch (e) {
    res.status(500).send({ message: "Couldnot update the list" });
  }
});

apiRouter.delete("/:id/delete", async (req, res) => {
  try {
    const todo = await Todo.findOneAndRemove({ _id: req.params.id });
    res.send({
      message: "Item removed",
    });
  } catch (e: any) {
    res.send({
      message: e.messaage,
    });
  }
});
export default apiRouter;
