const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const postDataMiddleware = require('../middlewares/postDataMiddleware');


// home page
router.get('/', dataController.getIndex);
//Pnr status
router.get('/pnr-status', dataController.getPnrStatus);
router.post('/pnr-status', postDataMiddleware.validatePnr, dataController.postPnrStatus);
// fare enquiry
router.get('/fare-enquiry', dataController.getFareEnquiry);
router.post('/fare-enquiry', postDataMiddleware.validateSeatFare, dataController.postFareEnquiry);
// live train status
router.get('/live-train-status', dataController.getLiveTrainStatus);
// router.post('/live-train-status', dataController.postLiveTrainStatus);
// Seat Availability
router.get('/seat-availability', dataController.getSeatAvailability);
router.post('/seat-availability', postDataMiddleware.validateSeatFare, dataController.postSeatAvailability);
// Train btn Stations
router.get('/train-between-stations', dataController.getTrainBetweenStations);
router.post('/train-between-stations', postDataMiddleware.validateTrainBS, dataController.postTrainBetweenStations);

//api route
router.get('/api/search', dataController.searchTrain);

module.exports = router;