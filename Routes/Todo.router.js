
const express=require("express")
const { TodoModel} =require("../Model/Todos.model")

const todoRouter=express.Router()



//Get all Todos

todoRouter.get("/",async(req,res)=>{
    let queryData=req.query

    try{
        const todo =await  TodoModel.find(queryData) 
        res.send(todo)

    }catch(err){
        console.log(err)
        console.log({"error":"Error is coming While Get data"})

    }
})

// GET all Todos BY therir ID

todoRouter.get("/:todoID",async(req,res)=>{
    const ID=req.params.todoID

    try{
        const todo =await  TodoModel.findOne({_id:ID}) 
        res.send(todo)

    }catch(err){
        console.log(err)
        console.log({"error":"Error is coming While Get data"})

    }
})


// Creating New Todo

todoRouter.post("/create",async(req,res)=>{
     let data=req.body

    try{
        //For adding Data into DB
        const new_todo=new TodoModel(data)
        await new_todo.save()
        console.log(new_todo)
        res.send("added the new_Todo Successfully")

    }catch(err){
        console.log(err)
        console.log({"error":"Error is coming While Creating Todo"})


    }
})

// PATCH REQUEST

todoRouter.patch("/update/:id",async(req,res)=>{
    const ID=req.params.id
    const payload=req.body

    // For Finding Id Building RelationShip
    const todo=await TodoModel.findOne({_id:ID})
    console.log(todo,"todo user id")
    const userID_in_todo=todo.userID
    const userID_making_req=req.body.userID

    try{
        if(userID_making_req !==userID_in_todo){

            res.send({"Msg":"You are not authorized"})

        }else{
            await TodoModel.findByIdAndUpdate({_id:ID},payload)
            res.send(`update the todo whose ID is ${ID}`)

        }


    }catch(err){

        console.log(err)
        console.log({"error":"Error is coming While Patch Todo"})


    }

})




// DELETE REQUEST

todoRouter.delete("/delete/:id",async(req,res)=>{
    const ID=req.params.id
    //const payload=req.body

    // For Finding Id Building RelationShip
    const todo=await TodoModel.findOne({_id:ID})
    console.log(todo,"todo user id")
    const userID_in_todo=todo.userID
    const userID_making_req=req.body.userID

    try{
        if(userID_making_req !==userID_in_todo){

            res.send({"Msg":"You are not authorized"})

        }else{
            await TodoModel.findByIdAndDelete({_id:ID})
            res.send(`DELETE the todo whose ID is ${ID}`)

        }


    }catch(err){

        console.log(err)
        console.log({"error":"Error is coming While DELETING Todo"})


    }

})


module.exports={
    todoRouter
}