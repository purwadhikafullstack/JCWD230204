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
const { request } = require('express')

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
        const { cartItem, address, city, state, zip, country, shipping, total } = req.body
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
                total: totalPrice,
                transaction_status_id: 1,
            }, { transaction: t })
            const cartItems = await cart.findAll({
                where: { user_id: id },
                attributes: ['id', 'qty', 'user_id'],
                include: [
                  {
                    model: products,
                    attributes: ['products_name'],
                    
                  },
                  {
                    model: products_detail,
                    attributes: ['price']
                  }
                ]
              });
            console.log(cartItems)

            const totalPrice = cartItems.reduce((acc, item) => {
                return acc + item.dataValues.qty * item.dataValues.product[0].products_detail.price
            }, 0)

            //create transaction detail
            const transactionDetails = cartItems.map((item) => {
                return {
                    transaction_id: transaction.id,
                    product_name: item.dataValues.product[0].product_name,
                    qty: item.dataValues.qty,
                    price: item.product[0].products_detail.price,
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

    uploadPaymentProof: async(req, res) => {
        const t = await sequelize.transaction()
        try{
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

            if(!req.file){
                res.status(400).send({
                    isError: true,
                    message: 'please upload your payment proof',
                    data: null
                })
            }

            // Your payment proof file path can be stored in a variable like this:
            let paymentProofFilePath = req.file.path;

            let updatePaymentProof = await Transaction.update(
                { payment_proof: paymentProofFilePath },
                {where: {user_id: id}},
                {transaction: t}
            )

            await t.commit();
            res.status(200).send({
                isError: false,
                message: 'upload payment proof success',
                data: null
            })

        } catch(error){

        }
    },

    cancelOrder: async(req, res) => {
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
}