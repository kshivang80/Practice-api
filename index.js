
const express=require("express")
const cors = require('cors')
const { connection } = require("./Config/db")
const { todoRouter } = require("./Routes/Todo.router")
const { userRouter } = require("./Routes/User.router")
const { authentication } = require("./Middlewares/Authentication")
require("dotenv").config()




const app=express()
app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{

    res.send("This is Home page")
   
})

// Routers

app.use("/users",userRouter)

app.use(authentication)
app.use("/todos",todoRouter)






app.listen(process.env.port,async()=>{

    try{
        await connection
        console.log("Connected Succesfully with DB")

    }catch(err){
        console.log("Error while connection  with DB")
        console.log(err)

    }

    console.log(`Port is Running on ${process.env.port}`)

})