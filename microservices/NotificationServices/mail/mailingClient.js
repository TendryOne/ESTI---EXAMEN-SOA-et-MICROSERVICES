const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

exports.EmailToClient = (data) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'testtendryone@gmail.com',
                pass: 'xmpvcuoxxgprxkvb',
            },
        });

        const mailOptions = {
            from: 'Entreprise <testtendryone@gmail.com>',
            to: 'tendryone@hotmail.com',
            subject: 'Conseiller RH',
            html: pug.renderFile(path.resolve(__dirname, '../views/mailClient.pug'), {
                data
            })
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
};
