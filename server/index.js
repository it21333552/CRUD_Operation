const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8081

//schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : Number,

},{
    timestamps : true
}

)
const userModel = mongoose.model("user", schemaData)

//read
//http://localhost:8081/
app.get("/",async(req,res)=>{

    const data = await userModel.find({})
 res.json({success : true, data : data})
})


//create data || save data in mongodb
//http://localhost:8081/create
/*
{
    "name" :,
    "email" :,
    "mobile" :
}
 */
app.post("/create",async(req,res)=>{
    try {
        const data = new userModel(req.body);
        await data.save();
        res.json({success : true, message : "data saved successfully", data : data});
    } catch (error) {
        res.status(500).json({success:false, message: "Failed to save data", error: error});
    }
})



//update data
//http://localhost:8081/update/:id
/*
{
    id: "",
    name: "",
    email : "",
    mobile : 
}
*/
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body

    try {
        const data = await userModel.findByIdAndUpdate(_id, rest);
        res.json({success:true, message :"data update successfully", data : data});
    } catch (error) {
        res.status(500).json({success:false, message: "Failed to update data", error: error});
    }
})



//delete api
//http://localhost:8081/delete/:id
app.delete("/delete/:id",async(req,res)=>{

    try {
        const id = req.params.id;
        const data = await userModel.deleteOne({_id: id});
        res.json({success:true, message :"data deleted successfully", data : data});
    } catch (error) {
        res.status(500).json({success:false, message: "Failed to delete data", error: error});
    }
})

mongoose.connect("mongodb+srv://nethmihakmana:Ishani123@crudoperation.ckioei7.mongodb.net/?retryWrites=true&w=majority&appName=CRUDoperation")
.then(()=>{
    console.log("connect to DB")
    app.listen(PORT,()=>console.log("Server is running"))

})
.catch((err)=>console.log(err))

