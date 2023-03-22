const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { tokenVerify } = require('../middleware/Token');

router.get('/get', transactionController.getTransaction);
router.post('/order', tokenVerify, transactionController.addTransaction);
router.post('/uploadPayment', tokenVerify, transactionController.uploadPaymentProof);
router.patch('/cancel', tokenVerify, transactionController.cancelOrder);

module.exports = router;