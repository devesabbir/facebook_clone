import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";


import userRoute  from  "./api/routes/UserRoute.js"
import adminRoute  from "./api/routes/AdminRoute.js";
import ErrorHandle from "./api/middlewares/ErrorHandle.js";

// Middlewares  
app.use(express.json())
app.use(express.urlencoded({ extended:false }))

// Cookie Parser 
app.use(cookieParser()) 
app.use(cors())

// Routing
app.use('/api/user',  userRoute)
app.use('/api/admin', adminRoute)


// Handel Error 
app.use( ErrorHandle )

export default app; 

  