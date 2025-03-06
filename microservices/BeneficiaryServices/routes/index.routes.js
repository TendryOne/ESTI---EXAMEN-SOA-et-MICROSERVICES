const Beneficiary = require('../model/benefeciary.model');

const router = require('express').Router()

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
        res.status(200).json(modif);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);

    }
})

router.post


module.exports = router