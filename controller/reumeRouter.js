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

module.exports=router