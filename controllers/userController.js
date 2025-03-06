import User from "../models/user.js"
import bcrypt from 'bcrypt'


export  async function LoginController(){

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
