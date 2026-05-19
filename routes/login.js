var express = require('express');
var router = express.Router();
const { validationResult } = require('express-validator');

const AuthService = require('../services/authService');
const { loginValidation } = require('../public/javascripts/loginValidation');
const authService = new AuthService();

// Render login form
router.get('/', (req, res) => {
    res.render('login', { error: null, email: '', password: '' });
});

// Handle login form submission
router.post('/', loginValidation, (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        return res.render('login', {
            error: validationErrors.array()[0].msg,
            email: req.body.email,
            password: '',
        });
    }

    const { email, password } = req.body;
    const user = authService.findUser(email, password);
    if (!user) {
        return res.render('login', {
            error: 'Invalid email or password.',
            email,
            password: '',
        });
    }
    res.redirect('/login/success?email=' + encodeURIComponent(user.email));
});

// Logged in success page
router.get('/success', (req, res) => {
    const email = req.query.email;
    res.render('loginSuccess', { email: email });
});

// Logout
router.get('/logout', (req, res) => {
    res.redirect('/');
});

module.exports = router;
