const path = require('path');
const cors = require('cors');
const express = require('express');
const expressjwt = require('express-jwt');
const app = express();
app.listen(3306, () => console.log('大事件服务器启动了'));

// 配置中间件
app.use(cors());
app.use(express.urlencoded({extended: false}));


app.use(expressjwt({secret: 'bigevent'}).unless({path: /^\/api$/}));
// 加载路由模块
app.use('/api', require(path.join(__dirname, 'routers', 'login')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'category')));
app.use('/my/article', require(path.join(__dirname, 'routers', 'article')));
app.use('/my', require(path.join(__dirname, 'routers', 'user')));

// 错误处理中间件
app.use(function (err, req, res, next) {
    // console.log(err.name);
    // console.log(err.message);
    
    if (err.name === 'UnauthorizedError') {
    console.log(err.message);

        res.status(401).send({status: 1, messge: '身份认证失败'})
    }
})