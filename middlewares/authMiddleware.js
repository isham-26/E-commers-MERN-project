import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const requireSignIn = async(req,res,next)=>{
    try{
        const decode= jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
        req.user=decode
        next()
    }catch(err){
        console.log(err)
    }
}
//is admin
export const isAdmin=async(req,res,next)=>{
     try{
        let x=100;
        const user=await userModel.findById(req.user._id)
        if(user.role!==1){
            res.status(401).send({
                success:true,
                message:"Unauthorized Access"

            })
        }
        else{
            next()
        }
     }catch(err){
        console.log(err)
     }
}