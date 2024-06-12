import {DataTypes, Model} from "sequelize";
import User from "../User";
import Room from "../Room";
import db from "../../utils/db";


class RoomUserModel extends Model {
    id!: number;
    userId!: number;
    roomId!: number;
    joinedAt!: Date;
}


const RoomUser = RoomUserModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    roomId: {
        type: DataTypes.INTEGER,
        references: {
            model: Room,
            key: 'id'
        }
    },
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize: db,
    modelName: 'room_user',
    timestamps: false
});

User.belongsToMany(Room, { through: RoomUser, foreignKey: 'userId' });
Room.belongsToMany(User, { through: RoomUser, foreignKey: 'roomId' });

export default RoomUser;
export type RoomUserInstance = typeof RoomUserModel.prototype;
export {RoomUserModel};