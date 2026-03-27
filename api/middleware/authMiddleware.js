import expressAsyncHandler from "express-async-handler";
import { createError } from "../utility/createError.js";
import { verifyToken } from "../utility/jwtToken.js";

export const logger = expressAsyncHandler(async (req, res, next)=>{
    const bearer_token = req.headers.authorization    
    
    if (!bearer_token) {
        next(createError(401, "Token not found"))
    }
    if (bearer_token) {
        const token = bearer_token.split('')[1]
        const verify_token = verifyToken(token, process.env.ACCESS_KEY)
        if (verify_token) {
            next()           
        } else {
            next(createError(401, "Invalid token"))
        }
    }
})
