// models/userModel.js
const { DataTypes} = require('sequelize');
const sequelize = require('../../utlis/db');



const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;
