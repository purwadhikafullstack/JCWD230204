const {sequelize} = require('./../models');


const db = require('./../models/index');
const products = db.products;
const category = db.category;
const products_detail = db.products_detail;
const products_image = db.products_image;
const discounts_categories = db.discount_category;
const transactions = db.transactions;
const transactions_details = db.transactions_details;

const {Op} = require('sequelize');

module.exports = {
    getAllProducts: async(req, res) => {
        try {
            let findProducts = await products.findAll({
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
                    }
                ]
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

            // let findDetail = await products.findAll({
            //     where: {id},
            //     include:{
            //         model: products_detail,
            //         attributes: {
            //             include: ["products_id"]
            //         }
            //     }
            // })

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
                  order: [[Sequelize.literal('count'), 'DESC']],
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

    filterBy: async(req, res) => {
        try {
            //filter products by category and products name
            let {category, name} = req.body
            let findProducts = await products.findAll({
                where: {
                    [Op.and]: [
                        {category: {[Op.like]: `%${category}%`}},
                        {name: {[Op.like]: `%${name}%`}}
                    ]
                },
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

    sortBy: async(req,res) => {
        try {
            //sort by products name and price asc to desc
            let {name, price} = req.query
            let findProducts = await products.findAll({
                order: [
                    [name, 'ASC'],
                    [price, 'DESC']
                ],
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
                    }
                ]
            })

            console.log(findProducts)

            res.status(200).send({
                isError: false,
                message: "get data sucess",
                data: findProducts
            })
        } catch (error) {
            
        }
    }
}