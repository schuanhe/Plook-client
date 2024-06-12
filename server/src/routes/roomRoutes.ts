import express from 'express';
import { roomController } from '../controllers/impl/roomController';
import authMiddleware from '../utils/authMiddleware';

const router = express.Router();

router.post('/',authMiddleware, roomController.createRoom);
router.get('/', authMiddleware, roomController.getRoomList);
router.get('/:id', authMiddleware, roomController.getRoomInfo);

export default router;
