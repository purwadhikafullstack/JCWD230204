const {multerUpload} = require('../lib/multer')


const uploadPaymentImage = (req,res,next) => {
    const multerResult = multerUpload.fields([{name: 'images'}])
    multerResult(req,res, function(err){
        try {
            if(err) throw err
            req.files.images.forEach((value) => {
                if(value.size > 100000000000) throw {message: 'file size is too large' }
            })
            next()
        } catch (error) {
            return res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    })
}

module.exports = uploadPaymentImage