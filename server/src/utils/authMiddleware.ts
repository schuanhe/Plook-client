import express from 'express';
import jwt,{ JwtPayload }  from 'jsonwebtoken';
import config from '../config';
import user from "../models/User";
// 假设你使用的是基于令牌的鉴权，比如 JWT
const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: '未授权访问' });
    }
    try {
        // 假设使用jsonwebtoken库来验证JWT
        const decoded = jwt.verify(token, config.jwtSecret);

        if (typeof decoded !== 'string'){
            req.body.jwtUserId = Number(decoded.userId);
            next();
        }
    } catch (error) {
        return res.status(401).json({ message: '令牌无效或已过期' });
    }
};

export default authMiddleware;
