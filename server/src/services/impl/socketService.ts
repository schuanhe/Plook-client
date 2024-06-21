
import type {Server} from "socket.io";
import {CustomSocket, SocketEvent, SocketMessage} from "../socketHandler";
import { roomService } from "./roomService";


export class SocketService {
    private socket:CustomSocket

    constructor(socket: CustomSocket) {
        this.socket = socket;
    }

    // ROOM_INFO 事件处理

    public joinRoom(message: SocketMessage) {
        console.log('joinRoom', message)
        const {roomId} = message.data;
        if (!roomId){
            console.log('房间号不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号不能为空');
            return;
        }
        this.socket.join(String(roomId));
        console.log(`${this.socket.id} 加入房间 ${roomId}`);
    }

    public leaveRoom(message: SocketMessage) {
        const {roomId} = message.data;
        if (!roomId){
            console.log('房间号不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号不能为空');
            return;
        }
        this.socket.leave(String(roomId));
        console.log(`${this.socket.id} 离开房间 ${roomId}`);
    }

    public getRoomInfo(message: SocketMessage, io: Server) {
        const { roomId } = message.data;
        if (!roomId) {
            console.log('房间号不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号不能为空');
            return;
        }

        const roomSockets = io.sockets.adapter.rooms.get(String(roomId));
        if (roomSockets) {
            const clients = Array.from(roomSockets).map(socketId => {
                const clientSocket = io.sockets.sockets.get(socketId) as CustomSocket;
                return { userId: clientSocket?.user };
            });
            this.socket.emit(SocketEvent.ROOM_INFO, clients);
        } else {
            console.log(`房间 ${roomId} 不存在`);
            this.socket.emit(SocketEvent.ERROR, `房间 ${roomId} 不存在`);
        }
    }

    sendMessage(socketMessage: SocketMessage, io: Server) {
        const { roomId, message } = socketMessage.data;
        if (!roomId || !message) {
            console.log('房间号或消息不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号或消息不能为空');
            return;
        }

        console.log(`${this.socket.user} 发送消息到房间 ${roomId}`)
        if (this.socket.rooms.has(String(roomId))) {
            io.to(String(roomId)).emit(SocketEvent.ROOM_MESSAGE, {
                userId: this.socket.user,
                message: message
            });
        } else {
            console.log(`${this.socket.id} 未加入房间 ${roomId}`);
            this.socket.emit(SocketEvent.ERROR, `${this.socket.id} 未加入房间 ${roomId}`);
        }

    }
    getRoomDbInfo(socketMessage: SocketMessage) {
        const { roomId } = socketMessage.data;
        const userId = this.socket.user;
        if (!roomId || !userId || !Number(userId) || !Number(roomId)) {
            this.socket.emit(SocketEvent.ERROR, '参数错误');
            return;
        }
        roomService.getRoomInfo(roomId).then((roomInfo) => {
            if (roomInfo) {
                this.socket.emit(SocketEvent.ROOM_DB_INFO, roomInfo);
            } else {
                this.socket.emit(SocketEvent.ROOM_DB_INFO, '房间不存在');
            }
        }).catch(() => {
            this.socket.emit(SocketEvent.ROOM_DB_INFO, '获取房间信息失败');
        })


    }
}
