import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
//import {User} from "../models/user.models.js"
import {User} from '../models/user.models.js'; 
import {uplodeonCoudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const generateAccessAndRefreshToken =  async(userId)=>{
   try{
     const user = await User.findById(userId);

     const accessToken = user.generateAccessToken();
     const refreshToken = user.generateRefreshToken();

     user.refreshTokens = refreshToken;
     await user.save({validateBeforeSave:false});

     return { accessToken,  refreshToken }
     

   }catch(error){
      throw new ApiError(500, "something went wrong while generating access and refresh token");
   }
};
//signup for user or regiser for user
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

//login for user
 
const loginUser = asyncHandler(async (req, res) => {
   // algorithm
   //req.body -> data
   //by user name or email
   // find the user in db
   //passwoed check 
   //access and refresh tocken 
   //send cookies (secure)
   const{} = req.body;

   if(!username || !password){
      throw new ApiError(400, "Please fill all fields user or email and password");
   }
   //find user in db
   const user = await User.findOne({
      //$or , etc are the operator of the mongodb
      $or: [{username: username.toLowerCase()}, {email: username.toLowerCase()}]
   });

   if(!user){
      throw new ApiError(404, "User not found");
   }
   //check password
   //user obj for database -- obj for mongoose schema
   const isPasswordvalid = await user.isPasswordsCorrect(password);

   if(!isPasswordvalid){
      throw new ApiError(404, "invalid user credintials");
   }


   //generate access and refresh token
   const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

   const looggedInUser = await User.findById(user._id).select("-password -refreshToken");
    
   
   const options={
      httpOnly: true,
      secure: true
    }

    return res.status(200)
               .cookie("accessToken",accessToken,options)
               .cookie("refreshToken",refreshToken,options)
               .json(
                  new ApiResponse(
                     200,{
                        user: looggedInUser,accessToken,refreshToken
                     },
                     "User logged in succesfully"
                  )
               )

   }          
); 

const logoutUser = asyncHandler(async(req,res)=>{
User.findByIdAndUpdate(
  await req.user._id,
   {
      $set:{
         refreshTokens:undefined
      },
   },
   {
      new: true
   }
)

const options=
{
   httpOnly: true,
   secure: true
}

 return res
 .status(200)
 .clearCookie("accessToken",options)
 .clearCookie("refreshToken",options)
 .json(new ApiResponse(200, {}, "userloged successfully"))
  
});

export { 
   registerUser,
   loginUser,
   logoutUser  
 }