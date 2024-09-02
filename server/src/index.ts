import init from "./utils/init";
import express from 'express';
import cors from 'cors';
import routes from './routes';
import config from './config';
import http from 'http';
import socketHandler from './services/socketHandler';


// 创建 Express 应用
const app = express();
// 启用跨域资源共享（CORS）
app.use(cors());
// 解析请求体中的 JSON 数据
app.use(express.json());
// 路由
app.use('/api', routes);
const server = http.createServer(app);
socketHandler(server)
const port = config.server.port;
// 启动服务器，监听指定端口
server.listen(port, () => {
    console.log(`Plook 服务端已启动 http://localhost:${port}`);
    init().then();
});