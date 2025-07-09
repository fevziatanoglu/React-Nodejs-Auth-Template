import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/usersController.js';
import { authenticate } from '../middlewares/authenticate.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = express.Router();

router.get('/', authenticate, authorizeRole('admin'), getUsers);
router.get('/:id', authenticate, authorizeRole('admin'), getUserById);
router.post('/', authenticate, authorizeRole('admin'), createUser);
router.put('/:id', authenticate, authorizeRole('admin'), updateUser);
router.delete('/:id', authenticate, authorizeRole('admin'), deleteUser);

export default router;
