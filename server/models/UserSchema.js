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
    group:[
       {
        type:mongoose.Schema.Types.ObjectId,
        ref:"GroupSchema"
       }
    ]
},{
    timestamps:true
})

const UserSchema = mongoose.model("User",userSchema)

export default UserSchema