const {sequelize} = require('./../models');
const {Op} = require('sequelize');

const db = require('./../models/index');
const users = db.users;


module.exports = {
    register: async(req, res) => {
        

    },

    login: async(req, res) => {

    },

    updateProfile: async(req, res) => {
        try {
            const {name, gender, birthdate} = req.body;
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
    }
}