const express = require('express');
const router = express.Router();
const { getProfilesList, createProfile } = require('../controllers/profileController');

router.get('/profileList', getProfilesList);
router.post('/createProfile', createProfile);


module.exports = router;