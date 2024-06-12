// src/routes/userRoutes.js
import express from 'express';
import { userController } from '../controllers/impl/userController';


const router = express.Router();

router.post('/', userController.register);

export default router;
