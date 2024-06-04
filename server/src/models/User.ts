// models/userModel.ts
import {DataTypes, Model} from 'sequelize';
import sequelize  from '../utils/db';

/*
 * 用户模型
 */



class UserModel extends Model{
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
},  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});


export default User;
export {UserModel};
