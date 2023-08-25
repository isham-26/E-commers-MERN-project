import mongoose from "mongoose";
let uri="mongodb+srv://ishamgupta711:isham123@gupta.k6v6k1d.mongodb.net/?retryWrites=true&w=majority"
 const connectDB = async()=>{
   try{
      const connect=await mongoose.connect(uri)
         console.log("db connection succsseful")
   }catch(err){
      console.log(err)
   }
}
export default connectDB;