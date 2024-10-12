import CourseSchema from "../models/CourseSchema.js";
import asyncHandler from "express-async-handler";

//description creating new courses

export const newCourses = asyncHandler(
    async(req,res)=>{
        const {name,description}= req.body

       const courseExist = await CourseSchema.findOne({name})
        if(courseExist){
            throw new Error ("Course name already Exist")
        }
        const course = await CourseSchema.create({
            name,
            description
        })
        res.send({
            message:`Course created successfully `,
            course
        })
    }
)

// description get all courses
export const getAllCourse = asyncHandler(
    async(req,res)=>{
        const course = await CourseSchema.find()

        res.send(course)
    }
)

// description get single course
export const getSingleCourse = asyncHandler(
    async(req,res)=>{
        const course = await CourseSchema.findById(req.params.id)

        res.send(course)
    }
)

//description update course

export const updateCourse = asyncHandler(
    async(req,res)=>{
        const {name,description}=req.body

        const course = await CourseSchema.findByIdAndUpdate(req.params.id,{name,},{new:true})

        res.send({
            message:"updated successfully ",
            course
        })
    }
)

// description delete course 

export const deleteCourse = asyncHandler(
    async(req,res)=>{
        const course = await CourseSchema.findByIdAndDelete(req.params.id)

        res.send(`courses deleted succesffuly `)
    }
)

