// userService.js
const {UserModel} = require('../../models/User');

// 向数据库添加用户的方法
async function addUser(username,email) {

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
