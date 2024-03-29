const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const User = require('../models/User');

exports.register = async function (req, res) {
    const userData = req.body;
    console.log(userData);
    const newUser = new User(userData);
    newUser.password = bcrypt.hashSync(userData.password, 8);
    try {
        await newUser.save();
        res.status(201).send({ message: 'User registered successfully.' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.successGoogleLogin = async function (req, res) {
    if (!req.user)
        res.redirect('/auth/google-failure');
    res.status(200).send({ message: `Welcome ${JSON.stringify(req.user.displayName)}` });
}

exports.failGoogleLogin = (req, res) => {
    res.status(500).send("Error");
}

exports.login = async function (req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(404).send({ error: 'User not found' });
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send({ error: 'Unauthorized' });
        const token = jwt.sign({ id: user._id, role: user.isAdminRole }, config.secret, {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
