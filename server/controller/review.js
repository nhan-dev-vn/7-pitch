let mongoose = require('mongoose');
let Pitch = mongoose.model('pitch');
let sendResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

function updateRating(reviews, cb) {
    let rating = 0;
    reviews.forEach(function(review) {
        rating += review.rating;
    });
    cb(parseInt(rating/reviews.length, 10));
}

module.exports.add = function(req, res) {
    Pitch.findById(req.params.pitchid, function(err, pitch) {
        if(err) {
            sendResponse(res, 404, { message: 'Not found pitch' });
        } else {
            pitch.reviews.push({
                username: req.body.username,
                rating: req.body.rating,
                reviewText: req.body.reviewText
            });
            pitch.save(function(err, pitch) {
                if(err) {
                    sendResponse(res, 400, err);
                } else {
                    updateRating(pitch.reviews, function(rating) {
                        pitch.rating = rating;
                        pitch.save(function(err, pitch) {
                            if(err) {
                                sendResponse(res, 400, err);
                            } else {
                                sendResponse(res, 200, pitch);
                            }
                        });
                    });
                }
            });
        }
    });
}
module.exports.update = function(req, res) {
    Pitch.findById(req.params.pitchid, function(err, pitch) {
        if(err) {
            sendResponse(res, 404, { message: 'Not found pitch' });
        } else {
            let review = pitch.reviews.id(req.params.reviewid);
            if(!review) {
                sendResponse(res, 404, { message: 'Not found review' });
            } else {
                review.username = req.body.username;
                review.rating = req.body.rating;
                review.reviewText = req.body.reviewText;
                pitch.save(function(err, pitch) {
                    if(err) {
                        sendResponse(res, 400, err);
                    } else {
                        updateRating(pitch.reviews, function(rating) {
                            pitch.rating = rating;
                            pitch.save(function(err, pitch) {
                                if(err) {
                                    sendResponse(res, 400, err);
                                } else {
                                    sendResponse(res, 200, pitch);
                                }
                            });
                        });
                    }
                });
            }
        }
    });
}
module.exports.delete = function(req, res) {
    Pitch.findById(req.params.pitchid, function(err, pitch) {
        if(err) {
            sendResponse(res, 404, { message: 'Not found pitch' });
        } else {
            let review = pitch.reviews.id(req.params.reviewid);
            if(!review) {
                sendResponse(res, 404, { message: 'Not found review' });
            } else {
                review.remove();
                pitch.save(function(err, pitch) {
                    if(err) {
                        sendResponse(res, 400, err);
                    } else {
                        updateRating(pitch.reviews, function(rating) {
                            pitch.rating = rating;
                            pitch.save(function(err, pitch) {
                                if(err) {
                                    sendResponse(res, 400, err);
                                } else {
                                    sendResponse(res, 200, pitch);
                                }
                            });
                        });
                    }
                });
            }
        }
    });
}