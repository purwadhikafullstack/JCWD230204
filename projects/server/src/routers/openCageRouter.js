const express = require('express');
const router = express.Router();
const {openCageAPI} = require('./../controllers');

router.get('/search', openCageAPI.searchPlace)

module.exports = router;