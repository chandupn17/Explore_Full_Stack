import express from 'express'
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();
//crosss
app.use(cors({origin:process.env.CORS_ORIGIN, credentials: true}));

//security setting 
app.use(express.json({limit:"16kb"}));
//will handel for url formate 
app.use(express.urlencoded({extended : true,limit:"16kb"}));
//public assect will store in public/temp
app.use(express.static("public"));
app.use(cookieparser());

//routs  import

import userRouter from "./routes/user.routs.js";

// routs decleration 

//app.use("/api/v1/user",userRouter); only when we 
// dont have any middlewares and seperate routs

app.get("/api/v1/user")

app.use("/api/v1/user",userRouter);
// https://localhost:8000//api/v1/user/rigester



export {app}