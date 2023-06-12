const express=require("express")
const {userModel}=require("../models/user.model")
const bcrypt=require("bcrypt")
const  jwt=require("jsonwebtoken")
require("dotenv").config()
const userRouter=express.Router()


userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body;
  
    try {
      const existingUser = await userModel.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ msg: "User already exists" });
      }
  
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.status(400).json({ msg: "Error" });
        } else {
          const user = new userModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
            is_married,
          });
          await user.save();
          res
            .status(200)
            .json({ msg: "User registered successfully", user: req.body });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Internal server error" });
    }
  });
  

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try{
const user =await userModel.findOne({email})
bcrypt.compare(password,user.password,(err,result)=>{
    var token=jwt.sign({userid:user._id,user:user.name},"masai")
    if(result){
        res.status(200).json({msg:"user login",token:token})
    }else{
        res.status(200).json({msg:"wrong crendentials"})
    }
})
    }
    catch{

    }
})

module.exports={
    userRouter
}