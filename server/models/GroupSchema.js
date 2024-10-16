import mongoose from "mongoose";

const Schema = mongoose.Schema

const groupSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        topic:{
            type:String,
            required:true,
            ref:"TopicSchema"
        },
        course:{
            type:String,
            required:true,
            ref:"CourseSchema"
        },
        members:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'UserSchema'
            }
        ],
        public:{
            type:Boolean,
            default:true
        }
    },
    {
        timestamps:true
    }
)
const GroupSchema = mongoose.model("GroupSchema",groupSchema)

export default GroupSchema