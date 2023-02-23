const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

router.get('/get', productsController.getAllProducts);
router.get('/getCat', productsController.getCategory);

module.exports = router;