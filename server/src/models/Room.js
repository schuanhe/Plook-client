// models/userModel.js
const { DataTypes, Model} = require('sequelize');
const sequelize = require('../utlis/db');

class Room extends Model {}



Room.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roomUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Room',
    tableName: 'Rooms'
})

module.exports = Room;
