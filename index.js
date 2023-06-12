const express=require("express")
const { connection } = require("./db")
const {userRouter}=require("./Router/user.router")
const {postRouter}=require("./Router/post.router")
require("dotenv").config()
const app=express()
app.use(express.json())


app.use("/users",userRouter)
app.use("/posts",postRouter)


app.listen(process.env.port,async (req,res)=>{
   try{
await connection
console.log("server is running")
console.log("connected to db")
   }
   catch{
console.log("err")
   }
})