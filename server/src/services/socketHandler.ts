import { Server as SocketIOServer,Socket } from 'socket.io';
import { Server } from 'http'
import jwt, {JwtPayload} from 'jsonwebtoken';
import { roomService } from "./impl/roomService";
import config from "../config";

export default function (server: Server) {

    const io = new SocketIOServer(server)

    const socketHandler = SocketHandler.getInstance();
    io.on('connection', (socket:CustomSocket) => {
        console.log('A user connected');

        // 发送ping
        socket.emit('ping', 'pong');
        socket.user = 123

        // 监听客户端发送的消息
        socket.on(SocketEvent.SEND_MESSAGE, (msg) => {
            console.log('message: ' + msg);
            // 广播消息给所有客户端
            io.emit('chat message', msg);
        });

        socket.on(SocketEvent.SEND_MESSAGE_IN_ROOM, (data) => {
            console.log(data.room, data.message);
            io.to(data.room).emit('message', data.message);
        });

        socket.on(SocketEvent.JOIN_ROOM, (roomId: number) => {
            if (typeof socket.user === 'number'){
                socket.join(String(roomId));
                socketHandler.joinRoom(roomId, socket.user,socket.id);
                console.log(`${socket.id} 加入房间 ${roomId}`)
                // 给当前用户发送 信息
                roomService.getRoomInfo(roomId).then((roomInfo) => {
                    socket.emit(SocketEvent.GET_ROOM_INFO, roomInfo);
                }).catch((err) => {
                    socket.emit(SocketEvent.ERROR, err);
                })
            }else {
                socket.emit(SocketEvent.ERROR, '用户未登录');
            }
        })
        socket.on(SocketEvent.LEAVE_ROOM, (roomId: number) => {
            if (typeof socket.user === 'number'){
                socketHandler.leaveRoom(socket.user, roomId);
                console.log(`${socket.id} 离开房间 ${roomId}`)
                socket.leave(String(roomId));
            }
        })

        // 当客户端断开连接时执行的逻辑
        socket.on('disconnect', () => {
            if (typeof socket.user === 'number')
                socketHandler.leaveRoom(socket.user,Number(socket.rooms));
        });
    });
};

interface CustomSocket extends Socket {
    user?: number | JwtPayload;
}

/**
 * socket.io 事件枚举
 */
export enum SocketEvent {
    /**
     * 获取房间的信息
     */
    GET_ROOM_INFO = 'getRoomInfo',
    /**
     * 加入房间
     */
    JOIN_ROOM = 'joinRoom',
    /**
     * 离开房间
     */
    LEAVE_ROOM = 'leaveRoom',
    /**
     * 在房间内发送消息
     */
    SEND_MESSAGE_IN_ROOM = 'sendMessageInRoom',
    /**
     * 发送消息
     */
    SEND_MESSAGE = 'sendMessage',
    /**
     * 错误
     */
    ERROR = 'error',
}

/**
 * socket.io 用户房间缓存
 */
class SocketHandler {
    private static instance: SocketHandler;
    /**
     * 用户房间缓存
     * @private Map<房间id,Set<Map<用户id,socket链接id>>
     */
    private rooms: Map<number, Set<Map<number,string>>> = new Map();

    private constructor() {
        console.log('SocketHandler created');
    }

    public static getInstance(): SocketHandler {
        if (!SocketHandler.instance) {
            SocketHandler.instance = new SocketHandler();
        }
        return SocketHandler.instance;
    }

    public joinRoom(roomId: number, userId: number, socketId: string) {
        const room = this.rooms.get(roomId);
        if (!room) {
            this.rooms.set(roomId, new Set([new Map([[userId, socketId]])]));
        } else {
            room.add(new Map([[userId, socketId]]));
        }
        console.log(`${userId} 加入房间 ${roomId}`);
    }

    public leaveRoom(roomId: number, userId: number) {
        const room = this.rooms.get(roomId);
        if (room) {
            room.forEach((userMap) => {
                if (userMap.has(userId)) {
                    userMap.delete(userId);
                    console.log(`${userId} 离开房间 ${roomId}`);
                }
            });
            if (room.size === 0) {
                this.rooms.delete(roomId);
            }
        }
    }

    public getRoomUsers(roomId: number): Map<number, string> {
        const room = this.rooms.get(roomId);
        if (room) {
            const users: Map<number, string> = new Map();
            room.forEach((userMap) => {
                userMap.forEach((socketId, userId) => {
                    users.set(userId, socketId);
                });
            });
            return users;
        }
        return new Map();
    }
}
