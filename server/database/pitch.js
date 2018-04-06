let mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    username: {type: String, required: true},
    rating: {type: Number, required: true, min: 0, max: 5},
    reviewText: {type: String, required: true},
    createdOn: {type: Date, default: Date.now}
});

let timeSchema = new mongoose.Schema({
    time: [String],
    money: Number
})

let rentSchema = new mongoose.Schema({
    username: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    numberPicth: Number,
    day: {type: Date, default: Date.now},
    time: [String],
    money: Number
});

let pitchSchema = new mongoose.Schema({
    name: {type: String, required: true},    
    address: String,
    rating: {type: Number, required: true, min: 0, max: 5},
    numberPitches: [Boolean],
    describe: String,
    coords: {type: [Number], index: '2dsphere'},
    imgPath: String,
    reviews: [reviewSchema],
    times: [timeSchema],
    rents: [rentSchema]
});

mongoose.model('pitch', pitchSchema);