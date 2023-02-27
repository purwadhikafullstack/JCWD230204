const express = require('express');
const router = express.Router();
const {usersController} = require('./../controllers');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.patch('/update', usersController.updateProfile);

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.patch('/updateProfile/:id', usersController.updateProfile);
router.patch('/activation/:id', usersController.activation);
module.exports = router;