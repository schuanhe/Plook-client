
// 设置接口
import {RoomModel} from "../models/Room";
import {RoomUserModel} from "../models/associations/RoomUser"
import {UserModel} from "../models/User";

export interface IRoomService {

    /**
     * 创建房间
     */
    addRoom(room: RoomModel): Promise<RoomModel>;

    /**
     * 获取房间 信息
     */
    getRoomInfo(roomId: number): Promise<RoomModel|null>;

    /**
     * 获取房间列表（可见）
     */
    getRoomList(user: UserModel): Promise<RoomModel[]>;

    /**
     * 加入房间
     */
    joinRoom(room: RoomModel, userId: number): Promise<RoomUserModel>;


    /**
     * 初始化
     */
    init(): void;

}
