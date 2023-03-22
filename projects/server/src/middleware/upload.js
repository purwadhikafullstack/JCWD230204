const {multerUpload} = require('./../lib/multer')
const deleteFile = require('./../helpers/deleteFile')

const uploadProfilePicture = async(req,res,next) => {
    const multerResult = multerUpload.fields([{name: 'profilePict', maxCount: 1}])
    multerResult(req,res, function(err){
        try {
            
            if(err) throw err
            req.files.images.forEach((value) => {
                if(value.size > 100000) throw {message: `file ${value.originalname} is too large`, fileToDelete: req.files} //filetodelete: req.files
            })
            console.log('nexxt')
            next()
        } catch (error) {
            if(error.fileToDelete) //deleteFile(error.fileToDelete)
            return res.status(400).send({
                isError: true,
                message: error.message,
                data: null
            })
        }
    })
}