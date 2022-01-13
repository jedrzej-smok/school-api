const { hash, compare, genSalt } = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const salt = await genSalt(10);
        return await hash(password, salt);
    } catch (error) {
        console.log(error);
    }
    return null;
};


const comparePassword = async (password, hash) => {
    try {
        // Compare password
        return await compare(password, hash);
    } catch (error) {
        console.log(error);
    }

    // Return false if error
    return false;
};

module.exports = {
    hashPassword,
    comparePassword
}