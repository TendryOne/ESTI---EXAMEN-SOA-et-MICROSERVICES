const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
const Beneficiaire = require('../model/benefeciary.model');

const envPath = path.join(__dirname, '../.env');
env.config({ path: envPath });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connexion à la base de données réussie'))
    .catch(e => console.error('❌ Erreur de connexion à la base de données:', e));

const SeedBeneficiaires = async () => {
    try {
        const beneficiaires = [
            {
                numeroEmploye: 'EMP327024',
                nomBeneficiaire: 'Alice Smith'
            },
            {
                numeroEmploye: 'EMP763760',
                nomBeneficiaire: 'Bob Johnson'
            },
            {
                numeroEmploye: 'EMP614104',
                nomBeneficiaire: 'Charlie Brown'
            },
            {
                numeroEmploye: 'EMP211099',
                nomBeneficiaire: 'Diana Prince'
            },
            {
                numeroEmploye: 'EMP038623',
                nomBeneficiaire: 'Ethan Hunt'
            },
            {
                numeroEmploye: 'EMP748141',
                nomBeneficiaire: 'Fiona Gallagher'
            },
            {
                numeroEmploye: 'EMP408541',
                nomBeneficiaire: 'George Clooney'
            },
            {
                numeroEmploye: 'EMP200012',
                nomBeneficiaire: 'Hannah Montana'
            },
            {
                numeroEmploye: 'EMP037509',
                nomBeneficiaire: 'Ian Somerhalder'
            },
            {
                numeroEmploye: 'EMP789488',
                nomBeneficiaire: 'Jessica Jones'
            }
        ];

        // Insérer les bénéficiaires dans la base de données
        await Beneficiaire.insertMany(beneficiaires);
        console.log('✅ 10 bénéficiaires créés avec succès');

    } catch (error) {
        console.error('❌ Erreur lors de la création des bénéficiaires:', error);
    } finally {
        mongoose.disconnect();
    }
};

SeedBeneficiaires();