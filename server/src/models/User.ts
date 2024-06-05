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
    email!: string;
}

let User = UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});


export type UserInstance = typeof UserModel.prototype;
export default User;
export {UserModel};
