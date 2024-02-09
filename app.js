const express = require("express")
const cors= require("cors")
const mongoose= require("mongoose")
const userRoute= require("./controller/userRouter")

const app=express()

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://nithindas1234:1234nith@cluster0.lvn9hia.mongodb.net/resumeDb?retryWrites=true&w=majority",
{useNewUrlParser: true})

app.use("/api/resume",userRoute)

app.listen(3001,()=>{
    console.log("Server running")
})