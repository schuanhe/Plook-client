
import type {Server, Socket} from "socket.io";
import { SocketEvent, SocketMessage} from "../socketHandler";
import { roomService } from "./roomService";


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
            return;
        }
        this.socket.join(String(roomId));
        this.socket.emit(SocketEvent.ROOM_INFO, '加入房间成功');
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
                const clientSocket = io.sockets.sockets.get(socketId);
                if (!clientSocket) {
                    return null;
                }
                return { userSocketId:clientSocket.id, userData: clientSocket.data.userData };
            });
            this.socket.emit(SocketEvent.ROOM_INFO, clients);
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
