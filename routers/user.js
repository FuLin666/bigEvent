const express = require('express');
const router = express.Router();

router.get('/userinfo', async (req, res) => {
    // 当用户请求这个接口的时候，作为服务器，该做什么
    // let r = await db('select * from user where id = ?');
    console.log(req.user); // { username: 'laotang', id: 10}
});
module.exports = router;