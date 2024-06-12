import { IRoomService } from "../iRoomService.";
import Room, { RoomModel } from "../../models/Room";
import { UserModel } from "../../models/User";
import RoomUser, { RoomUserModel } from "../../models/associations/RoomUser";

class RoomService implements IRoomService {
    addRoom(room: RoomModel): Promise<RoomModel> {
        if (!room.roomName || !room.userId || !room.roomVideoUrl)
            return Promise.reject("房间信息不完整");
        return Room.create({
            roomName: room.roomName,
            roomVideoUrl: room.roomVideoUrl,
            userId: room.userId,
            password: room.password
        })
    }

    getRoomInfo(roomId: number): Promise<RoomModel|null> {
        return Room.findOne({
            where: {
                id: roomId
            }
        })
    }

    async getRoomList(user: UserModel): Promise<RoomModel[]> {
        try {
            // 查找用户所在的所有房间
            const roomUsers = await RoomUser.findAll({
                where: {
                    userId: user.id
                }
            });
            const roomIds = roomUsers.map((roomUser) => roomUser.roomId);
            return await Room.findAll({
                where: {
                    id: roomIds
                }
            });
        } catch (err) {
            return Promise.reject(err);
        }
    }


    async joinRoom(room: RoomModel, user: UserModel): Promise<RoomUserModel> {
        if (!room.id || !user.id) {
            return Promise.reject("加入房间信息不完整");
        }
        try {
            const roomDb = await this.getRoomInfo(room.id);
            if (!roomDb) {
                return Promise.reject("房间不存在");
            }
            if (roomDb.password && roomDb.password !== room.password) {
                return Promise.reject("密码错误");
            }
            return await RoomUser.create({
                userId: user.id,
                roomId: room.id
            });
        } catch (err) {
            console.error("加入房间时发生错误:", err);
            return Promise.reject(err);
        }
    }

    init(): void {
        try {
            RoomUser.sync().then();
        } catch (error) {
            console.error('初始化失败:', error);
        }
    }
}