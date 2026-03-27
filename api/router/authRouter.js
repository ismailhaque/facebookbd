import express from 'express'
import { createUser, getMe, loginUser, loginWithRefrashToken, logoutUser, resendCode, verifyUserwithCode } from '../controller/authController.js'

const authRouter = express.Router()

authRouter.post('/login', loginUser)
authRouter.post('/get-me', getMe)
authRouter.get('/logout', logoutUser)
authRouter.post('/register', createUser)
authRouter.get('/login/refrash-token', loginWithRefrashToken)
authRouter.post('/activetion-with-code/:id', verifyUserwithCode)
authRouter.patch('/activetion-code/:id', resendCode)

// export default auth router
export default authRouter