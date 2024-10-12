import mongoose from "mongoose"

const Schema = mongoose.Schema

const courseSchema = new Schema({
    name:{
        type:String,
        required:true 
    },
    description:{
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

const CourseSchema = mongoose.model("CourseSchema",courseSchema)

export default CourseSchema