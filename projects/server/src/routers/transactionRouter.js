const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

router.get('/', transactionController.getTransaction);
router.post('/order', transactionController.addTransaction);

module.exports = router;