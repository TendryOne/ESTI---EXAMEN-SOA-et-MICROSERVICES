const { EmailToAssurance } = require('../mail/mailingAssurance')
const { EmailToClient } = require('../mail/mailingClient')

const router = require('express').Router()

router.post('/mailToClient', async (req, res) => {
    try {
        const data = req.body
        const isOk = await EmailToClient(data)
        if (isOk) {
            res.sendStatus(200)
        } else {
            res.sendStatus(200)
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
})


router.post('/mailToAssurance', async (req, res) => {
    try {
        const data = req.body
        const isOk = await EmailToAssurance(data);
        if (isOk) {
            res.sendStatus(200)
        } else {
            res.sendStatus(200)
        }

    } catch (error) {
        console.log(error);
        res.sendStatus(500);

    }
})

router.get('/', (req, res) => {
    res.render('mailClient')
})

module.exports = router