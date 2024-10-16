import UserSchema from "../models/UserSchema.js";
import asyncHandler from "express-async-handler"
import bycript from "bcryptjs"
import gentoken from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv"
dotenv.config()

//description : User Registration
//creating email OTP
function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000)
}

export const newUser = asyncHandler(
    async (req, res) => {
        const { fullname, email, password } = req.body
        const userExist = await UserSchema.findOne({ email })

        if (userExist) {
            res.status(409).json({
                success: false,
                error: "User already exists."
            })
        }
        //hashed password 
        const salt = await bycript.genSalt(10)
        const hashedPassword = await bycript.hash(password, salt)


        try {
            const user = await UserSchema.create({
                fullname,
                email,
                password: hashedPassword
            })
            let otp = generateOtp()

            // saving the otp 
        user.otp=otp
        await user.save()
            sendEmail(otp, email)

            res.status(200).json({
                success: true,
                message: "User signup sucess, confirm your email"
            })

        } catch (error) {
            res.json({
                "message": "Error occured "
            })
        }
    }

)

//description for verified otp
export const verfiedOtp = asyncHandler(
    async (req, res) => {
        const { email, otp } = req.body

        const existingUser = await UserSchema.findOne({ email })
        if (!existingUser) {
            res.status(401).json({ success: false, message: "User does not exist" })
        }

        if (existingUser.otp == otp) {
            await UserSchema.updateOne({ isverified: true })
            res.status(201).json({
                success: true,
                message: "Email verified"
            })
            return
        }
        return res.status(400).json({ success : false, message: "OTP invalid"})

    }
)


// description user login 

export const userLogin = asyncHandler(
    async (req, res) => {
        const { email, password } = req.body

        const userFound = await UserSchema.findOne({ email }).select("-otp ")
        if (userFound && await bycript.compare(password, userFound?.password)) {
            res.send({
                message: `login successful`,
                userFound,
                token: gentoken(userFound?._id)
            })
        }
        else {
            throw new Error("invalid username or password ")
        }
    }
)

// description get user profile 

export const getProfile = asyncHandler(
    async (req, res) => {
        const proile = await UserSchema.findById(req.userAuth).select('-otp').populate('group')
        console.log(req.userAuth)
        res.json({
            "message": "Profile",
            proile
        })
    }
)