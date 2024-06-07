// models/userModel.ts
import {DataTypes, Model, ModelCtor} from 'sequelize';
import sequelize from '../utils/db';
import config from "../config";


/*
 * 用户模型
 */
class UserModel extends Model {
    id!: number;
    username!: string;
    password!: string;
    email: string | undefined;
}

let User = UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // 确保用户名唯一
        validate: {
            isAlphanumeric: true, // 验证用户名是否只包含字母和数字
            len: [3, 20] // 验证用户名长度是否在 3 到 20 个字符之间
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 20] // 验证密码长度是否在 6 到 20 个字符之间
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true // 验证邮箱格式是否正确
        }
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
});


export type UserInstance = typeof UserModel.prototype;
export default User;
export {UserModel};
