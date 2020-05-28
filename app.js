const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
app.listen(3306, () => console.log('大事件服务器启动了'));

// 配置中间件
app.use(cors());
app.use(express.urlencoded({extended: false}));

// 加载路由模块
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')));
app.use('/my', require(path.join(__dirname, 'routers', 'user')));