import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const gentoken =(id)=>{
    return jwt.sign({id},process.env.JWT,{expiresIn:'3days'})
}

export default gentoken