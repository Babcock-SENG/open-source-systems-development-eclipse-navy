import mongoose, { Types } from "mongoose"
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:false
    },
    group:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupSchema"
       }
    ],

    //TODO: isVerified 
    isverified:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const UserSchema = mongoose.model("User",userSchema)

export default UserSchema