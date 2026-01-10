import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'

import { connectDB } from "./config/db.js"
import { authRouter } from './routes/auth.routes.js'

dotenv.config(); // 🔑 FIRST — load env variables

const app = express()
const PORT = 5000

const secret = process.env.SPIRAL_SESSION_SECRET || 'jellyfish-baskingshark'

// 1️⃣ Core middlewares
app.use(cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
    credentials: true
}))
app.use(express.json())

// 2️⃣ Session middleware (needs body + cors ready)
app.use(session({
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // true only with HTTPS
        sameSite: "lax"
    }
}))


// 3️⃣ Database connection
connectDB()



// 4️⃣ Routes
app.use("/auth", authRouter)

// 5️⃣ Server start
app.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`)
})
