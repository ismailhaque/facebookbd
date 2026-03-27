import expressAsyncHandler from "express-async-handler"
import userModel from "../models/userModle.js"
import { createError } from "../utility/createError.js"
import { validateEmail, validatePhone } from "../utility/validate.js"
import { createHashPass } from "../utility/bcryptPassword.js"
import { createAccessToken, createRefrashToken, createVerifyToken, verifyToken } from "../utility/jwtToken.js"
import sendEmail from "../utility/sendEmail.js"
import sendSMS from "../utility/sendSMS.js"
import { createRandom } from "../utility/createRandom.js"
import { accountActivation } from "../utility/mailTemplate.js"

/**
 * @public
 * @method get
 * @url ?api/user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const getAllUsers = expressAsyncHandler(async(req, res, next) => {
    const users = await userModel.find()
    if (!users) {
        return res.status(401).json({
            message : "User not found"
        })
    }

    return res.status(200).json(users)
})

/**
 * @public
 * @method  get
 * @url /api/user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const getSingleUser = expressAsyncHandler(async(req, res, next) => {
    const id = req.params.id
    
    const user = await userModel.findById(id)

    if (!user) {
        return res.status(404).json("User not found")
    }

    return res.status(200).json(user)
})


/**
 * @public
 * @method update
 * @url /api/user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const updateUser = expressAsyncHandler((req, res, next) => {
    res.send('update user rout done')
})

/**
 * @public
 * @method delete
 * @url /api/user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const deleteUser = expressAsyncHandler(async(req, res, next) => {
    const id =req.params.id
    const del_user = await userModel.findByIdAndDelete(id)
    if(!del_user){
        return res.status(401).json({
            message : "Delete user not found"
        })
    }
    if (del_user) {
        return res.status(200).json({
            message : `${del_user.frist_name} ${del_user.sur_name}, Your account deleted successfull`
        })
    }
})


/**
 * @public
 * @method verification with token
 * @url /api/user/activetion/:token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */ 
export const verifyUserwithTOken = expressAsyncHandler(async(req, res, next) => {
    const {token} = req.params
    const data = verifyToken(token, process.env.VERIFY_KEY)
    
    const verify_user = await userModel.findById(data.id.id)
    
    if (verify_user.isActive) {
        next(createError(404, "Your account already verified"))
    }   
    if (!verify_user.isActive) {
        const user = await userModel.findByIdAndUpdate(data.id.id,{
            isActive  : true
        })
        res.status(200).json({
            message : "Your account verification successfull"
        })
    } 

})



