import mongoose from "mongoose";

const Schema = mongoose.Schema

const topicSchema = new Schema({
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

const TopicSchema = mongoose.model("TopicSchema",topicSchema)

export default TopicSchema