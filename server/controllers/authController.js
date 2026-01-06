import validator from 'validator';
import { User } from "../models/User.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {

    try {
        let { name, username, email, password } = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            })
        }

        name = name.trim()
        email = email.trim()
        username = username.trim()

        if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
            return res.status(400).json({ message: 'Username must be 1–20 characters, using letters, numbers, _ or -.' })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' })
        }

        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters",
            });
        }

        //  Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        password = await bcrypt.hash(password, 10)

        // Save user (no hashing yet)
        const user = await User.create({
            name,
            username,
            email,
            password,
        });

        return res.status(201).json({
            message: "User registered successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
        });
    }

}