// models/userModel.ts
import {Model} from 'sequelize';


/*
 * 用户模型
 */
class UserModel {
    id!: number;
    username!: string;
    email!: string;
}

export type UserInstance = typeof UserModel.prototype;
export {UserModel};
