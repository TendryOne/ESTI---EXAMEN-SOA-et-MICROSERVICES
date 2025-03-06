const { default: axios } = require('axios');
const Beneficiary = require('../model/benefeciary.model');

const router = require('express').Router()
const NOTIFICATION_SERVICES_URL = "http://localhost:3004"

router.get('/beneficiary/:employeeId', async (req, res) => {
    try {
        const employeeId = req.params.employeeId

        const beneficiary = await Beneficiary.findOne({ numeroEmploye: employeeId });
        res.status(200).json(beneficiary);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);

    }
})


router.patch('/beneficiary', async (req, res) => {
    try {
        const body = req.body
        const modif = await Beneficiary.findOneAndUpdate({ numeroEmploye: body.numeroEmploye }, { nomBeneficiaire: body.nomBeneficiaire }, { new: true })

        await axios.post(`${NOTIFICATION_SERVICES_URL}/mailToClient`, modif);
        await axios.post(`${NOTIFICATION_SERVICES_URL}/mailToAssurance`, modif);

        res.status(200).json(modif);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);

    }
})

router.post


module.exports = router