import TopicSchema from "../models/TopicSchema.js";
import asycHandler from "express-async-handler"

//description creating new topic 
export const newTopic = asycHandler(
    async(req,res)=>{
        const {name,description}=req.body
        const topicExist = await TopicSchema.findOne({name})
        if(topicExist){
            throw new Error("Topic already exist")
        }
        const course = await TopicSchema.create({
            name,
            description
        })
        res.send({
            message:"Topic created sucessfully ",
            course 
        })
    }
)

// descrption get all topics 

export const getAllTopic = asycHandler(
    async(req,res)=>{
        const topic = await TopicSchema.find()
        res.send(topic)
    }
)

// description to get single topic 

export const getSingleTopic = asycHandler(
    async(req,res)=>{
        const topic = await TopicSchema.findById(req.params.id)
        res.send(topic)
    }
)

//description update topic 

export const updateTopic = asycHandler(
    async(req,res)=>{
        const {name ,description}= req.body
        const topic = await TopicSchema.findByIdAndUpdate(req.params.id,{name,description},{new:true})
        res.send({
            message:"Topic updated successfully",
            topic
        })
    }
)

export const deleteTopic = asycHandler(

    async(req,res)=>{
        const topic = await TopicSchema.findByIdAndDelete(req.params.id)
        res.send({message:"topic deleted successfully"})
    }
)