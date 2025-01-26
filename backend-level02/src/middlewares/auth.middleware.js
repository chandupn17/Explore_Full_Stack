import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";

export const verifyJWT = asyncHandler(async (req,_,next)=>{
try {
    const token = req.cookies?.accessToken || req.header
        ("Authorization")?.replace("bearer","");
        if(!token){
            throw new ApiError(400,"unauthorized request");
        }
        const decodedToken = jwt.verify(token. proccess.env.ACCESS_TOKEN_SECRET);
      
       const user = await User.findById(decodedToken?._id)
       .select("-password -refreshYoken");
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