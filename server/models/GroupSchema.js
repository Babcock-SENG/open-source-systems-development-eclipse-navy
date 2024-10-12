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
        }
    },
    {
        timestamps:true
    }
)
const GroupSchema = mongoose.model("GroupSchema",groupSchema)

export default GroupSchema