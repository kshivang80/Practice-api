const express=require("express")
const { UserModel } = require("../Model/Users.model")
var jwt=require("jsonwebtoken")
require("dotenv").config()
const bcrypt=require("bcrypt")


const userRouter=express.Router()




// Signup 

userRouter.post("/signup",async(req,res)=>{
    const { name,email,pass } = req.body
     try{
        //for encripting password
        bcrypt.hash(pass,5,async(err,newsecure_password)=>{

            // store hash in your database
            if(err){
                console.log(err)
            }else{
                const user= new UserModel({name,email,pass:newsecure_password})
                await user.save()
                res.send("You are Registered")
            }
        })
        
    }catch(err){
        res.send({"Error":"Error While Registering"})
        console.log(err)
     }

})



// LOGIN Section

userRouter.post("/login", async(req,res)=>{
    const {email,pass}=req.body

    try{
        const user= await UserModel.find({email})
        const hashed_pass=user[0].pass
        if(user.length>0){
            bcrypt.compare(pass,hashed_pass,(err,result) =>{
                // random payload change to userid
                if(result){
                    const token=jwt.sign({userID:user[0]._id},process.env.key);
                    res.send({"Msg":"Login Successfully","token":token})
                }else{
                    res.send("Wrong Credentials")
                }
            })
        }else{
            res.send("Wrong Credentials")
        }

    
    
    }catch(err){
        console.log({"Error":"Error While Login"})
        console.log(err)
    }
})



module.exports={
    userRouter
}