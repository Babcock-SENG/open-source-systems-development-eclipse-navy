import express from "express"
import dotenv from "dotenv"
import dbConnect from "../config/dbConnect.js"
import bodyParser from "body-parser"
import userRoute from "../router/userRoute.js"
import courseRoute from "../router/courseRoute.js"
import topicRoute from "../router/topicRoute.js"
import groupRoute from "../router/groupRoute.js"
dotenv.config()
dbConnect()
const app = express()
//passing Data 
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

//routes
app.use("/api/v1/user",userRoute)
app.use("/api/v1/course",courseRoute)
app.use("/api/v1/topic",topicRoute)
app.use("/api/v1/group",groupRoute)


export default app