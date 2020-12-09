const Users = require("../../users/userModel.js")
module.exports = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username) {
            res.status(400).json({ message: "please provide a username" })
        }
        else if (username.length < 3) {
            res.status(400).json({ message: "that username is too short" })
        }
        else {
            if (!password) {
                res.status(400).json({ message: "please provide a password" })
            }
            else if (password.length < 5) {
                res.status(400).json({ message: "your password is too short" })
            }
            else { 
                if (!email) {
                    res.status(400).json({ message: "please provide an email address" })
                }
                else {
                    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!emailRegex.test(email)) {
                        console.log(email);
                        res.status(400).json({ message: "please provide a valid email address" })
                    }
                    else {
                        if (req.usernameExists) {
                            res.status(400).json({ message: "that username already exists" })
                        }
                        else {
                            next();
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({message: "error validating new user input"});
    }
}