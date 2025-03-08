import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

const createToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "3h" }); 
};

export async function LoginController(req, res) {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username }); 
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" }); 
        }

        const isMatch = await bcrypt.compare(password, existingUser.password); 
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Credentials" }); 
        }

        const token = createToken({ id: existingUser._id, username: existingUser.username });

        return res.status(200).json({
            message: "Login Successfully",
            token,
            user: existingUser, 
        });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export  async function RegisterController(req, res) {
    try {
        const { name, username, email, password, role } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User Already Exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const validRoles = ['user', 'admin'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid Role' });
        }

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
            role
        });

        await newUser.save();
        return res.status(201).json({ message: 'User Created Successfully' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export async function LogoutController(req, res) {
    try {
        const authHeader = req.headers.authorization; // Check if JWT exists

        if (authHeader) {
            return res.status(200).json({ message: "Logged out successfully" });
        }

        if (req.isAuthenticated && req.isAuthenticated()) {
            req.logout((err) => {
                if (err) {
                    return res.status(500).json({ message: "Logout failed", error: err });
                }

                req.session.destroy((err) => {
                    if (err) {
                        return res.status(500).json({ message: "Session destruction failed", error: err });
                    }
                    res.clearCookie("connect.sid"); // Clears session cookie
                    return res.status(200).json({ message: "OAuth Logout successful" });
                });
            });
        } else {
            return res.status(401).json({ message: "User not logged in" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

