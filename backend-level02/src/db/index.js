 import mongoose from "mongoose";
 import {DB_NAME} from "../constants.js";

 const connectDB = async ()=>{
    try{

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        //to get on which url it is fettching 
        console.log(`\n MongoDB connected  ! ! DB HOST: ${connectionInstance.connection.host}`);


    }catch(error){
        console.log("error in connecting to database",error);
        console.log(" error in ../db/index.js");
        //imp tpoic process.exit and so many 
        process.exit(1);
    }
 }
 
 export default connectDB;