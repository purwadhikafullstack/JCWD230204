const sequelize = require('./../models')
const db = require('../models/index')
const Transaction = db.transactions
const TransactionDetail = db.transactions_detail
const cart = db.carts

module.exports = {

    getTransaction: async (req, res) => {
        try {
            const transaction = await Transaction.findAll()

            res.status(200).send({
                isError: false,
                message: 'get transaction sucess',
                data: transaction
            })
        } catch (error) {
            res.status(500).send({
                isError: true,
                message: 'get transaction failed',
                data: error.message
            })
        }
    },

    addTransaction: async (req, res) => {
        const { cartItem, address, city, state, zip, country, shipping, total } = req.body
        const t = sequelize.transaction()

        try {
            const transaction = await Transaction.create({
                date: new Date(),
                expiry_date: new Date(),
                transaction_status_id: 1,
            }, { transaction: t })
            const cartItems = await cart.findAll({
                where: [
                    { user_id: userId },
                    { cart_id: id}
                ]
            })
            const transactionDetails = cartItems.map((item) => {
                return {
                    transaction_id: transaction.id,
                    product_id: item.product_id,
                    qty: item.qty,
                    total_price: item.total_price,
                }
            })
            const placeOrder = await TransactionDetail.bulkCreate(transactionDetails, { transaction: t })

            await cart.destroy({where: {id: cartItem}}, {transaction: t})

            await t.commit()
            res.status(200).send({
                isError: false,
                message: 'place order success',
                data: null,
            })

        } catch(error){
            await t.rollback()
            res.status(400).send({
                isError: true,
                message: 'add transaction failed',
                data: error.message
            })
        }
    },
}