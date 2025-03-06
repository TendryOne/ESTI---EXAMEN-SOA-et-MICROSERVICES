const { default: axios } = require('axios');
const User = require('../model/user.model');
const BENEFICIARY_SERVICES_URL = 'http://localhost:3003';
const router = require('express').Router()

router.get('/employee', async (req, res) => {
    try {
        const query = req.query

        const user = await User.findOne({ NAS: query.NAS, numeroEmploye: query.numeroEmploye });
        const beneficiary = await axios.get(`${BENEFICIARY_SERVICES_URL}/beneficiary/${query.numeroEmploye}`);
        res.status(200).json({ user, beneficiary: beneficiary.data });
    } catch (error) {
        console.log(error);

        res.sendStatus(500);

    }
})


module.exports = router