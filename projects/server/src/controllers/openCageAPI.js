const axios = require('axios');
require('dotenv').config();

module.exports = {
    searchPlace: async(req, res) => {
        // const {q} = req.query
        
        try {
            const key = process.env.OPENCAGE_API_KEY
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${req.query.search}&key=${key}`)
            res.status(200).send({
                isError: false,
                message: 'search place success',
                data: response.data.results
            })
        } catch (error) {
            res.status(400).send({
                isError: true,
                message: 'search place failed',
                data: error.message
            })
        }
    }
}