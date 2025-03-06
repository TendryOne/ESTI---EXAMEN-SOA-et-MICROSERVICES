const { default: axios } = require('axios');
const User = require('../model/user.model');
const EMPLOYEE_SERVICE_URL = "http://localhost:3002"
const router = require('express').Router()

router.post('/employee', async (req, res) => {
    try {


        const body = req.body
        const response = await axios.get(`${EMPLOYEE_SERVICE_URL}/employee`, {
            params: {
                NAS: body.NAS,
                numeroEmploye: body.numeroEmploye
            }
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);

    }
})


module.exports = router