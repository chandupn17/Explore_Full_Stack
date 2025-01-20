import mongoose, {Schema} from "mongoose";
//{Schema} or we have to write mongoose.Schema
import jwt from "jsonwebtoken";
//import bcrypt from "bcryptjs";
  import bcrypt from 'bcryptjs';


const userSchema = new Schema(
    {
        username:{
            type:String,
            requried: true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true

        },
        email:{
            type: String,
            requried: true,
            unique:true,
            lowercase:true,
            trim:true

        },
        fullName:{
            type:String,
            requried: true,
            trim:true, 
            index:true
        },
        avatar:{
            type:String, //cloudinary url 
            requried:true,
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
            requried:[true, 'password is frequired']
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

userSchema.methods.isPasswordsCorrect = async function (password){
    return await bcrypt.compare(password, this.password); 
}

userSchema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id : this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: ACCESS_TOKEN_EXPIRY
    }
    )
   
};

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this._id

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: REFRESH_TOKEN_EXPIRY
    }
   )
}

export const User = mongoose.model("User", userSchema);