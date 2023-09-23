const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token= req.headers.authorization;
    if(token){
jwt.verify(token,"masai",(err,decoded)=>{
    if(decoded){
        req.body.userId=decoded.userId;
        req.body.username=decoded.username;
        console.log(decoded)
        next()
       
    }
})
    }else{
        res.send({"error":"error hai bhai"})
    }
}
module.exports={
    auth
}