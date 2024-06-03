// models/userModel.js
const { DataTypes, Model} = require('sequelize');
const sequelize = require('../utlis/db');

class User extends Model {}

const UserModel = {
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
}

User.init({
    ...UserModel
},  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});



module.exports = User;
