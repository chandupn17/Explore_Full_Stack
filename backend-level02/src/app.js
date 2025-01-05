import express from 'express'
import cors from 'cors';
import cookieparser from 'cookie-parser';

const app = express();
//crosss
app.use(cros({origin:process.env.CORS_ORIGIN, credentials: true}));

//security setting 
app.use(express.json({limit:"16kb"}));



export {app}