const express=require("express")
const resumeModel =require("../models/resumeModel")

const router=express.Router()

router.post("/add",async(req,res)=>{
    let data=req.body
    let resumeentry=new resumeModel(data)
    let result=await resumeentry.save()
    res.json({
        status:"success"
    })
})

router.post("/view",async(req,res)=>{
    let output=await resumeModel.find()
    res.json(output)
})

module.exports=router