//middleware used for authentication 
import express from "express";
import jwt from "jsonwebtoken"; //used for authentication

//creating middleware
const auth = (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    //token can be found in:
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    //if no token found
    if(!token){
        return res.status(401).send("Not allowed");
    }
    try {
        let user = jwt.verify(token, process.env.PRIV_KEY || ""); //validate the token
        req.user = user;
        console.log("Granted");
    }catch(e){
        return res.status(401).send("Invalid token");
    }
    return next();
}

export default auth;