import { Server as SocketIOServer,Socket } from 'socket.io';
import { Server } from 'http'
import {JwtPayload} from 'jsonwebtoken';

import {SocketService} from "./impl/socketService";
import {SocketEvent, socketGetRoomInfoType, SocketMessage} from "../interfaces";



export default function (server: Server) {

    const io = new SocketIOServer(server)

    io.on('connection', (socket:Socket) => {
        const socketService = new SocketService(socket);
        // 判断用户是否登录
        if (socket.handshake.query && socket.handshake.query.token) {
            const token = socket.handshake.query.token;
            // TODO: 验证 token 是否有效

            socket.data.userData = {};
            socket.data.userData.userId = Number(token);
            if (!socket.data.userData.userId) {
                socket.emit(SocketEvent.ERROR, {
                    message: '请先登录'
                });
                socket.disconnect();
            } else {
                console.log('token:', token);
                console.log('客户端连接成功')
            }
        } else {
            socket.emit(SocketEvent.ERROR, {
                message: '请先登录'
            });
            socket.disconnect();
        }



        socket.on(SocketEvent.ROOM_INFO, (socketMessage:SocketMessage) => {
            if (socketMessage.type === "join")
                socketService.joinRoom(socketMessage);
            if (socketMessage.type === "leave")
                socketService.leaveRoom(socketMessage);
            if (socketMessage.type === "getRoomInfo")
                socketService.getRoomInfo(socketMessage, io);
            if (socketMessage.type === "setRoomInfo")
                socketService.setRoomInfo(socketMessage, io);
        })

        socket.on(SocketEvent.ROOM_DB_INFO, (socketMessage:SocketMessage) => {
            socketService.getRoomDbInfo(socketMessage);
        })

        socket.on(SocketEvent.ROOM_MESSAGE, (socketMessage:SocketMessage) => {
            socketService.sendMessage(socketMessage, io);
        })


        // 当客户端断开连接时执行的逻辑
        socket.on('disconnect', () => {
            console.log('客户端断开连接')
        });
    });
};

