import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
//import {User} from "../models/user.models.js"
import {User} from '../models/user.models.js'; 
import {uplodeonCoudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res)=>{
  
   // --------- get user details from frontend--------------------------
   // 1. Validate User Input - not empty
   // 2. Check if user already exists in database : username , email etc 
   // 3. check for images ,and avathar
   // 4. uplode them in cloudinary
   // 5.create user object as we mongodb - create entry in db
   // 6. remove pass word and refresh tocken field from responce
   // 7. check for user creation successfully
   // return response
     
   const {fullName, email, username, password }= req.body;
   console.log("emial : ",email,password);
    
   if(
      [fullName,email, username, password].some((field)=>
      field?.trim() === "")
   ){
      throw new ApiError(400, "Please fill all fields");
   }

   const existinguser = await User.findOne({
     $or:[{username}, {email}]
   });


 //  console.log(existinguser 
  // );
   console.log("ftttttttttttttttttttt");


  //find if any user already existed
  if(existinguser){
   throw new ApiError(409, "User already exists");
  } 


  //first property of the avatar                                                                
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

console.log(req.files);
console.log("avatarLocalPath : ",avatarLocalPath);
console.log("coverImageLocalPath : ",coverImageLocalPath);

if(!avatarLocalPath){
   throw new ApiError(400, "Please upload avatar");
}
const avatar = await uplodeonCoudinary(avatarLocalPath);
const coverImage = await uplodeonCoudinary(coverImageLocalPath);


            //ok
console.log("Avatar received:", avatar);
            

if(!avatar){

   throw new ApiError(400, "Please upload avatar");
           }

           console.log("ftttttttttttttttttttt");

//create user object
const user = await User.create({
       fullName,
       avatar : avatar.url,
       coverImage : coverImage?.url || "",
       email,
       password,
       username : username.toLowerCase()
});


const createdUser = await User.findById(user._id).select(
   "-password -refreshToken"
);

if(!createdUser){
   throw new ApiError(500, "something  went wrong while registering the user");
}
 return res.status(201).json(
   new ApiResponse(200, createdUser, "user register successfully")
 )
});

export { registerUser }