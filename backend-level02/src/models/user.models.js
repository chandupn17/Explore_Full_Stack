import mongoose, {Schema} from "mongoose";
//{Schema} or we have to write mongoose.Schema
import jwt from "jsonwebtoken";
//import bcrypt from "bcryptjs";
  import bcrypt from 'bcryptjs';


const userSchema = new Schema(
    {
        username:{
            type:String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true

        },
        email:{
            type: String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true

        },
        fullName:{
            type:String,
            required: true,
            trim:true, 
            index:true
        },
        avatar:{
            type:String, //cloudinary url 
            required:true,
        },
        coverImage:{
            type:String, //cloudinary url 

        },
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        password:{
            type:String,
            required:[true, 'password is frequired']
        },
        refreshTokens:{
            type:String
        }

    },{
        timestamps:true
    }
);
//(funcationality eq save , delete , )
userSchema.pre("save", async function(next){
    // it will decrypt and encrypt only when it is any modification in passwords 
    //negative check
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// creating own methods by using .methods
userSchema.methods.isPasswordsCorrect = async function (password){
    return await bcrypt.compare(password, this.password); 
}

userSchema.methods.generateAccessToken = async function (){
    return await jwt.sign({
        _id : this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
   // took 2 day to encouneter this error 
   // before -  ACCESS_TOKEN_EXPIRY
   // after -  process.env.ACCESS_TOKEN_EXPIRY
   // and main problem was in index in atlas mongodb collection 
};

userSchema.methods.generateRefreshToken = async function (){
    return await jwt.sign({
        _id : this._id

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
   )
   // took 2 day to encouneter this error  same as above
   // before -  ACCESS_TOKEN_EXPIRY
   // after -  process.env.ACCESS_TOKEN_EXPIRY
}

export const User = mongoose.model("User", userSchema);