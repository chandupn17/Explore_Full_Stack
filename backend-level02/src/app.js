import express from 'express'
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();
//crosss
app.use(cros({origin:process.env.CORS_ORIGIN, credentials: true}));

//security setting 
app.use(express.json({limit:"16kb"}));
//will handel for url formate 
app.use(express.urlencoded({extended : true,limit:"16kb"}));
//public assect will store in public/temp
app.use(express.static("public"));
app.use(cookieparser());


export {app}