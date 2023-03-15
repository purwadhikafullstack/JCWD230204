const {sequelize} = require('./../models');


const db = require('./../models/index');
const products = db.products;
const category = db.category;
const products_detail = db.products_detail;
const products_image = db.products_image;
const discounts_categories = db.discount_category;
const transactions = db.transactions;
const transactions_details = db.transactions_details;
const cart = db.carts;

const {Op} = require('sequelize');

module.exports = {
    getAllProducts: async(req, res) => {
        const {sortBy, sortType, filter, search} = req.query
        const productsPerPage = parseInt(req.query.productsPerPage) || 10
        const currentPage = parseInt(req.query.currentPage) || 1
        console.log(sortBy, sortType, filter, search)
        let findProducts;
        
        try {
             findProducts = await products.findAll({
                include: [
                    {
                        model: products_detail,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: products_image,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: category,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ]
            })

            //template for filter by products name
            // Product.findAll({
            //     include: [{ model: Category }, { model: ProductDetail }],
            //     attributes: ['products_name', [Sequelize.col('ProductDetail.description'), 'description'], [Sequelize.col('ProductDetail.price'), 'price'], [Sequelize.col('Category.category'), 'category']],
            //     where: { products_name: { [Sequelize.Op.like]: '%sony%' } }
            //   });

            //template for filter by category name
            // Product.findAll({
            //     include: [{ model: Category }, { model: ProductDetail }],
            //     attributes: ['products_name', [Sequelize.col('ProductDetail.description'), 'description'], [Sequelize.col('ProductDetail.price'), 'price'], [Sequelize.col('Category.category'), 'category']],
            //     where: { '$Category.category$': { [Sequelize.Op.like]: '%acces%' } }
            //   });
              
            //filter products
            // filter by products name
            if(filter === 'productsName' ){
                findProducts = await products.findAll({
                    include: [{model: category, required: true}, {model:products_detail, required: true}, {model:products_image, required: true}],
                    attributes: ['id', 'products_name', [sequelize.col('products_details.description'), 'description'], [sequelize.col('products_details.price'), 'price'], [sequelize.col('category.category'), 'category'], [sequelize.col('products_images.url'), 'url']],
                    where: {products_name: {[Op.like]: `%${search}%`}}
                })
            } else if(filter === 'category'){
                findProducts = await products.findAll({
                    include: [{model: category, required: true}, {model:products_detail, required: true}, {model:products_image, required: true}],
                    attributes: ['id', 'products_name', [sequelize.col('products_details.description'), 'description'], [sequelize.col('products_details.price'), 'price'], [sequelize.col('category.category'), 'category'], [sequelize.col('products_images.url'), 'url']],
                    where: {'$category.category$': {[Op.like]: `%${search}%`}}
                })
            }

            //template for sort by name
            // Product.findAll({
            //     include: [{ model: ProductDetail }],
            //     attributes: ['products_name', [Sequelize.col('ProductDetail.description'), 'description'], [Sequelize.col('ProductDetail.price'), 'price']],
            //     order: [['products_name', 'ASC']]
            //   });

            //template for sort by price
            // Product.findAll({
            //     include: [{ model: ProductDetail }],
            //     attributes: ['products_name', [Sequelize.col('ProductDetail.description'), 'description'], [Sequelize.col('ProductDetail.price'), 'price']],
            //     order: [[Sequelize.col('ProductDetail.price'), 'ASC']]
            //   });
                            

            //sort products
            //sort by name asc
            if(sortBy === 'name' && sortType === 'asc'){
                findProducts = await products.findAll({
                    include: [{model: products_detail, required: true}, {model:products_image, required: true}],
                    attributes: ['id', 'products_name', [sequelize.col('products_details.description'), 'description'], [sequelize.col('products_details.price'), 'price'], [sequelize.col('products_images.url'), 'url']],
                    order: [['products_name', 'ASC']]
                  });
                  
            } else
            
            if(sortBy === 'name' && sortType === 'desc'){
                findProducts = await products.findAll({
                    include: [{model: products_detail, required: true}, {model:products_image, required: true}],
                    attributes: ['id', 'products_name', [sequelize.col('products_details.description'), 'description'], [sequelize.col('products_details.price'), 'price'], [sequelize.col('products_images.url'), 'url']],
                    order: [['products_name', 'DESC']]
                })
            } else
            //sort by price asc
            if(sortBy === 'price' && sortType === 'asc'){
                findProducts = await products.findAll({
                    include: [{model: products_detail, required: true}, {model:products_image, required: true}],
                    attributes: ['id', 'products_name', [sequelize.col('products_details.description'), 'description'], [sequelize.col('products_details.price'), 'price'], [sequelize.col('products_images.url'), 'url']],
                    order: [[sequelize.col('products_details.price'), 'ASC']]
                })
            } else
            //if sort by product price order descending then sort product by product price descending
            if(sortBy === 'price' && sortType === 'desc'){
                findProducts = await products.findAll({
                    include: [{model: products_detail, required: true}, {model:products_image, required: true}],
                    attributes: ['id', 'products_name', [sequelize.col('products_details.description'), 'description'], [sequelize.col('products_details.price'), 'price'], [sequelize.col('products_images.url'), 'url']],
                    order: [[sequelize.col('products_details.price'), 'DESC']]
                })
            }

            const findImg = await products_image.findAll({
                include: [{model: products}],
            })
            console.log(findProducts)


            res.status(200).send({
                isError: false,
                message: "get data sucess",
                data: findProducts
            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: "get data failed",
                data: error.message
            })
        }
    },

    getProductDetail: async(req, res) => {
        try{
            const {id} = req.query
            console.log(id)
            let findProductDetail = await products_detail.findAll({
                where: {products_id: id},
                include: {
                    model: products,
                    
                }
            })
            console.log(findProductDetail)
            res.status(200).send({
                isError: false,
                message: "get detail success",
                data: findProductDetail
            })

        } catch(error){
            res.status(404).send({
                isError: true,
                message: "get detail failed",
                data: error.message
            })
        }
        
    },

    getCategory: async(req, res) => {
        try {
            let findCategory = await category.findAll()
            console.log(findCategory)

            res.status(200).send({
                isError: false,
                message: "get data sucess",
                data: findCategory
            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: "get data failed",
                data: error.message
            })
        }
    },

    getPromo: async(req, res) => {
        try {
            let findPromo = await discounts_categories.findAll()
            console.log(findPromo)

            res.status(201).send({
                isError: false,
                message: "get data sucess",
                data: findPromo
            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: "get data failed",
                data: error.message
            })
        }
    },

    getNewProducts: async(req, res) => {
        try {
            //find new products by latest created_at
            let findNewProducts = await products.findAll({
                order: [
                    ['createdAt', 'DESC']
                ],
                limit: 4,
                include: [
                    {
                        model: products_detail,
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ]
            })
            console.log(findNewProducts)

            res.status(200).send({
                isError: false,
                message: "get data sucess",
                data: findNewProducts
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: "get data failed",
                data: error.message
            })
        }
    },

    getRecommendedProducts: async(req, res) => {
        try {
            //find recommended products by the most purchased items in transactions
            let findRecommendedProducts = await transactions.findAll({
                attributes: [
                    [Sequelize.literal('products.*'), 'product'],
                    [Sequelize.fn('COUNT', Sequelize.col('transactions.productId')), 'count']
                  ],
                  include: [
                    {
                      model: products,
                      attributes: []
                    }
                  ],
                  group: ['transactions.productId'],
                  order: [[sequelize.literal('count'), 'DESC']],
                  limit: 10
            })
            console.log(findRecommendedProducts)

            res.status(200).send({
                isError: false,
                message: "recommended products found",
                data: findRecommendedProducts
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: "get data failed",
                data: error.message
            })
        }
    },

    getCart: async(req, res) => {
        try {
            const findCart = await cart.findAll({
                attributes: ['id','qty'],
                include: [
                    {model: products,
                    attributes: ['products_name'],
                    include: [
                        {
                            model: products_detail,
                            attributes: ['price']
                        }
                    ]}
                ]
            })

            res.status(200).send({
                isError: false,
                message: "get data sucess",
                data: findCart
                
            })

        } catch (error) {
            res.status(400).send({
                isError: true,
                message: "get data failed",
                data: error.message
            })
        }
    },

    addToCart: async(req, res) => {
        const {product_id, quantity} = req.query
        // console.log(products_id, quantity)
        console.log('masukkk')
        try {

            const findProducts = await cart.findOne({
                where: {
                    product_id
                }
            })

            //validasi data cart
            if(!findProducts){
                await cart.create({product_id, qty: parseInt(quantity)})
            } else {
                await cart.update({qty: parseInt(findProducts.qty) + parseInt(quantity)}, {
                    where: {
                        product_id
                    }
                })
            }

            //response
            res.status(200).send({
                isError: false,
                message: "add to cart success",
                data: findProducts
            })

        } catch (error) {
            res.status(400).send({
                isError: true,
                message: "add to cart failed",
                data: error.message
            })
        }
    },

    removeFromCart: async(req, res) => {
        try {
            const {id} = req.query
            console.log(id)

            //validasi user
            // const findUser = await users.findOne({
            //     where: {
            //         id: user_id
            //     }
            // })

            // if(findUser.status === "unconfirmed"){
            //     res.status(400).send({
            //         isError: true,
            //         message: "user unconfirmed, please confirm your email first",
            //         data: null
            //     })
            // }

            //validasi product
            // const findProducts = await cart.findOne({
            //     where: {
            //         id: id
            //     }
            // })
            // console.log(findProducts)

            //validasi data cart
            await cart.destroy({
                where: {
                    id
                }
            })
            

            //response
            res.status(200).send({
                isError: false,
                message: "remove from cart success",
                data: null
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: "remove from cart failed",
                data: error.message
            })
        }
    },

    updateCart: async(req, res) => {
        const {id, option} = req.query
        console.log(id, option)
        try {
            const findItem = await cart.findOne({
                where: {
                    id
                }
            })
            console.log()

            if(option === "plus"){
                await cart.update({qty: findItem.qty + 1}, {
                    where: {
                        id
                    }
                })
            } else if(option === "min") {
                await cart.update({qty: findItem.qty - 1}, {
                    where: {
                        id
                    }
                })
            } 

            res.status(201).send({
                isError: false,
                message: "update cart success",
                data: null
            })

        } catch (error) {
            res.status(400).send({
                isError: true,
                message: "update cart failed",
                data: error.message
            })
        }
    }
}