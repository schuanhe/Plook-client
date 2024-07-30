import {SocketEvent, SocketMessage, socketMessageType} from "./SocketType";

export interface socketGetRoomInfoType extends SocketMessage{
    data: {
        roomId: String;
        messageInfo: socketMessageType;
    }
}


export interface socketVideoInfoType extends SocketMessage{
    data: {
        roomId: String;
        messageInfo: socketMessageType;
        video: socketRoomVideoInfoType
    }
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