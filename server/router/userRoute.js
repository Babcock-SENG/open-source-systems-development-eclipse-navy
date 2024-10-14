import { Router } from "express";
import { getProfile, newUser, userLogin, verfiedOtp } from "../controller/UserController.js";
import { loggedIn } from "../middleware/loggedIn.js";

const router = Router()

router.post("/register",newUser)
router.post("/verifyOtp",verfiedOtp)
router.post("/login",userLogin)
router.get("/profile",loggedIn,getProfile)


export default router