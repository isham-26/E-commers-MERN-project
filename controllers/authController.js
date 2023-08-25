import { comparePassword, hashPassword } from "../helpers/authHelper.js";

import userModel from "../models/userModel.js";
import  jwt from "jsonwebtoken"
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "name is Required" });
    }
    if (!email) {
      return res.send({ error: "email is Required" });
    }
    if (!password) {
      return res.send({ error: "password is Required" });
    }
    if (!phone) {
      return res.send({ error: "phone no is Required" });
    }
    if (!address) {
      return res.send({ error: "address is Required" });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    }).save();

    res.status(201).send({
      success: true,
      message: "user Register Successfully",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error in registation",
      err,
    });
  }
};

const loginController=async(req, res)=>{
     try{
        const {email,password}=req.body
        //validation
        if(!email||!password){
            return res.status(404).send({
                success:false,
                message:"Invalid email or password"
            })
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not resister"
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            res.status(200).send({
                success:false,
                message:"Invalid password"
            })
        }
        //token
        const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:"login succsessfully",
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
            },
            token,
        });
     }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:'Error in login',
            err
        })
     }
}
const testController=(req,res)=>{
    res.send("testing route")
}

export { testController,registerController,loginController };
