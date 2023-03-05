const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers');

router.get('/get', productsController.getAllProducts);
router.get('/getDetail', productsController.getProductDetail);
router.get('/getCat', productsController.getCategory);
router.get('/getPromo', productsController.getPromo);
router.get('/getNewProduct', productsController.getNewProducts);
router.get('/getRecommended', productsController.getRecommendedProducts);
router.get('/filterBy', productsController.filterBy);
router.get('/sortBy', productsController.sortBy);

module.exports = router;