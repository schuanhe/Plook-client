
import type {Server, Socket} from "socket.io";

import { roomService } from "./roomService";
import {SocketEvent, SocketMessage, socketVideoInfoType} from "../../interfaces";


export class SocketService {
    private socket:Socket

    constructor(socket: Socket) {
        this.socket = socket;
    }

    // ROOM_INFO 事件处理

    public joinRoom(message: SocketMessage) {
        console.log('joinRoom', message)
        const {roomId} = message.data;
        if (!roomId){
            console.log('房间号不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号不能为空');
        }
        this.socket.join(String(roomId));
        this.socket.emit(SocketEvent.ROOM_INFO, '加入房间成功');
    }

    public leaveRoom(message: SocketMessage) {
        const {roomId} = message.data;
        if (!roomId){
            console.log('房间号不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号不能为空');
        }
        this.socket.leave(String(roomId));
        console.log(`${this.socket.id} 离开房间 ${roomId}`);
    }

    public getRoomInfo(message: SocketMessage, io: Server) {
        const { roomId } = message.data;
        if (!roomId) {
            console.log('房间号不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号不能为空');
        }
        const roomSockets = io.sockets.adapter.rooms.get(String(roomId));
        if (roomSockets) {
            // 判断用户是否在房间中
            if (!roomSockets.has(this.socket.id)) {
                console.log(`${this.socket.id} 未加入房间 ${roomId}`);
                this.socket.emit(SocketEvent.ERROR, `未加入房间 ${roomId}`);
                return;
            }
            const clients = Array.from(roomSockets).map(socketId => {
                const clientSocket = io.sockets.sockets.get(socketId);
                if (!clientSocket) {
                    return null;
                }
                return { userSocketId:clientSocket.id, userData: clientSocket.data.userData };
            });

            // 请求客户端返回房间的信息
            let roomVideoInfo: socketVideoInfoType;
            if (clients.length > 1){
                clients.forEach((client) => {
                    if (client?.userSocketId && client?.userSocketId != this.socket.id) {
                        // 发送消息 到 客户端 请求
                        io.to(client.userSocketId).emit(SocketEvent.ROOM_INFO, {
                            mySocketId: this.socket.id,
                            clients: clients
                        });
                    }
                })
            }


            this.socket.emit(SocketEvent.ROOM_INFO, {
                mySocketId: this.socket.id,
                clients: clients
            });
        } else {
            console.log(`房间 ${roomId} 不存在`);
            this.socket.emit(SocketEvent.ERROR, `房间 ${roomId} 不存在`);
        }
    }


    sendMessage(socketMessage: SocketMessage, io: Server) {
        const { roomId, message,user } = socketMessage.data;
        if (!roomId || !message) {
            console.log('房间号或消息不能为空');
            this.socket.emit(SocketEvent.ERROR, '房间号或消息不能为空');
            return;
        }

        console.log(`${this.socket.data.userData.userId} 发送消息到房间 ${roomId}`)
        if (this.socket.rooms.has(String(roomId))) {
            io.to(String(roomId)).emit(SocketEvent.ROOM_MESSAGE, {
                userId: this.socket.data.userData.userId,
                message: message,
                user:user
            });
        } else {
            console.log(`${this.socket.id} 未加入房间 ${roomId}`);
            this.socket.emit(SocketEvent.ERROR, `${this.socket.id} 未加入房间 ${roomId}`);
        }

    }
    getRoomDbInfo(socketMessage: SocketMessage) {
        const { roomId } = socketMessage.data;
        const userId = this.socket.data.userData.userId;
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

    /**
     * 发送请求房间 信息
     */
    sendRequestRoomInfo(socketMessage: SocketMessage, io: Server) {
        const { roomId, messageInfo } = socketMessage.data;

        let roomInfo:SocketMessage = {
            data:{
                roomId:roomId,
                messageInfo:messageInfo
            },
            type: "getRoomInfo"
        }
        // 获取房间内第一个用户的socket
        const clientSocket = io.sockets.sockets.get(messageInfo.receiveSocketId);
        if (clientSocket)
            clientSocket.emit(SocketEvent.ROOM_INFO, roomInfo);
    }
}
