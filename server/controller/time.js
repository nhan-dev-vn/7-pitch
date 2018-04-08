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
            pitch.times.push({
                time: req.body.time,
                money: req.body.money
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
            let time = pitch.times.id(req.params.timeid);
            if(!time) {
                sendResponse(res, 404, { message: 'Chưa có khung giờ này' });
            } else {
                time.time = req.body.time;
                time.money = req.body.money;
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
            let time = pitch.times.id(req.params.timeid);
            if(!time) {
                sendResponse(res, 404, { message: 'Chưa có khung giờ này' });
            } else {
                time.remove();
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
