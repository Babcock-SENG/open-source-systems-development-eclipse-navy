import UserSchema from "../models/UserSchema.js";
import asyncHandler from "express-async-handler"
import bycript from "bcryptjs"
import gentoken from "../utils/generateToken.js";

//description : User Registration

export const newUser = asyncHandler(
    async(req,res)=>{
        const {fullname,email,password}=req.body

        const userExist = await UserSchema.findOne({email})

        if(userExist){
            throw new Error(`User exist already`)
        }
        //hashed password 
        const salt = await bycript.genSalt(10)
        const hashedPassword = await bycript.hash(password,salt)

        const user = await UserSchema.create({
            fullname,
            email,
            password:hashedPassword
        })
        res.send({
            message:"registration successful ",
            user
        })

    }
)

// description user login 

export const userLogin = asyncHandler(
    async(req,res)=>{
        const {email,password}=req.body

        const userFound = await UserSchema.findOne({email})
        if (userFound && await bycript.compare(password,userFound?.password)){
            res.send({message:`login successful`,
                userFound,
                token:gentoken(userFound?._id)
            })
        }
        else{
            throw new Error("invalid username or password ")
        }
    }
)

// description get user profile 

export const getProfile = asyncHandler(
    async(req,res)=>{
        const proile = await UserSchema.findById(req.userAuth).select('-password').populate('group')
        console.log(req.userAuth)
        res.json({
            "message":"Profile",
            proile
        })
    }
)