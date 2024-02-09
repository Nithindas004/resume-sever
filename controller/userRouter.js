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

module.exports=router