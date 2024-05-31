// db.js
const { Sequelize } = require('sequelize');
const path = require('path');
const config = require('../config');

let sequelize;


// 根据配置文件中的 dialect 决定使用哪种数据库
if (config.database.dialect === 'mysql') {
    sequelize = new Sequelize(config.database.mysql);
} else if (config.database.dialect === 'sqlite3') {

    const sqlitePath = path.join(config.database.sqlite3.storage);
    console.log(sqlitePath)
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: sqlitePath
    });
} else {
    throw new Error('没有找到匹配的数据库类型');
}

module.exports = sequelize;
