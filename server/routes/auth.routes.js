import express from 'express'
import { register, login, checkAuth, logout } from '../controllers/authController.js'

export const authRouter = express.Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.get("/me", checkAuth)
authRouter.post("/logout", logout)