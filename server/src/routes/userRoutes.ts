// src/routes/userRoutes.js
import express from 'express';
import { userController } from '../controllers/impl/userController';


const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
