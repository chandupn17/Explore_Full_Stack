//import { ApiError } from "../utils/ApiError.js";
import {ApiError} from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

//export
  const verifyJWT = asyncHandler(async (req,_,next)=>{
try {
    console.log("-------------erroin auth middleware-----------");
    // error starts here
    const token = req.cookies?.accessToken || req.header
        ("Authorization")?.replace("Bearer", "");
        if(!token){
            throw new ApiError(400,"unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("-------------erroin auth middleware-----------");
       const user = await User.findById(decodedToken?._id)
       .select("-password -refreshToken");
       if(!user){
        //todo : dissuss next vidio
        throw new ApiError(401,"invalid Accsess Token");
       }
       req.user = user;
       next();
} catch (error) {
    throw new ApiError(401, error?.message || " invalid accessToken");
    
}
});
export {
    verifyJWT
}