import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const jwtSecretKey = "jwt-secret-key";

export const Login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ Error: "Username not found" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ Error: "Incorrect password" });
        }

        const token = jwt.sign(
            { id: user._id, nama_user: user.nama_user, role: user.role },
            jwtSecretKey,
            { expiresIn: '1d' }
        );
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({ Status: "Success", token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Error: "Server error during login" });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ Status: "Success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ Error: "Server error during logout" });
    }
};
