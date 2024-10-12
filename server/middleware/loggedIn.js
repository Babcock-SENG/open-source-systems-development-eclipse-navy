import { tokenHeader } from "../utils/tokenHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const loggedIn = (req,res,next)=>{
    // getting token from header 
    const token  = tokenHeader(req)
    //verify token 
    const verifyUser = verifyToken(token)
    //save user
    if(!verifyUser){
        throw new Error ("invalid / expired token please login in again ")
    }
    else {
        req.userAuth = verifyUser.id
        next()
    }
}