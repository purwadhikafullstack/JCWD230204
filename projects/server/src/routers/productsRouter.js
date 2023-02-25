const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

router.get('/get', productsController.getAllProducts);
router.get('/getCat', productsController.getCategory);
router.get('/getPromo', productsController.getPromo);
router.get('/getNewProduct', productsController.getNewProducts);
router.get('/getRecommended', productsController.getRecommendedProducts);

module.exports = router;