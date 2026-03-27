import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, updateUser, verifyUserwithTOken } from '../controller/userController.js'
const userRouter = express.Router()

userRouter.route('/').get(getAllUsers)
userRouter.route('/:id').get(getSingleUser).put(updateUser).patch(updateUser).delete(deleteUser)
userRouter.get('/activetion/:token', verifyUserwithTOken)

export default userRouter