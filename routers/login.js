const path = require('path');

const db = require(path.join(__dirname, '../utils/db.js'));
const utility = require('utility');
const jsonwebtoken = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

// 写接口
// 注册接口
router.post('/reguser', async (req, res) => {
    console.log(req.body);
  // 密码加密
  req.body.password = utility.md5(req.body.password);
  let r = await db('insert into user set ?', req.body);
  if (r && r.affectedRows > 0) {
    res.send({
      status: 0,
      message: '注册成功',
    });
  } else {
    res.send({
      status: 1,
      message: '注册失败',
    });
  }
});

// 登录接口
router.post('/login', async (req, res) => {
  let username = req.body.username;
  let password = utility.md5(req.body.password);
  let r = await db('select * from user where username=? and password=?', [
    username,
    password,
  ]);

  if (r && r.length > 0) {
    res.send({
      status: 0,
      message: '登录成功',

      token:'Bearer ' + jsonwebtoken.sign(
          {username: req.body.username, id: r[0].id},
          'bigevent',
          {expiresIn: '2 days'}
      )
    });
  } else {
    res.send({ status: 1,
         message: '注册失败' });
  }
});

module.exports = router;
