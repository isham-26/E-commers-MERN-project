import express from "express"
import  Color  from "colors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoute.js'
//rest object test
dotenv.config()

const app=express();

connectDB();

app.use(express.json())
app.use("/api/v1/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send({
        message:"welcome to e commres website"
    })
})

const PORT=3000
app.listen(process.env.PORT||3000,()=>{
    console.log(`server is runnimg in ${PORT}`.bgMagenta.white)
})