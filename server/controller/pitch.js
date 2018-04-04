let mongoose = require('mongoose');
let Pitch = mongoose.model('pitch');
let sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.add = function (req, res) {
    let numberPitches = [];
    for(let i = 1; i<= req.body.numberPitches; i++) {
        numberPitches.push(false);
    };
    Pitch.create({
        name: req.body.name,
        address: req.body.address,
        rating: req.body.rating,
        numberPitches: numberPitches,
        describe: req.body.describe,
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }, function (err, pitch) {
        if (err) {
            sendResponse(res, 400, err);
        } else {
            sendResponse(res, 200, {
                message: "Created"
            });
        }
    });
}
module.exports.update = function (req, res) {
    Pitch.update({ _id: req.params.pitchid }, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            rating: req.body.rating,
            describe: req.body.describe,
            coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        }
    }, function (err, pitch) {
        if (err) {
            sendResponse(res, 400, err);
        } else {
            sendResponse(res, 200, {
                message: "Updated"
            });
        }
    });
}
module.exports.getInfo = function (req, res) {
    Pitch.findById(req.params.pitchid, function(err, pitch) {
        if (err) {
            sendResponse(res, 400, err);
        } else if(!pitch){
            sendResponse(res, 404, { message: 'Not found pitch' });
        } else {
            sendResponse(res, 200, pitch);
        }
    });
}
module.exports.getList = function (req, res) {
    Pitch.find({}, function(err, pitches) {
        if (err) {
            sendResponse(res, 400, err);
        } else if (!pitches) {
            sendResponse(res, 404, { message: 'Not have any pitch' });
        } else {
            sendResponse(res, 200, pitches);
        }
    });
}
module.exports.getListByDistance = function (req, res) {

}