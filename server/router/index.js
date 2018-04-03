let router = require('express').Router();
let auth = require('../controller/authentication');
let pitch = require('../controller/pitch');
let review = require('../controller/review');
let rent = require('../controller/rent');

/***** Authentication *****/
//login
router.post('/login', auth.login);
//register
router.post('/register', auth.register);

/***** Pitch *****/
//add
router.post('/pitch', pitch.add);
//update
router.put('/pitch/:pitchid', pitch.update);
//get info a pitch
router.get('/pitch/:pitchid', pitch.getInfo);
//get list pithes
router.get('/pitch/list', pitch.getList);

/***** Rent *****/
//add
router.post('/pitch/:pitchid/rent', rent.add);
//update
router.put('/pitch/:pitchid/rent/:rentid', rent.update);
//get info a rent
router.get('/pitch/:pitchid/rent/:rentid', rent.getInfo);
//get list rents
router.get('/pitch/:pitchid/rent/list', rent.getList);

/***** Review *****/
//add
router.post('/pitch/:pitchid/review', review.add);
//update
router.put('/pitch/:pitchid/review/:reviewid', review.update);
//get info a review
router.get('/pitch/:pitchid/review/:reviewid', review.getInfo);
//get list reviews
router.get('/pitch/:pitchid/review/list', review.getList);


module.exports = router;