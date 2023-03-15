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
    register: async(req, res) => {
        // rollback
        const t = await sequelize.transaction() 
        try {

            // step 1: ambil data dari req.body
            const {username, email, password, phone_number} = req.body

            // step 2: validasi
            if(!username || !email || !password || !phone_number )
            return res.status(404).send({
                isError: true,
                message: 'Input is required',
                data: error 
            })
        
            // step 3: check ke database, username & email nya exist
            let findEmail= await users.findOne({
                where: {
                        email
                }
            }, {transaction: t})
            if(findEmail)
                return res.status(404).send({
                    isError: true,
                    message: 'email already exist',
                    data: null
                })

            // step 4: simpan data ke database 
            const resCreateUser = await users.create({id: uuidv4(), username, email, password: await hashPassword(password), phone_number, status: 'unconfirmed'}, {transaction: t})


            // step 5 : kirim email
            const template = await fs.readFile('C:/Users/OWNER/Desktop/Final Project Gamepedia/JCWD230204/projects/server/src/template/confirmation.html', 'utf-8')
            const templateToCompile = await handlebars.compile(template)
            const newTemplate = templateToCompile({username:username, url: `http://localhost:3000/activation/${resCreateUser.id}`,})
                
            await transporter.sendMail({
                from: 'GAMEPEDIA',
                to: email,
                subject: 'Account Activation',
                html: newTemplate
            })

            // step 6 : kirim response
            await t.commit()
            res.status(201).send({
                isError: false, 
                message: 'Register Success', 
                data: null
            })
        } catch (error) {
            await t.rollback()
            console.log(error)
  
            res.status(404).send({
                isError: true, 
                message: "Register Failed", 
                data: error
            })
        }
    },

    activation: async(req, res) => {
        try {
            // Step-1 Ambil id dari req.params
            let {id} = req.body

            // Step-2 Update status Unconfirmed -> Confirmed
            await users.update(
                {status: 'Confirmed'},
                {
                    where: {
                        id:id
                    }
                }
            )

            // Step-3 Kirim response
            res.status(200).send({
                isError: false, 
                message: 'Account Verified!',
                data: null 
            })
            } catch (error) {
                console.log(error)
                res.status(404).send({
                    isError: true,
                    message: error.message,
                    data: error
                })
            }
         },


 
    login: async(req, res) => {
        try {
            let {email, password} = req.body;

            if(!email || !password)
                return res.status(404).send({
                    isError: true,
                    message: "Input must be filled",
                    data: null,
                })

            let findEmail = await users.findOne({
                where: { 
                    email
                }
            });

            if(!findEmail) 
                return res.status(404).send({
                isError: true, 
                message: 'Email Not Found', 
                data: null
            });

            let hashMatchResult = await hashMatch(
                password, findEmail.dataValues.password);
            
            if(hashMatchResult === false) 
                return res.status(404).send({
                isError: true, 
                message: 'Password is Not Valid', 
                data: null,
            })

            let token = createToken({
                id: findEmail.dataValues.id,
                username: findEmail.dataValues.username,
                status: findEmail.dataValues.status,
            });

            res.status(200).send({
                isError: false, 
                message: 'Login Success', 
                data: {token},
                    // tambahkan status user verified or not
                });
        } catch (error) {
            res.status(404).send({
				isError: true,
				message: "Login Failed",
				data: error.message,
			});   
        }
    },

    keepLogin: async (req, res) => {
        try {
            res.status(200).send({
                isError: false,
                message: "Token Valid",
                data: req.uid.name,
            });
        } catch (error) {
            res.status(500).send({
                isError: true,
                message: error.message,
                data: null,
            });
        }
    },

    forgotPassword: async (req, res) => {
        try {
            let { email } = req.body;

            if (!email)
                return res.status(404).send({
                    isError: true,
                    message: "Please Input Your Email",
                });

            let findEmail = await users.findOne({
                where: {
                    email: email,
                },
            });

            if (!findEmail)
                return res.status(404).send({
                    isError: true,
                    message: "Email Not Found",
                    data: null,
                });

            const username = findEmail.dataValues.username;

            const template = await fs.readFile(
                "./template/resetPassword.html",
                "utf-8"
            );
            const templateToCompile = await handlebars.compile(template);
            const newTemplate = templateToCompile({
                username, url: `http://localhost:3000/resetPassword/${findEmail.dataValues.id}`,
            });

            await transporter.sendMail({
                from: "Gamepedia",
                to: email,
                subject: "Reset Password",
                html: newTemplate,
            });

            res.status(200).send({
                isError: false,
                message: "Please Check Your Email",
                data: null,
            });
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null,
            });
        }
    },

    resetPassword: async (req, res) => {
        try {
            let { id, password, confirmPassword } = req.body;
            if (!password)
                return res.status(404).send({
                    isError: true,
                    message: "Please Input Your Password",
                    data: null,
                });

            if (password !== confirmPassword)
                return res.status(404).send({
                    isError: true,
                    message: "Password Not Match",
                    data: password,
                    confirmPassword,
                });

            await users.update(
                { password: await hashPassword(password) },
                {
                    where: {
                        id: id,
                    },
                }
            );

            res.status(201).send({
                isError: false,
                message: "Update Password Success",
                data: null,
            });
        } catch (error) {
            res.status(500).send({
                isError: true,
                message: error.message,
                data: null,
            });
        }
    },

    changePassword: async (req, res) => {
        try {
            let {password, newPassword, confirmPassword} = req.body;
            let {id} = req.uid;

            let findUser = await users.findOne({
                where: {
                    id
                }
            })

            if(!findUser){
                res.status(400).send({
                    isError: true,
                    message: "user not found",
                    data: null
                })
            }

            if (!password && !newPassword)
            return res.status(404).send({
                isError: true,
                message: "Please Input Your Password",
                data: null,
            });
            console.log(findUser.dataValues.password)
            let hashMatchResult = await hashMatch(password, findUser.dataValues.password);
            
            if(hashMatchResult === false) 
                return res.status(404).send({
                isError: true, 
                message: 'Password is Not Valid', 
                data: null,
                })

            if (newPassword !== confirmPassword)
            return res.status(404).send({
                isError: true,
                message: "Password Not Match",
                data: null
            });
            
            await users.update(
                { password: await hashPassword(newPassword) },
                {
                    where: {
                        id: id,
                    },
                }
            );

            res.status(201).send({
                isError: false,
                message: "Update Password Success",
                data: null,
            });

        } catch (error) {
            res.status(500).send({
                isError: true,
                message: error.message,
                data: null,
            });
        }
    },

    notFound: async(req, res) => {
        try {
            let {id} = req.body

            await users.update(
                {status: 'Confirmed'},
                {
                    where: {
                        id:id
                    }
                }
            )

            res.status(200).send({
                isError: false, 
                message: 'Account Verified!',
                data: null 
            })
            } catch (error) {
                console.log(error)
                res.status(404).send({
                    isError: true,
                    message: error.message,
                    data: error
                })
            }
         },


    updateProfile: async(req, res) => {
        try {
            const {name, gender, birthdate, email} = req.body;
            const {id} = req.params;
            console.log(name, gender, birthdate, id);

            console.log('masuk')
            let findUser = await db.profiles.findAll({
                where: {id: 1},
            })

            if (!findUser) {
                res.status(404).send({
                    isError: true,
                    message: "User not found",
                    data: null
                })
            }
            console.log(findUser)

            let updateUser = await db.profiles.update({
                name: name,
                gender: gender,
                birthdate: birthdate,
            }, {
                where: {id}
            })
            let updateEmail = await users.update({
                email: email
            }, {
                where: {id}
            })
            res.status(200).send({
                isError: false,
                message: "Update profile success",
                data: null
            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: "Update profile failed",
                data: error.message
            })
        }
    },

}
