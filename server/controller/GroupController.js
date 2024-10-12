import GroupSchema from "../models/GroupSchema.js";
import asyncHandler from "express-async-handler"
import TopicSchema from "../models/TopicSchema.js";
import CourseSchema from "../models/CourseSchema.js";

// description create new group 

export const newGroup=asyncHandler(
    async(req,res)=>{
        const {name,description,course,topic}=req.body
        const groupExist= await GroupSchema.findOne({name})
        // checking if group exist 
    
        if(groupExist){
            throw new Error("Group name alrrady exist")
        }

        if (!course){
            res.status(400).json({"message" : "Please enter a course"})
        }

        //finding course
        const courseFound = await CourseSchema.findOne({
            name:course
        })
        if(!courseFound){
            
            throw new Error ("COURSE NOT IN DATABASE")
        }

        if(!topic){
            res.status(400).json({"message":"please enter a topic "})
        }
        //finding topic 
        const topicFound = await TopicSchema.findOne({
            name:topic
        })
        if(!topicFound){
            throw new Error("TOPIC NOT IN DATABASE")
        }
        

        // creating the group
        const group = await GroupSchema.create({
            name,
            description,
            course,
            topic,
           
        })
        //saving the course 
        courseFound.group.push(group._id)
        await courseFound.save()

        //saving the topic 
        topicFound.group.push(group._id)
        await topicFound.save()
        
        res.send({
            message:"Group created successfully",
            group
        })
    }
)

//description get group 

export const getGroups = asyncHandler(
    async(req,res)=>{
        
        let groupQuery = GroupSchema.find()

        //searching for groups by groupname 
        if(req.query.name){
            groupQuery=groupQuery.find({
                name:{$regex:req.query.name,$options:'i'}
            })
        }

        // searching for groups by topics
        if(req.query.topic){
            groupQuery=groupQuery.find({
                topic:{$regex:req.query.topic,$options:'i'}
            })
        }

        //searching for groups by courses 
        if(req.query.course){
            groupQuery=groupQuery.find({
                course:{$regex:req.query.course,$options:'i'}
            })
        }

        const group = await groupQuery.exec()
        res.send(group)
    }
)

// description get single group

export const getSingleGroup = asyncHandler(
    async(req,res)=>{
        const group = await GroupSchema.findById(req.params.id)

        if(!group){
            throw new Error ("Group not found ")
        }
        res.json({
            "message":"Group found ",
            group
        })
    }
)

// description update group 

export const updateGroup = asyncHandler(
    async(req,res)=>{
        const {name , description, topic , course }=req.body

        const group = await GroupSchema.findByIdAndUpdate(
            req.params.id,
            {name,description,topic , course },
            {new:true})

        res.json ({
            "message":"Group updated Succesfully ",
            group
        })
    }
)

// decription : delete Group 
export const deleteGroup=asyncHandler(
    async(req,res)=>{
        const group = await GroupSchema.findByIdAndDelete(req.params.id)
        res.json({
            "message":"group deleted successfully ",
        })
    }
)