const {User} = require('../../models/User');

// 向数据库添加用户的方法
async function addUser(username,email) {
    try {
        console.log('添加用户:', username, email)
        // 在数据库中创建用户
        const user = await User.create({ username, email });
        console.log('用户已成功添加:', user.toJSON());
        return user;
    } catch (error) {
        console.error('添加用户时出错:', error);
        throw error;
    }
}

// 创建User表
async function createUserTable() {
    try {
        await User.sync();
        console.log('User表已成功创建');
    } catch (error) {
        console.error('创建User表时出错:', error);
        throw error;
    }
}

module.exports = {
    addUser,
    createUserTable
};
