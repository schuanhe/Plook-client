// src/routes/userRoutes.js
import express from 'express';
import { userController } from '../controllers/userController';


const router = express.Router();

router.post('/', userController.addUser);

export default router;
