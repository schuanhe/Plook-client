import {DataTypes, Model} from 'sequelize';
import sequelize  from '../utils/db';
import User from "./User";


class RoomModel extends Model {
    id!: number;
    roomName!: string;
    password: string|undefined;
    roomVideoUrl!: string;
}

let Room = RoomModel.init({
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

export type RoomInstance = typeof RoomModel.prototype;
export default Room;
export {RoomModel};
