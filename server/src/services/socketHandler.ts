import { Server as SocketIOServer,Socket } from 'socket.io';
import { Server } from 'http'
import {JwtPayload} from 'jsonwebtoken';

import {SocketService} from "./impl/socketService";


export default function (server: Server) {

    const io = new SocketIOServer(server)

    io.on('connection', (socket:CustomSocket) => {
        const socketService = new SocketService(socket);


        socket.on(SocketEvent.ROOM_INFO, (socketMessage:SocketMessage) => {
            if (socketMessage.type === "join")
                socketService.joinRoom(socketMessage);
            if (socketMessage.type === "leave")
                socketService.leaveRoom(socketMessage);
            if (socketMessage.type === "getRoomInfo")
                socketService.getRoomInfo(socketMessage, io);
        })

        socket.on(SocketEvent.ROOM_DB_INFO, (socketMessage:SocketMessage) => {
            socketService.getRoomDbInfo(socketMessage);
        })

        socket.on(SocketEvent.ROOM_MESSAGE, (socketMessage:SocketMessage) => {
            socketService.sendMessage(socketMessage, io);
        })

        // TODO 暂时不开放




        // 当客户端断开连接时执行的逻辑
        socket.on('disconnect', () => {
            console.log('客户端断开连接')
        });
    });
};

export interface CustomSocket extends Socket {
    user?: number | JwtPayload;
}

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
    type: String;
    /**
     * 消息内容
     */
    data: any;
}