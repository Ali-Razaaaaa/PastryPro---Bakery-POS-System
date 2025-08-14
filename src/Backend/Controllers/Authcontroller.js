import connectDB from '../Database/db.js';
import bcrypt from 'bcryptjs';
const userverify = async (req, res) => {
    try {
        const {username,password}=req.body;

        const db = connectDB();
        const query = 'SELECT username, password FROM users where username=?';
        const [rows] = await db.query(query,[username]);
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: "User not found" });
        }

        const hashedpassword=rows[0].password;
        const isMatch = await bcrypt.compare(password, hashedpassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        res.json({ success: true, message: "Login successful" });
        }
        catch (e)
        {
            console.error('Bhaiyaa G Error Hai....', e);
            res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default userverify;
