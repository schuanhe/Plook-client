import jwt from 'jsonwebtoken';
import config from "../config";




/**
 * 生成 JWT
 */

export const generateToken = (userId: number) => {
    return jwt.sign({
        userId: userId
    }, config.jwtSecret, {expiresIn: '72h'});
};