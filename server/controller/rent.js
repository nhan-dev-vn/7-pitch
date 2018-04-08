let mongoose = require('mongoose');
let Pitch = mongoose.model('pitch');
let sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.add = function(req, res) {
    Pitch.findById(req.params.pitchid, function(err, pitch) {
        if(err) {
            sendResponse(res, 404, { message: 'Sân chưa được đăng ký' });
        } else {
            pitch.rents.push({
                username: req.body.username,
                phoneNumber: req.body.phoneNumber,
                time: req.body.time,
                money: req.body.money,
                day: req.body.day
            });
            pitch.save(function(err, pitch) {
                if(err) {
                    sendResponse(res, 400, err);
                } else {
                    sendResponse(res, 200, pitch);
                }
            });
        }
    });
}
module.exports.update = function(req, res) {
    Pitch.findById(req.params.pitchid, function(err, pitch) {
        if(err) {
            sendResponse(res, 404, { message: 'Sân chưa được đăng ký' });
        } else {
            let rent = pitch.rents.id(req.params.rentid);
            if(!rent) {
                sendResponse(res, 404, { message: 'Không tìm thấy thông tin' });
            } else {
                rent.username = req.body.username;
                rent.phoneNumber = req.body.phoneNumber;
                rent.time = req.body.time;
                rent.money = req.body.money;
                pitch.save(function(err, pitch) {
                    if(err) {
                        sendResponse(res, 400, err);
                    } else {
                        sendResponse(res, 200, pitch);
                    }
                });
            }
        }
    });
}
module.exports.delete = function(req, res) {
    Pitch.findById(req.params.pitchid, function(err, pitch) {
        if(err) {
            sendResponse(res, 404, { message: 'Sân chưa được đăng ký' });
        } else {
            let rent = pitch.rents.id(req.params.rentid);
            if(!rent) {
                sendResponse(res, 404, { message: 'Không tìm thấy thông tin' });
            } else {
                rent.remove();
                pitch.save(function(err, pitch) {
                    if(err) {
                        sendResponse(res, 400, err);
                    } else {
                        sendResponse(res, 200, pitch);
                    }
                });
            }
        }
    });
}
