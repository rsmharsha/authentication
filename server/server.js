import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"

import { connectDB } from "./config/db.js";
import { authRouter } from './routes/auth.routes.js'


const app = express()
dotenv.config();

app.use(cors({ origin: ["http://localhost:5500", "http://127.0.0.1:5500"] }))
app.use(express.json())

connectDB();

app.use("/auth", authRouter)

const PORT = 5000
app.listen(PORT, () => {
    console.log(`server connected on port ${PORT}`);
})