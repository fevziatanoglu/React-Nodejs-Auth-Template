import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({ username, email, password: hashedPassword });

        const accessToken = generateAccessToken(newUser._id);
        const refreshToken = generateRefreshToken(newUser._id);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token: accessToken,
            user: { _id: newUser._id, username: newUser.username }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            user.refreshToken = refreshToken;
            await user.save();

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({
                success: true,
                user: { _id: user._id, username: user.username },
                token: accessToken,
            });
        } else {
            res.status(401).json({ message: 'Geçersiz kullanıcı adı veya şifre', password });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
export const refreshAccessToken = async (req, res) => {
    const cookieHeader = req.headers.cookie;
    const refreshToken = cookieHeader?.split('=')[1];
    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token gerekli' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(403).json({ message: 'Geçersiz refresh token' });
        }

        const newAccessToken = generateAccessToken(user._id);
        res.json({ accessToken: newAccessToken, success: true, });

    } catch (err) {
        res.status(403).json({ message: 'Token doğrulanamadı' });
    }
};

export const logout = async (req, res) => {

    try {
        const cookieHeader = req.headers.cookie;
        const refreshToken = cookieHeader.split('=')[1];
        // Clear the cookie by setting it to an expired date
        res.clearCookie('refreshToken', {
            httpOnly: true,     // Must match cookie options you used when setting the cookie
            secure: true,       // true if using https
            sameSite: 'Strict', // sameSite policy should match
            path: '/',          // make sure path matches where it was set
        });

        res.json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error logging out', error });
    }

}