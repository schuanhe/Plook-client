// src/controllers/userController.js
// const userService = require('../services').userService;
const {userService} = require('../services/index');


const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        console.log("????????")
        const user = await userService.addUser(username, email);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser
};
