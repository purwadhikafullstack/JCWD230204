const express = require('express');
const router = express.Router();
const {adminController} = require('./../controllers');

router.post('/login',adminController.loginsuperadmin)
router.post('/register',adminController.registerbranchadmin)
router.get('/getTransactions', adminController.getTransactionUser)
router.post('/updateStatus/:id', adminController.updateTransactionStatus)
router.get('/getProducts', adminController.getAllProducts)
router.get('/getBranchProducts', adminController.getBranchProducts)
router.post('/createProduct',adminController.createProduct)
router.post('/updateProduct',adminController.updateProduct)
router.post('/deleteProduct',adminController.deleteProduct)
router.get('/getStockHistory',adminController.getStockHistory)

module.exports = router;