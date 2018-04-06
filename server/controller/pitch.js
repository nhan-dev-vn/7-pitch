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
            pitch.times.push({
                time: req.body.time1,
                money: req.body.money1
            },{
                time: req.body.time2,
                money: req.body.money2
            },{
                time: req.body.time3,
                money: req.body.money3
            });
            pitch.save(function(err, pitch) {
                if(err) {
                    sendResponse(res, 400, err);
                } else {
                    sendResponse(res, 200, {
                        message: "Created"
                    });
                }
            });
        }
    });
}
module.exports.update = function (req, res) {
    let numberPitches = [];
    for(let i = 1; i<= req.body.numberPitches; i++) {
        numberPitches.push(false);
    };
    Pitch.update({ _id: req.params.pitchid }, {
        $set: {
            name: req.body.name,
            address: req.body.address,
            rating: req.body.rating,
            numberPitches: numberPitches,
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
var _formatDistance = function(distance){
    var numDistance, unit;
    if(distance==0)
        return 'in here';
    if(distance>1000){
        numDistance = parseFloat(distance/1000).toFixed(1);
        unit = 'km';
    }else{
        numDistance = parseInt(distance, 10);
        unit = 'm';
    }
    return numDistance + unit;
};
module.exports.getListByDistance = function (req, res) {
    let lng = parseFloat(req.params.lng),
        lat = parseFloat(req.params.lat);
    var maxDistance = parseFloat(req.params.maxDistance);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    var geoOptions = {
        spherical: true,
        maxDistance: maxDistance*1000000000,  
        num: 10
    };
    if ((!lng && lng!==0)||( !lat && lat!==0)){
        sendResponse(res, 404, {
            "message": "lng and lat query parameters are required"
        });
        return;
    }
    Pitch.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [ lng , lat ] },
                distanceField: "distance",
                maxDistance: maxDistance * 1000,
                spherical: true
             }
        }
    ]).then(function(results, err, next) {
        var pitches = [];
        if (err){
            sendResponse(res, 404, err);
        }else{
            results.forEach(function(doc, i){   
                pitches.push({
                    distance: _formatDistance(parseFloat(doc.distance)),
                    name: doc.name,
                    address: doc.address,
                    rating: doc.rating,
                    times: doc.times,
                    imgPath: doc.imgPath,
                    _id: doc._id,
                });
                if(i==results.length-1)
                    sendResponse(res, 200, pitches);
            });
        }        
    });
}