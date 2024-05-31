// src/routes/index.js
const express = require('express');
const router = express.Router();

// 导入其他路由模块
const userRoutes = require('./userRoutes');
// const authRoutes = require('./authRoutes');
// 还可以继续导入其他路由模块...

// 将其他路由模块挂载到主路由上
router.use('/users', userRoutes);
// router.use('/auth', authRoutes);
// 可以继续挂载其他路由...

module.exports = router;
