// db.ts
import {Sequelize} from 'sequelize';
import path from 'path';
import config from '../config';


let sequelize: Sequelize;

function initializeSequelize(): Sequelize {
    if (config.database.dialect === 'mysql') {
        sequelize = new Sequelize(    config.database.mysql.database, // 数据库名
            config.database.mysql.username, // 用户名
            config.database.mysql.password, // 密码
            {
                host: config.database.mysql.host, // 主机地址
                port: config.database.mysql.port, // 端口号
                dialect: config.database.mysql.dialect as 'mysql', // 明确指定方言为 'mysql'
            });
    } else if (config.database.dialect === 'sqlite3') {
        const sqlitePath = path.join(config.database.sqlite3.storage);
        console.log(sqlitePath)
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: sqlitePath
        });
    } else {
        throw new Error('不识别的数据库类型');
    }
    return sequelize;
}

sequelize = initializeSequelize();

export default sequelize;
