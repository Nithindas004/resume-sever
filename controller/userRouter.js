const express=require("express")
const userModel=require("../models/userModel")
const bcrypt=require("bcryptjs")

const router= express.Router()

hashPasswordGenerate=async(pass)=>{
    const salt=await bcrypt.genSalt(10)
    return bcrypt.hash(pass,salt)
}

router.post("/register",async(req,res)=>{
    let {data} ={"data":req.body}
    let epass = data.password
    hashPasswordGenerate(epass).then(
        (hashedPassword)=>{
            data.password=hashedPassword
            let reg=new userModel(data)
            let result = reg.save()
            res.json({
                status:"success"
            })
        }
    )
})

router.post("/login",async(req,res)=>{
    let euname=req.body.username
    let epass=req.body.password
    let data=await userModel.findOne({"username":euname})
    if(!data)
    {
        return res.json({
            status:"Invalid user"
        })
    }
    let dbpass=data.password
    const match=await bcrypt.compare(epass,dbpass)
    if (!match) {
        return res.json({
            status:"Incorrect password"
        })
    }
    res.json({
        status:"success"
    })
})

module.exports=router