// import Sequelize
const {sequelize} = require('./../models');

// to generate uuid
const { v4: uuidv4 } = require('uuid')

// import model
const db = require('./../models/index');
const users = db.users;

// import hash
const {hashPassword, hashMatch} = require('./../lib/hash')
// import jwtoken
const {createToken} = require('../lib/jwtoken')

const transporter = require('./../helpers/transport');
const fs = require('fs').promises
const handlebars = require('handlebars');


module.exports = {
    loginsuperadmin: async(req, res) => {
        // rollback
        const t = await sequelize.transaction() 
        try {

            // step 1: ambil data dari req.body
            const { email, password} = req.body

            // step 2: validasi
            // if(!username.length || !email.length || !password.length || !phone_number.length )
            // return res.status(404).send({
            //     isError: true,
            //     message: 'Input is required',
            //     data: null
            // })
        
            // step 3: check ke database, username & email nya exist
            // let findEmail= await users.findOne({
            //     where: {
            //             email: email
            //     }
            // })
            // if(findEmail)
            //     return res.status(404).send({
            //         isError: true,
            //         message: 'email already exist',
            //         data: null
            //     })
            //     console.log(findEmail)

            // step 4: simpan data ke database 
            const resCreateUser = await db.admin.create({email, password: await hashPassword(password), role: 1}, {transaction: t})

            // step 5 : token            
            // let token = createToken({
            //     id: findEmail.dataValues.id,
            //     username: findEmail.dataValues.username,
            //     status: findEmail.dataValues.status,
            // });


            // step 6 : kirim response
            await t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Login Success', 
                data: resCreateUser
            })
        } catch (error) {
            await t.rollback()
            console.log(error)
  
            res.status(404).send({
                isError: true, 
                message: "Login Failed", 
                data: error
            })
        }
    },

    registerbranchadmin: async(req, res) => {
        try {
            let {email, password} = req.body;

            if(!email.length || !password.length)
                return res.status(404).send({
                    isError: true,
                    message: "Input must be filled",
                    data: null,
                })

            let findEmail = await db.admin.findOne({
                where: { 
                    email:email
                }
            });

            if(findEmail) 
                return res.status(404).send({
                isError: true, 
                message: 'Email already exist', 
                data: null
            });

            res.status(200).send({
                isError: false, 
                message: 'Register Success', 
                data: {token}
                });
        } catch (error) {
            res.status(404).send({
				isError: true,
				message: "Register Failed",
				data: error.message,
			});   
        }
    }
};


