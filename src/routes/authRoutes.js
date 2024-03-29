const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
require('../config/passport')

router.use(passport.initialize());
router.use(passport.session());
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/auth/google-success',
    failureRedirect: '/auth/google-failure'
}));
router.get('/google-success', authController.successGoogleLogin);
router.get('/google-failure', authController.failGoogleLogin);

module.exports = router;
