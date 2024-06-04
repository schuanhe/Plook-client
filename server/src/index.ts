import init from "./utils/init";

require('dotenv').config(); // 加载环境变量
// 引入所需的模块
import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';
import config from './config';

// 创建 Express 应用
const app = express();

// 解析请求体中的 JSON 数据
app.use(express.json());

// 路由
app.use('/', routes);
init()

const port = config.server.port
// 启动服务器，监听指定端口
app.listen(port, () => {
    console.log(`Plook 服务端已启动 http://localhost:${port}`);
});
