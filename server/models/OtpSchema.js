import mongoose from "mongoose";

const Schema = mongoose.Schema

const otpSchema = new Schema(
    {
        email:{
            type:String,

        },
        otp:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            required:true
        },
        expiredAt:{
            type:Date,
            required:true
        }
    },{
        timestamps:true
    }
)

const OtpSchema = mongoose.model("OtpSchema",otpSchema)

export default OtpSchema