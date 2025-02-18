import { Router} from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controler.js";
import { upload } from "../middlewares/multer.middleware.js"
//import { verify } from "jsonwebtoken";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar",
            maxCount: 1
        },
        {
            name:"coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    );
router.route("/login").post(loginUser);

//secured routs 
//next() fro usage of middleware
router.route("/logout").post(verifyJWT, logoutUser);
export default router