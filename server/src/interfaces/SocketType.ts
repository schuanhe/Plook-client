
/**
 * socket.io 事件枚举
 */
export enum SocketEvent {
    /**
     * 房间的信息
     */
    ROOM_INFO = 'roomInfo',
    /**
     * 房间的数据库信息
     */
    ROOM_DB_INFO = 'roomDbInfo',
    /**
     * 房间内聊天
     */
    ROOM_MESSAGE = 'roomMessage',
    /**
     * 公共广播
     */
    BROADCAST = 'broadcast',
    /**
     * 错误(需要断开连接)
     */
    ERROR = 'error',

}

/**
 * socket.io 消息格式
 */
export interface SocketMessage {
    /**
     * 消息类型
     */
    type: SocketEvent;
    /**
     * 消息内容
     */
    data: any;
}