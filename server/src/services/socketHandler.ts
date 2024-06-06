import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http'
export default function (server: Server) {

    const io = new SocketIOServer(server)

    io.on('connection', (socket) => {
        console.log('A user connected');

        // 监听客户端发送的消息
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            // 广播消息给所有客户端
            io.emit('chat message', msg);
        });

        // 当客户端断开连接时执行的逻辑
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};
