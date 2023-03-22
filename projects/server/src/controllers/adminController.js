const {sequelize} = require('./../models')
const db = require('./../models/index')
const jwtoken = require('jsonwebtoken')

module.exports = {
    loginAdmin: async(req, res) => {
        try {
            let { email, password } = req.body;


            // let decodedToken = jwtoken.decode(token,{complete:true});
            // let id = decodedToken.payload.id
            if (!email.length || !password.length){
               res.status(404).send({
                isError: true,
                message:"data not found",
                data:null,
               })
            }

            console.log(email,password)

            let admin = await db.admin.findOne(
                {
                    where: {email},
                },
            )

            if (!admin){
                res.status(404).send({
                    isError: true,
                    message:"admin not found",
                    data:null,
                })
            }

            if (password !== admin.password){
                res.status(404).send({
                    isError: true,
                    message:"password didnt match",
                    data:null,
                })
            }

            let role = admin.role;
            console.log(role);

            const token = createToken({
                id: admin.id,
                username: admin.username,
                status: admin.status
            });

    
            res.status(201).send({
                isError: false,
                message: "login success",
                data: token,
            });
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: error.message,
                data: null,
            });
        }
    },   
};


