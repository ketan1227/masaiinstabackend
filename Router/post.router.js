const express=require("express")
const postRouter=express.Router()
const {postModel}=require("../models/post.model")

const {auth}=require("../middleware/auth")
postRouter.use(auth)





postRouter.post("/create",async (req,res)=>{
try{
const note=new postModel(req.body)
await note.save()
res.status(200).json({msg:"post added successfully",post:req.body})
}catch{
res.json({msg:"err"})
}
})

postRouter.get("/", async (req, res) => {
    try {
      const { userid, minComments, maxComments, page } = req.query;
      const limit = 3; 
      const skip = (page - 1) * limit; 
  
      const query = { userid };
  
      if (minComments && maxComments) {
        query.commentsCount = { $gte: minComments, $lte: maxComments };
      }
  
      const posts = await postModel
        .find(query)
        .limit(limit)
        .skip(skip)
        .exec();
  
      res.json(posts);
    } catch {
      res.json({ msg: "Error" });
    }
  });
  postRouter.get("/top", async (req, res) => {
    try {
      const { userid, page } = req.query;
      const limit = 3; 
      const skip = (page - 1) * limit; 
  
      const posts = await postModel
        .find({ userid })
        .sort({ commentsCount: -1 }) 
        .limit(limit)
        .skip(skip)
        .exec();
  
      res.json(posts);
    } catch {
      res.json({ msg: "Error" });
    }
  });
postRouter.patch("/update/:postid",async (req,res)=>{
    const useridinuserdoc=req.body.userid
    const {postid}=req.params
    try{
const post=await postModel.findOne({_id:postid})
const useridipostdoc=post.userid
if(useridinuserdoc===useridipostdoc){
    await postModel.findByIdAndUpdate({_id:postid},req.body)
    res.json({msg:"update successfully"})
}else{
    res.json({msg:"not authorized"})
}
    }
    catch{
res.json({msg:"err"})
    }
})
postRouter.delete("/delete/:postid",async (req,res)=>{
    const useridinuserdoc=req.body.userid
    const {postid}=req.params
    try{
const post=await postModel.findOne({_id:postid})
const useridipostdoc=post.userid
if(useridinuserdoc===useridipostdoc){
    await postModel.findByIdAndDelete({_id:postid},req.body)
    res.json({msg:"Delete successfully"})
}else{
    res.json({msg:"not authorized"})
}
    }
    catch{
res.json({msg:"err"})
    }
})

module.exports={
    postRouter
}
