const router = require('express').Router();
const Users = require('./userModel.js');
const bcrypt = require('bcryptjs');
const checkIfUsernameExists = require('../users/middleware/checkIfUsernameExists.js');

router.get('/', async (req, res) => {
    try {
        const users = await Users.getUsers();
        res.status(200).json({ users })
    }
    catch (error) {
        res.status(500).json({ message: "unable to retrieve users" })
    }
});

router.post('/', checkIfUsernameExists, require('../users/middleware/validateNewUserInput.js'), async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hash = bcrypt.hashSync(password);
        const newUserId = await Users.createUser({ username, email, hash })
        res.status(201).json({ message: `new user created! username: ${username}, email: ${email}`, newUserId })
    }
    catch (error) {
        res.status(500).json({message: "unknown error creating user"})
    }
});

router.delete('/', checkIfUsernameExists, async (req, res) => {
    try {
        if (req.usernameExists) {
            if (bcrypt.compareSync(req.body.password, req.user.hash)) {
                const qtyDeleted = await Users.deleteUser(req.body.username);
                res.status(200).json({ message: `successfully deleted username: ${req.body.username}`, qtyDeleted })
            }
            else {
                res.status(401).json({message: "incorrect password provided, you are not authorized to delete that user"})
            }
        }
        else {
            res.status(400).json({message: `username (${req.body.username}) not found, unable to delete`})
        }
    }
    catch (error) {
        res.status(500).json({message: "unable to delete the user"})
    }
})

module.exports = router;