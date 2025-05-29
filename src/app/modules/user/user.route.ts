import express from 'express';
import { UserController } from './user.controller';
import { verifyRole } from '../../middlewares/VerifyRole';

const router = express.Router();

router.get('/:id', verifyRole('admin'), UserController.getSingleUser);
router.get('/', verifyRole('admin'), UserController.getAllUsers);

export const UserRoutes = router;
