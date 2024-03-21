const express = require('express');
const router = express.Router();
const {getLocations, getLocation, createLocation, updateLocation, deleteLocation} = require('../controllers/locationController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);

router.get('/all', getLocations);
router.get('/', getLocation);
router.post('/', createLocation);
router.put('/', updateLocation);
router.delete('/', deleteLocation);

module.exports = router;
