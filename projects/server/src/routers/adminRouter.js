const express = require('express');
const router = express.Router();
const {adminController} = require('./../controllers');

router.post('/admin/login',adminController.loginsuperadmin)
router.post('/admin/register',adminController.registerbranchadmin)

module.exports = router;