// models/userModel.js
import {DataTypes, Model} from 'sequelize';
import sequelize  from '../utils/db';

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
