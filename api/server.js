import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import userRouter from './router/userRouter.js'
import mongodbConnect from './config/db.js'
import authRouter from './router/authRouter.js'
import path, { resolve } from 'path'
import cookieParser from 'cookie-parser'
import cors from "cors"

const __dirname = resolve()

const app = express()
// config env
dotenv.config()
// init env var
const port = process.env.PORT || 5000;

// post body data
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// use cors
app.use(cors())

// use cookie parser
app.use(cookieParser())

// auth router
app.use('/api/auth', authRouter)
// user router
app.use('/api/user', userRouter)

// static folder
app.use('/images', express.static(path.join(__dirname, "/api/public/images/")))
app.use(express.static(path.join(__dirname, "/client/dist")))

// use error handler
app.use(errorMiddleware)

app.listen(port, ()=> {
    mongodbConnect()
    console.log(`Server is runing ${process.env.APP_URL}`.bgCyan.black);
})