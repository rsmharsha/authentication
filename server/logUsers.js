import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.js";

dotenv.config();

async function logUsers() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        const users = await User.find()
            .select("-password -__v")
            .lean();

        console.table(users);

    } catch (err) {
        console.error("Error fetching users:", err.message);
    } finally {
        await mongoose.connection.close();
    }
}

logUsers();
