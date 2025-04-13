import express from "express"
import dotenv from "dotenv"
import connectMongoDB from "./models/db.js";
import bodyParser from "body-parser";
import cors from "cors"
import AuthRouter from "./routes/AuthRouter.js"
import HomeRouter from "./routes/HomeRouter.js"
const app=express();
dotenv.config()

const PORT =process.env.PORT || 5000;

app.get('/',(req,res) => {
    res.send('Getting')
})

app.use(bodyParser.json())
app.use(cors())
app.use('/auth',AuthRouter)
app.use('/home',HomeRouter)

app.listen(PORT,() =>{
    console.log("Server is running on " + PORT)
    connectMongoDB()
})

