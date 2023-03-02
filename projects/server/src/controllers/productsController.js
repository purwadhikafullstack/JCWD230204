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
        const {sort, sortType, filter} = req.query
        const productsPerPage = parseInt(req.query.productsPerPage) || 10
        const currentPage = parseInt(req.query.currentPage) || 1
        console.log(sort, sortType, filter)
        
        try {
             const findProducts = await products.findAll({
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

            //if sort by product name order ascending then sort product by product name ascending
            if(sort === 'name' && sortType === 'asc'){
                findProducts = await products.findAll({
                    attributes: ['products_name',],
                    order: ['products_name', 'ASC'],
                    include: {
                        model: 'products_details',
                        attributes: ['price']
                    }
                })
            } else
            //if sort by product name order descending then sort product by product name descending
            if(sort === 'name' && sortType === 'desc'){
                findProducts = await products.findAll({
                    attributes: ['products_name',],
                    order: ['products_name', 'DESC'],
                    include: {
                        model: 'products_details',
                        attributes: ['price']
                    }
                })
            } else
            //if sort by product price order ascending then sort product by product price ascending
            if(sort === 'price' && sortType === 'asc'){
                findProducts = await products.findAll({
                    include: {
                        model: 'products_details',
                        attrubutes: ['price'],
                        order: ['price', 'ASC']
                    },
                    attributes: ['products_name']
                })
            } else
            //if sort by product price order descending then sort product by product price descending
            if(sort === 'price' && sortType === 'DESC'){
                findProducts = await products.findAll({
                    include: {
                        model: 'products_details',
                        attrubutes: ['price'],
                        order: ['price', 'DESC']
                    },
                    attributes: ['products_name']
                })
            } else

            //if filter by category then filter product by category
            if(filter === 'productsName' ){
                findProducts = await products.findAll({
                    where: {
                        products_name: {
                            [Op.like]: `%${req.query.products_name}%`
                        }
                    }
                })
            } else

            //if filter by price then filter product by price
            if(filter === 'category'){
                findProducts = await products.findAll({
                    attributes: ["products_name"],
                    include: [{
                            model: category,
                            attributes: ['category'],
                            where: {
                                category: {
                                    [Op.like]: `%${req.query.category}%`
                                }
                            }
                        }
                    ]
                })
            }

            // const indexOfLastItem = page * itemsPerPage;
            // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            // const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)
            // const totalPage = Math.ceil(products.length / itemsPerPage)
            // const paginate = (pageNumber) => setPage(pageNumber)

            // console.log(findProducts)

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
            const {category, name, order} = req.query
            const filter = {}
            if(category){
                filter.category = category;
            }
            if(name){
                filter.name = {[Op.like]: `%${name}%`}
            }

            const options = {}

            if(order === 'asc'){
                options.order = [['name', 'ASC']]
            } else if(order === 'desc'){
                options.order = [['name', 'DESC']]
            }

            const findProducts = await products.findAll({
                where: filter,
                ...options,
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