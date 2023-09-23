const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    email:String
})

const UserModel=mongoose.model("aadmi",userSchema)
module.exports={
    UserModel,
}
