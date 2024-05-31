// models/userModel.js
const { DataTypes} = require('sequelize');
const sequelize = require('../../utlis/db');



const Room = sequelize.define('Room', {
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomXX: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Room;
