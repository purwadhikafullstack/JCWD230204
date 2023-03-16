const sequelize = require('./../models')
const db = require('../models/index')
const users = db.users
const Transaction = db.transactions
const TransactionDetail = db.transactions_detail
const TransactionLog = db.transactions_log
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
            //get token from headers
            const token = req.headers.token
            //decode token to obtain id user
            const decodedToken = jwt.decode(token, { complete: true })
            const id = decodedToken.payload.id

            //check user
            const findUser = await users.findOne({
                where: {id}
            })

            if(!findUser){
                res.status(400).send({
                    isError: true,
                    message: 'user not found',
                    data: null
                })
            }

            if(findUser.status === "unconfirmed"){
                res.status(400).send({
                    isError: true,
                    message: 'please confirm your email',
                    data: null
                })
            }

            //create transaction
            const transaction = await Transaction.create({
                date: new Date(),
                expiry_date: new Date(),
                // user_id: id,
                address: address,
                city: city,
                state: state,
                postal_code: zip,
                country: country,
                shipping: shipping,
                total: total,
                transaction_status_id: 1,
            }, { transaction: t })
            const cartItems = await cart.findAll({
                where: [
                    { user_id: id },
                    { cart_id: cartItem}
                ]
            })

            //create transaction detail
            const transactionDetails = cartItems.map((item) => {
                return {
                    transaction_id: transaction.id,
                    product_id: item.product_id,
                    qty: item.qty,
                    total_price: item.total_price,
                }
            })
            await TransactionDetail.bulkCreate(transactionDetails, { transaction: t })

            //create transaction log
            await TransactionLog.create({
                transaction_id: transaction.id,
                transaction_status_id: 1,
                date: new Date(),
            }, { transaction: t })

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