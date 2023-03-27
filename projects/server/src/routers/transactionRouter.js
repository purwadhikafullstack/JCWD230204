const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const { tokenVerify } = require('../middleware/Token');

const upload = require('../middleware/upload');

router.get('/get', transactionController.getTransaction);
router.post('/order', tokenVerify, transactionController.addTransaction);
router.post('/uploadPayment/:transaction_id', tokenVerify, upload, transactionController.uploadPaymentProof);
router.patch('/cancel', tokenVerify, transactionController.cancelOrder);

module.exports = router;