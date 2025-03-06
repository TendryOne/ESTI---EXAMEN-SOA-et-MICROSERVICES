const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    numeroEmploye: {
        type: String,
        required: true

    },
    nomBeneficiaire: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Beneficiary = mongoose.model('Beneficiary', UserSchema);

module.exports = Beneficiary;
