import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import bcrypt from 'bcryptjs';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password -refreshToken');
        return sendSuccess(res, 'Users fetched successfully', users, 200);
    } catch (error) {
        return sendError(res, 'Error fetching users', error, 500);
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, '-password -refreshToken');
        if (!user) return sendError(res, 'User not found', {}, 404);
        return sendSuccess(res, 'User fetched successfully', user, 200);
    } catch (error) {
        return sendError(res, 'Error fetching user', error, 500);
    }
};

export const createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return sendError(res, 'Email already in use', {}, 400);

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword, role });

        return sendSuccess(res, 'User created successfully', {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role
        }, 201);
    } catch (error) {
        return sendError(res, 'Error creating user', error, 500);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const updateData = { username, email, role };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true, select: '-password -refreshToken' });
        if (!user) return sendError(res, 'User not found', {}, 404);
        return sendSuccess(res, 'User updated successfully', user, 200);
    } catch (error) {
        return sendError(res, 'Error updating user', error, 500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return sendError(res, 'User not found', {}, 404);
        return sendSuccess(res, 'User deleted successfully', {}, 200);
    } catch (error) {
        return sendError(res, 'Error deleting user', error, 500);
    }
};
