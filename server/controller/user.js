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
            sendResponse(res, 400, {message: "Username existed"});
        } else {
            sendResponse(res, 200, {
                message: "Created"
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
            sendResponse(res, 404, { message: 'Not found' });
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
            sendResponse(res, 404, { message: 'Not have any user' });
        } else {
            sendResponse(res, 200, users);
        }
    })
}