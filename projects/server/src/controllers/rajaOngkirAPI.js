const axios = require('axios');

module.exports = {
    getCity: async(req,res) => {
        try {
            const response = await axios.get('https://api.rajaongkir.com/starter/city', {
                headers: {
                    key: 'da3f816eed742bb1fe2f8f5c3d8ac512'
                }
            })

            res.status(200).send({
                isError: false,
                message: 'get city success',
                data: response.data.rajaongkir.results
            })
        } catch (error) {
            res.status(404).send({
                isError: true,
                message: 'get city failed',
                data: error.message
            })
        }
    },

    getState: async(req, res) => {
        try {
            const response = await axios.get('https://api.rajaongkir.com/starter/province', {
                headers: {
                    key: 'da3f816eed742bb1fe2f8f5c3d8ac512'
                }
            })

            res.status(200).send({
                isError: false,
                message: 'get state success',
                data: response.data.rajaongkir.results
            })

        } catch (error) {
            res.status(400).send({
                isError: true,
                message: 'get state failed',
                data: error.message
            })
        }
        
    },

    getOngkir: async(req,res) => {
        const {origin, destination, weight, courier} = req.body
        try {
            const response = await axios.post('https://api.rajaongkir.com/starter/cost',{
                origin, destination,weight,courier
            }, {
            headers: {
                    'key': 'da3f816eed742bb1fe2f8f5c3d8ac512'
                }
            }, )

            res.status(200).send({
                isError: false,
                message: 'get ongkir success',
                data: response.data.rajaongkir.results
            })

        } catch (error) {
            res.status(404).send({
                isError: true,
                message: 'get ongkir failed',
                data: error.message
            })
        }
        

    }
}