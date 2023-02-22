const {sequelize} = require('./../models');

const db = require('./../models/index');
const products = db.products;
const category = db.category;
const products_detail = db.products_detail;
const products_image = db.products_image;

module.exports = {
    getAllProducts: async(req, res) => {
        try {
            let result = products.findAll()
            console.log(result)
            res.status(200).send({
                isError: false,
                message: "get data sucess",
                data: result
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: "get data failed",
                data: error.message
            })
        }
        

    },

    getCategory: async(req, res) => {
        try {
            let result = await category.findAll()
            console.log(result)
        } catch (error) {
            
        }
    }
}