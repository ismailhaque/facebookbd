import expressAsyncHandler from "express-async-handler"
import { createHashPass, verifyHashPass } from "../utility/bcryptPassword.js"
import { createError } from "../utility/createError.js"
import { createAccessToken, createRefrashToken, createVerifyToken, verifyToken } from "../utility/jwtToken.js"
import { validateEmail, validatePhone } from "../utility/validate.js"
import userModel from "../models/userModle.js"
import { createRandom } from "../utility/createRandom.js"
import sendEmail from "../utility/sendEmail.js"
import { accountActivation, onlyVerificationCode } from "../utility/mailTemplate.js"
import sendSMS from "../utility/sendSMS.js"

/**
 * @public
 * @method post
 * @url /login
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const loginUser = expressAsyncHandler(async(req,res, next) => {
    const {email, phone, password} = req.body

    // user login with email
    if (email) {
         const check_user = await userModel.findOne({email : email})
         if (!validateEmail(email)) {
            return res.status(401).json({
                message : "Invalid email"
            })
         }
         if (!check_user) {
            return res.status(401).json({
                message : "Email not registered"
            })
         }
         if (!verifyHashPass(password, check_user.password)) {
            return res.status(400).json({
                message : "Wrong password"
            })
         } 
         return res.cookie("refToken", createRefrashToken({id: check_user._id}, "7d"), {
                httpOnly : true,
                secure : false,
                sameSite : "strict",
                maxAge : 1000*60*60*24*30
            }).status(200).json({
                user : check_user,
                message : "Login successful",
                token : createAccessToken({id : check_user._id}, "30s")
            })
    }
    // user login with phone
    if (phone) {
         const check_user = await userModel.findOne({phone : phone})
         if (!validatePhone(email)) {
            return res.status(401).json({
                message : "Invalid Phone"
            })
         }
         if (!check_user) {
            return res.status(401).json({
                message : "Phone not registered"
            })
         }
         if (!verifyHashPass(password, check_user.password)) {
            return res.status(400).json({
                message : "Wrong password"
            })
         } 
         return res.cookie("refToken", createRefrashToken({id: check_user._id}, "7d"), {
                httpOnly : true,
                secure : false,
                sameSite : "strict",
                maxAge : 1000*60*60*24*30
            }).status(200).json({
                user : check_user,
                message : "Login successful",
                token : createAccessToken({id : check_user._id}, "30s")
            })
    }
})

/**
 * @method get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const loginWithRefrashToken = (req, res, next) => {
    const token = req.cookies.refToken
    
    const token_data = verifyToken(token, process.env.REFRASH_KEY)
    
    if (!token_data) {
        return res.status(401).json({
            message : "Refresh token not found"
        })
    }
    if (token_data) {
        return res.status(200).json({
            token : createAccessToken(token_data.id.id)
        })
    } 
}

/**
 * logout user
 * @method get
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const logoutUser = (req, res, next) => {
    const token = req.cookies.refToken
    if (!token) {
        return res.status(401).json({
            message : "Token not found"
        })
    }
    
    return res.clearCookie("refToken").status(200).json({
        message : "Logout successfully"
    })
}

/**
 * @public
 * @method post
 * @url /api/user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const createUser = expressAsyncHandler(async(req, res, next) => {
    const {frist_name, sur_name, email, phone, password, gender, brith_date} = req.body
    const check_email = await userModel.findOne({email : email})
    const check_phone = await userModel.findOne({phone : phone})
    if (!frist_name || !sur_name || !password || !gender || !brith_date) {
        return res.status(400).json({
            message : "All feilds are required!"
        })
    } else {
        // user register with email
        if (email) {
            if (!validateEmail(email)) {
               return res.status(400).json({
                    message : "Invalid email"
                })
            } 
            if (check_email) {
                return res.status(400).json({
                    message : "Email already exists"
                }) 
            }
                let activetionCode = createRandom()
                const check_activetion = await userModel.findOne({code : activetionCode})
                if (check_activetion) {
                    activetionCode = createRandom()
                }
                const today = new Date()
                const user = await userModel.create({
                    ...req.body,
                    password : createHashPass(password),
                    code : activetionCode,
                    joined : today.toDateString()
                })
                // send email
                sendEmail(user.email, "Account verification", {
                    name : `${user.frist_name} ${user.sur_name}`,
                    app_url : `${process.env.APP_URL}:${process.env.PORT}`,
                    email : `${user.email}`,
                    code : `${user.code}`,
                    link : `${process.env.APP_URL}/api/user/activetion/${createVerifyToken({id : user._id})}`
                })
                return res.status(200).json({
                    message : "Account created successfully",
                    user : user
                })
        }

        // user register with phone
        if (phone) {
            if (!validatePhone(phone)) {
                return res.status(400).json({
                    message : "Invalid phone number"
                })
            }
            if (check_phone) {
                return res.status(400).json({
                    message : "Email already exists"
                })
            }
            let activetionCode = createRandom()
            const check_activetion = await userModel.findOne({code : activetionCode})
            if (check_activetion) {
                activetionCode = createRandom()
            }
            const today = new Date()
            const user = await userModel.create({
                ...req.body,
                password : createHashPass(password),
                code : activetionCode,
                joined : today.toDateString()
            })

            sendSMS(user.phone, `Your verification code : ${user.code}`)

            return res.status(200).json({
                message : "Account created successfully",
                user : user
            })
        }

}})

/**
 * @public
 * @method get
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
export const getMe = expressAsyncHandler(async(req, res, next) => {
    const bearer_token = req.headers.authorization    
    
    if (!bearer_token) {
        next(createError(401, "Token not found"))
    }
    if (bearer_token) {
        const token = bearer_token.split('')[1]
        const verify_token = verifyToken(token, process.env.ACCESS_KEY)
        if (verify_token) {
            const user = await userModel.findById(verify_token.id)
            return res.status(200).json(user)         
        } 
        if(!verify_token) {
            return res.status(401).json({
                message : "Invalid token"
            })
        }
    }
})


/**
 * @public
 * @method verification with code
 * @url /api/user/activetion-with-code/:id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const verifyUserwithCode = expressAsyncHandler(async(req, res, next) => {
    const {id} = req.params
    const {code} = req.body
    const verify_user = await userModel.findById(id)
    
    if (verify_user.isActive) {
        next(createError(400, "Your account already verified"))
    }
    
    if (verify_user.code === code) {
        const user = await userModel.findByIdAndUpdate(id,{
            isActive  : true,
            code : ''
        })   
        res.status(200).json({
            message : "Your account verification successfull"
        })
    } else{
        next(createError(404, "Invalid code"))
    }
})

/**
 * @public
 * @method resend verification code
 * @url /api/user/activetion-code/:id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const resendCode = expressAsyncHandler(async(req, res, next) => {
    const {id} = req.params
    let activetionCode = createRandom()
    const check_activetion = await userModel.findOne({code : activetionCode})
    if (check_activetion) {
        activetionCode = createRandom()
    }
    const today = new Date()
    const user = await userModel.findByIdAndUpdate(id, {
        code : activetionCode
    })

    if (user.email) {
        // send email
        sendEmail(user.email, "Account verification code", onlyVerificationCode({
            name : `${user.frist_name} ${user.sur_name}`,
            app_url : `${process.env.APP_URL}`,
            email : `${user.email}`,
            code : `${user.code}`
        }))
    }
    if (user.phone) {
        sendSMS(user.phone, `Your verification code : ${user.code}`)
    }

    return res.status(200).json({
        message : "Send new code successfully"
    })
})