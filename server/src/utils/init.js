const {User, Room} = require('../models/');

async function checkAndCreateTableWithDefaultData() {
    try {
        // 检查表是否已存在
        const tableExists = await User.exists();

        if (!tableExists) {
            // 如果表不存在，则创建表
            await User.sync({ force: true });
            console.log('User table created.');

            // 填入默认数据
            await User.bulkCreate([
                { username: 'admin', email: 'admin@example.com' },
                { username: 'user', email: 'user@example.com' }
                // 其他默认数据...
            ]);
            console.log('Default data inserted into User table.');
        } else {
            console.log('User table already exists.');
        }
    } catch (error) {
        console.error('Error checking/creating User table:', error);
    }
}

module.exports = checkAndCreateTableWithDefaultData;
