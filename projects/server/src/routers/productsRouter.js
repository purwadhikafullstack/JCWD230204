const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

router.get('/get', productsController.getAllProducts);
router.get('/getDetail', productsController.getProductDetail);
router.get('/getCat', productsController.getCategory);
router.get('/getPromo', productsController.getPromo);
router.get('/getNewProduct', productsController.getNewProducts);
router.get('/getRecommended', productsController.getRecommendedProducts);
router.get('/add', productsController.addToCart);
router.get('/Cart', productsController.getCart);

module.exports = router;