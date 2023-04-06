const nodemailer = require('nodemailer')
// belum jalan nich
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'fp04ucok@gmail.com',
        pass: 'kgdcpsezszplgtjy'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter