import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: proccesss.env.CLOUD_API_KEY 
});
const uplodeonCoudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null
        // uplode the file on coludinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // file has been uploded success
        console.log("file has uploded on coudinary", response.url);
        return response;

    }catch(error){
        // if not uploded , to safe clean 
        fs.unlinkSync(localFilePath);
        // remove the locally saved temporary file as the uplode operation got failed
        return null;

    }

};
export {uplodeonCoudinary}