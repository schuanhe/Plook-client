import io from '@hyoga/uni-socket.io';
import config from "../config";
import {onRoomInfo, onRoomMessage} from "./onMessage";

class SocketIo {

    constructor() {
        this.socket = null;  // 初始化socket属性
        this.token = uni.getStorageSync('token');
    }

    start() {
        console.log('socketIo start',config.baseUrl)
        console.log('token',this.token)
        this.socket = io(config.baseUrl, {
            transports: ['websocket'],
            path: '/socket.io',
            query: {
                token: this.token,
            },
        });
        this.socket.on('connect', () => {
            console.log('ws 已连接');
            const { id } = this.socket;
            this.socket.on(id, (message) => {
                console.log('ws 收到服务器消息：', message);
            });


            this.socket.on(SocketEvent.ROOM_INFO, (message) => {
                console.log('ws 收到服务器消息：', message);
                onRoomInfo(message)
            });
            this.socket.on(SocketEvent.ROOM_DB_INFO, (message) => {
                console.log('ws 收到服务器消息：', message);
            });
            this.socket.on(SocketEvent.ROOM_MESSAGE, (message) => {
                console.log('ws 收到服务器消息：', message);
                onRoomMessage(message)
            });
            this.socket.on(SocketEvent.VIDEO_OPERATION, (message) => {
                console.log('ws 收到服务器消息：', message);
            });
            this.socket.on(SocketEvent.BROADCAST, (message) => {
                console.log('ws 收到服务器消息：', message);
            });

            this.socket.emit('send_data', {
                time: +new Date(),
            });
        });


        this.socket.on(SocketEvent.ERROR, (message) => {
            console.log('ws 收到服务器错误消息2：', message);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('ws 连接断开', reason);
        });
        this.socket.on('connect_error', (error) => {
            console.log('ws 连接错误', error);
        });
    }
    stop() {
        this.socket.close();
    }
    send(socketMessage) {
        this.socket.emit(socketMessage.type, socketMessage.data);
    }

    getSocket() {
        return this.socket;
    }

}

/**
 * socket.io 事件枚举
 */
export const SocketEvent = {
    /**
     * 房间的信息
     */
    ROOM_INFO : 'roomInfo',
    /**
     * 房间的数据库信息
     */
    ROOM_DB_INFO : 'roomDbInfo',
    /**
     * 房间内聊天
     */
    ROOM_MESSAGE : 'roomMessage',
    /**
     * 视频操作
     */
    VIDEO_OPERATION : 'videoOperation',
    /**
     * 公共广播
     */
    BROADCAST : 'broadcast',
    /**
     * 错误(需要断开连接)
     */
    ERROR : 'error',
};
Object.freeze(SocketEvent);

class SocketMessage {
    setTypeAndData(type, data) {
        this.type = type;
        this.data = data;
    }

    static sendRoomInfo(data) {
        const SM = new SocketMessage();
        SM.setTypeAndData(SocketEvent.ROOM_INFO, data);
        return SM;
    }
    static sendRoomDbInfo(data) {
        const SM = new SocketMessage();
        SM.setTypeAndData(SocketEvent.ROOM_DB_INFO, data);
        return SM;
    }
    static sendRoomMessage(data) {
        const SM = new SocketMessage();
        SM.setTypeAndData(SocketEvent.ROOM_MESSAGE, data);
        return SM;
    }
    static sendVideoOperation(data) {
        const SM = new SocketMessage();
        SM.setTypeAndData(SocketEvent.VIDEO_OPERATION, data);
        return SM;
    }
    static sendBroadcast(data) {
        const SM = new SocketMessage();
        SM.setTypeAndData(SocketEvent.BROADCAST, data);
        return SM;
    }
    static sendError(data) {
        const SM = new SocketMessage();
        SM.setTypeAndData(SocketEvent.ERROR, data);
        return SM;
    }

    toString() {
        return JSON.stringify(this);
    }
}

export const socketIo = new SocketIo();
export const socketMessage = SocketMessage
