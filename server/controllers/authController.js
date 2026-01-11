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

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;


        if (!email || !password) {
            return res.satus(400).json({ message: "All fileds are required" })
        }
        email = email.trim()


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found. Please register." })
        }


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        req.session.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            username: user.username
        };

        return res.status(200).json({ message: "Login successful", user: req.session.user })


    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" })
    }
}

export const checkAuth = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    res.json({
        message: "You are inside",
        user: req.session.user,
    });
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Could not log out, please try again " })
        }
        res.clearCookie("auth.sid")
        res.json({ message: "Logout successful" })
    })
}
