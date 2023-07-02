require("dotenv").config();
import express from "express";
import User from "../model/userModel";
import jwt from "jsonwebtoken"
const userRouter = express.Router();

userRouter.post("/signup",async (req,res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
           return res.send("Enter username and password");
        }
        
        const user = await User.create({
            username, password
        })
        await user.save();
        const accesstoken = jwt.sign({username : user.username}, process.env.PRIV_KEY || "", {expiresIn : "20s"});
        res.send({
            "username" : user.username,
            "accesstoken" : accesstoken
        })
    }catch(e:any){
        res.send("error");
    }

    res.json({
        "message" : "Welcome to login"
    })
});

userRouter.post("/login",async (req,res)=>{
    try{
        const {username , password} = req.body;
        if(!username || !password){
            return res.send("Enter username and password");
        }
        const user = await User.findOne({username : username});
        if(!user){
            return res.send("please sign up");
        }
        const accesstoken = jwt.sign({username : user.username}, process.env.PRIV_KEY || "", {expiresIn : "2m"});
        res.send({
            "message" : "Login",
            "username" : user.username,
            "accesstoken" : accesstoken
        })
    }catch(e:any){
        res.send({
            "message" : e.message
        })
    }
})


export default userRouter;