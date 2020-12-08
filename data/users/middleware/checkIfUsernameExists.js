const Users = require('../userModel.js');
module.exports = async (req, res, next) => {
    try {
        const [user] = await Users.getUserByUsername(req.body.username);
        if (user) {
            req.usernameExists = true;
            req.user = user;
        }
        else {
            req.usernameExists = false;
        }
        next();
    }
    catch (error) {
        throw error;
    }
}