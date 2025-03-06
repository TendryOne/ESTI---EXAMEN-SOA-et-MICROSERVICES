const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    numeroEmploye: {
        type: String,
        required: true,
        unique: true
    },
    nomComplet: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    NAS: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
