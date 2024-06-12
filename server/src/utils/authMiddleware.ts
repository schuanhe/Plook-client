import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
// 假设你使用的是基于令牌的鉴权，比如 JWT
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: '未授权访问' });
    }
    try {
        // 假设使用jsonwebtoken库来验证JWT
        const decoded = jwt.verify(token, config.jwtSecret);
        req.body.jwtUserId = Number(decoded);
        next();
    } catch (error) {
        return res.status(401).json({ message: '令牌无效或已过期' });
    }
};

export default authMiddleware;
