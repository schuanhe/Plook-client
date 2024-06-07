import {DataTypes, Model} from "sequelize";
import User from "../User";
import Room from "../Room";
import db from "../../utils/db";


class RoomUserModel extends Model {
    id!: number;
    roomName!: string;
    password: string | undefined;
    roomVideoUrl!: string;
}


const UserRoom = RoomUserModel.init({
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

User.belongsToMany(Room, { through: UserRoom, foreignKey: 'userId' });
Room.belongsToMany(User, { through: UserRoom, foreignKey: 'roomId' });