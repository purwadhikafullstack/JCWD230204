const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { tokenVerify } = require('../middleware/Token');

router.get('/', transactionController.getTransaction);
router.post('/order', tokenVerify, transactionController.addTransaction);

module.exports = router;