const jwt=require("jsonwebtoken")
require("dotenv").config()
const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try{
        const decode=jwt.verify(token,"masai")
        if(decode){
            req.body.user=decode.user
            req.body.userid=decode.userid
            next()
        }else{
res.json({msg:"token not available"})
        }
    }
    catch{
        res.json({msg:"err"})
    }
}


module.exports={
    auth
}