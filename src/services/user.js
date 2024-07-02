const User = require("../models/user");



exports.getUserByEmail = async email => {
    try {

        const user = await User.findOne({
            where: {
              email: email
            }
        });

        return user;

    } catch (error) {
        console.log(error.stack)
    }
}


exports.getUserById = async id => {
    try {

        const user = await User.findByPk(id);

        return user;

    } catch (error) {
        console.log(error.stack)
    }
}


exports.createUser = async userData => {
    try {

        const user = await User.create(userData);

        return user;

    } catch (error) {
        console.log(error.stack)
    }
}