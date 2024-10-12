import app from "./app/app.js";
import http from "http"

//creating server 
const PORT = 4500
const server=http.createServer(app)

server.listen(PORT,(err)=>{
    err?console.log(err):console.log(`Server connected to ${PORT}`)
})