import path from 'path';
require('dotenv').config();

let rootPath = path.resolve(__dirname, '..')

export default  {

    rootPath: rootPath,
    server: {
        port: process.env.PORT || 3001 // 使用环境变量指定端口号，否则默认为 3000
    },
    database: {
        dialect: process.env.DB_DIALECT || 'mysql', // 使用环境变量指定数据库类型，默认为 SQLite
        sqlite3: {
            storage: process.env.DB_SQLITE_STORAGE || rootPath +'/data/db.sqlite' // 使用环境变量指定 SQLite 数据库文件路径
        },
        mysql: {
            host: process.env.DB_HOST || 'localhost', // MySQL 主机地址
            port: (process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306),
            username: process.env.DB_USERNAME || 'root', // MySQL 用户名
            password: process.env.DB_PASSWORD || 'root', // MySQL 密码
            database: process.env.DB_NAME || 'plook', // MySQL 数据库名称
            dialect: 'mysql'
        }
    },
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key', // 使用环境变量指定 JWT 密钥，否则使用默认值
};
