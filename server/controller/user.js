let mongoose = require('mongoose');
let User = mongoose.model('user');
let user = new User();
let md5 = require('md5');

let sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function (req, res) {
    user.username = req.body.username;
    user.password = md5(req.body.password);
    User.create({
        username: req.body.username,
        password: md5(req.body.password)
    }, function (err, user) {
        if (err) {
            sendResponse(res, 400, {message: "Tên đăng nhập đã tồn tại"});
        } else {
            sendResponse(res, 200, {
                message: "Đăng ký thành công"
            });
        }
    });
}

module.exports.login = function (req, res) {
    User.findOne({
        'username': req.body.username,
        'password': md5(req.body.password)
    }, function (err, user) {
        if(err) {
            sendResponse(res, 400, err);
        } else if (!user) {
            sendResponse(res, 404, { message: 'Tên đăng nhập hoặc mật khẩu khôn đúng' });
        } else {
            sendResponse(res, 200, user);
        }
    });
}

module.exports.getList = function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            sendResponse(res, 400, err);
        } else if (!users) {
            sendResponse(res, 404, { message: 'Không tìm thấy người dùng nào' });
        } else {
            sendResponse(res, 200, users);
        }
    })
}