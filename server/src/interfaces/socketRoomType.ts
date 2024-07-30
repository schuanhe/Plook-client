import {SocketEvent, SocketMessage} from "./SocketType";

export interface socketGetRoomInfoType extends SocketMessage{
    type: SocketEvent.ROOM_INFO
    data: {
        roomId: number;
        messageInfo: socketMessageType;
    };
}


export interface socketMessageType {
    sendSocketId: string;
    sendDate: number;
    receiveSocketId: string;
    receiveDate?: number;
}


export interface socketVideoInfoType {
    /**
     * 房间id
     */
    roomId: number;
    /**
     * 视频信息
     */
    video: socketRoomVideoInfoType
}

/**
 * 房间 视频信息
 */
export interface socketRoomVideoInfoType {
    /**
     * 视频地址
     */
    videoUrl: string;
    /**
     * 视频名称
     */
    videoName: string;
    /**
     * 视频时长
     */
    videoTime: number;
    /**
     * 是否正在播放
     */
    videoStar: boolean
}