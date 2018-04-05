let router = require('express').Router();
let user = require('../controller/user');
let pitch = require('../controller/pitch');
let review = require('../controller/review');
let rent = require('../controller/rent');
let time = require('../controller/time');

/***** User *****/
//login
router.post('/login', user.login);
//register
router.post('/register', user.register);
//get list users
router.get('/user/list', user.getList);

/***** Pitch *****/
//add
router.post('/pitch', pitch.add);
//update
router.put('/pitch/:pitchid', pitch.update);
//get list pitches
router.get('/pitch/list', pitch.getList);
//get list pitches by distance
router.get('/pitch/listByDistance/:lng/:lat/:maxDistance', pitch.getListByDistance);
//get info a pitch
router.get('/pitch/:pitchid', pitch.getInfo);

/***** Rent *****/
//add
router.post('/pitch/:pitchid/rent', rent.add);
//update
router.put('/pitch/:pitchid/rent/:rentid', rent.update);
//delete
router.delete('/pitch/:pitchid/rent/:rentid', rent.delete);


/***** Review *****/
//add
router.post('/pitch/:pitchid/review', review.add);
//update
router.put('/pitch/:pitchid/review/:reviewid', review.update);
//delete
router.delete('/pitch/:pitchid/review/:reviewid', review.delete);

/***** Time *****/
//add
router.post('/pitch/:pitchid/time', time.add);
//update
router.put('/pitch/:pitchid/time/:timeid', time.update);
//delete
router.delete('/pitch/:pitchid/time/:timeid', time.delete);

module.exports = router;