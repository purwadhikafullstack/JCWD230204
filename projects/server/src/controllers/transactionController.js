const {sequelize} = require('./../models')
const db = require('../models/index')
const users = db.users
const products = db.products
const products_detail = db.products_detail
const Transaction = db.transactions
const TransactionDetail = db.transactions_detail
const TransactionLog = db.transactions_log
const TransactionStatus = db.transactions_status
const cart = db.carts

const jwt = require('jsonwebtoken')

module.exports = {

    getTransaction: async (req, res) => {
        try {
            const token = req.headers.token
            const decodedToken = jwt.decode(token, { complete: true })
            const id = decodedToken.payload.id

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

            const transaction = await Transaction.findAll({
                include: [{model: TransactionDetail, attributes: {exclude: ['createdAt', 'updatedAt']}}, {model: TransactionStatus, attributes: {exclude: ['createdAt', 'updatedAt']}}],
                exclude: ['createdAt', 'updatedAt'],
                where: {user_id: id},
            })

            if(!transaction){
                res.status(400).send({
                    isError: true,
                    message: 'transaction not found',
                    data: null
                })
            }

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
        const { address, city, state, zip, country, shipping, total } = req.body
        const t = await sequelize.transaction()

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

            //set expired time
            const interval = 6300000 // 1.75 hours
            const currentTime = new Date()
            const expiredTime = new Date(currentTime.getTime() + interval);

            //create transaction
            const transaction = await Transaction.create({
                date: new Date(),
                expiry_date: expiredTime,
                user_id: id,
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
                where: { user_id: id },
                attributes: ['id', 'qty', 'user_id'],
                include: [
                  {
                    model: products,
                    attributes: ['products_name'],
                    include: [
                        {
                            model: products_detail,
                            attributes: ['price']
                          }
                    ]
                    
                  },
                  
                ]
              });
            console.log(cartItems[0].dataValues.qty, cartItems[0].dataValues.product.dataValues.products_name, cartItems[0].dataValues.product.dataValues.products_details[0].price)

            // const totalPrice = cartItems.reduce((acc, item) => {
            //     return acc + item.dataValues.qty * item.dataValues.product[0].products_detail.price
            // }, 0)

            //create transaction detail
            const transactionDetails = cartItems.map((item) => {
                return {
                    transaction_id: transaction.id,
                    product_name: item.dataValues.product.dataValues.products_name,
                    qty: item.dataValues.qty,
                    price: item.dataValues.product.dataValues.products_details[0].price,
                }
            })
            await TransactionDetail.bulkCreate(transactionDetails, { transaction: t })

            //create transaction log
            await TransactionLog.create({
                transaction_id: transaction.id,
                transaction_status_id: 1,
                date: new Date(),
            }, { transaction: t })

            //delete cart
            await cart.destroy({where: {user_id: id}}, {transaction: t})

            await t.commit()
            res.status(200).send({
                isError: false,
                message: 'place order success',
                data: cartItems,
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

    uploadPaymentProof: async(req, res) => {
        const t = await sequelize.transaction()
        try{
            const token = req.headers.token
            console.log(token)
            const decodedToken = jwt.decode(token, { complete: true })
            const id = decodedToken.payload.id

            const { transaction_id } = req.params

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

            const findTransaction = await Transaction.findOne({
                where: [{user_id: id}, {id: transaction_id}]
            })

            if(!findTransaction){
                res.status(400).send({
                    isError: true,
                    message: 'transaction not found',
                    data: null
                })
            }
            console.log(req.files)
            if(!req.files){
                res.status(400).send({
                    isError: true,
                    message: 'please upload your payment proof',
                    data: null
                })
            }

            // Your payment proof file path can be stored in a variable like this:
            let paymentProofFilePath = req.files.images[0].path;
            console.log(req.files.images[0].path)

            let updatePaymentProof = await Transaction.update(
                { payment_proof: paymentProofFilePath, transaction_status_id: 2 },
                {where: [{user_id: id}, {id: transaction_id}]},
                {transaction: t}
            )

            await TransactionLog.update({
                transaction_status_id: 2,
            }, {where: [{transaction_id}]},
            {transaction: t})

            await t.commit();
            res.status(200).send({
                isError: false,
                message: 'upload payment proof success',
                data: null
            })

        } catch(error){
            await t.rollback();
            res.status(400).send({
                isError: true,
                message: 'upload payment proof failed',
                data: error.message
            })
        }
    },

    cancelOrder: async(req, res) => {
        try {
            const token = req.headers.token
            const decodedToken = jwt.decode(token, { complete: true })
            const id = decodedToken.payload.id

            const {transaction_id} = req.params.id

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

            const findTransaction = await Transaction.findOne({
                where: {user_id: id}
            })

            if(!findTransaction){
                res.status(400).send({
                    isError: true,
                    message: 'transaction not found',
                    data: null
                })
            }

            Transaction.update({
                transaction_status_id: 6
            }, {
                where: {user_id: id}
            })

            TransactionLog.update({
                transaction_status_id: 6
            }, {
                where: {transaction_id: findTransaction.id}
            })

            res.status(200).send({
                isError: false,
                message: 'cancel order success',
                data: findTransaction
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: 'cancel order failed',
                data: error.message
            })
        }
    },

    confirmOrder: async(req, res) => {
        const token = req.params.token
        const tokenDecode = jwt.decode(token, { complete: true })
        const id = tokenDecode.payload.id
        const {action} = req.body;

        try {
            const findUser = await users.findOne({ where: {id}})
            if(!findUser){
                res.status(400).send({
                    isError: true,
                    message: 'user not found',
                    data: null
                })
            }

            const findTransaction = await Transaction.findAll({
                where: {
                    user_id: id
                }
            })

            if(!findTransaction){
                res.status(400).send({
                    isError: true,
                    message: 'transaction not found',
                    data: null
                })
            }

            const findTransactionLog = await TransactionLog.findAll({
                where: {transaction_id: findTransaction.id}
            })

            if(!findTransactionLog){
                res.status(400).send({
                    isError: true,
                    message: 'transaction log not found',
                    data: null
                })
            }

            Transaction.update({
                transaction_status_id: 5
            })

            TransactionLog.update({
                transaction_status_id: 5
            })

            res.status(200).send({
                isError: false,
                message: 'confirm order success',
                data: null
            })
        } catch (error) {
            
        }
    }
}