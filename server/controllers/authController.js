export const register = (req, res) => {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        })
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: "Password must be at least 6 characters",
        });
    }

    return res.status(201).json({
        message: "User registered successfully",
    });
}