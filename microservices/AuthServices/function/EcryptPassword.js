const bcrypt = require('bcrypt')

exports.EncryptPassword = async (password) => {
    try {
        const salts = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salts);

    } catch (error) {
        console.log(error);

    }
}

exports.ComparePassword = async (passwordInDB, passwordWrittenByUser) => {
    try {
        return await bcrypt.compare(passwordWrittenByUser, passwordInDB);
    } catch (error) {
        console.log(error);

    }
}