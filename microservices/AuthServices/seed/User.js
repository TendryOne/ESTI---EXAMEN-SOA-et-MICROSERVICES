const mongoose = require('mongoose');
const env = require('dotenv');
const path = require('path');
const { faker } = require('@faker-js/faker');
const User = require('../model/user.model');

const envPath = path.join(__dirname, '../.env');
env.config({ path: envPath });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connexion à la base de données réussie'))
    .catch(e => console.error('❌ Erreur de connexion à la base de données:', e));

const SeedUsers = async () => {
    try {
        const users = [];

        for (let i = 0; i < 10; i++) {
            users.push({
                numeroEmploye: `EMP${faker.string.numeric(6)}`,
                nomComplet: faker.person.fullName(),
                adresse: faker.location.streetAddress({ useFullAddress: true }),
                NAS: faker.string.numeric(9)
            });
        }

        await User.insertMany(users);
        console.log('✅ 10 utilisateurs créés avec succès');

    } catch (error) {
        console.error('❌ Erreur lors de la création des utilisateurs:', error);
    } finally {
        mongoose.disconnect();
    }
};

SeedUsers();
