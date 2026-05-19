var express = require('express');
var router = express.Router();

const AuthService = require('../services/authService');
const authService = new AuthService();

router.get('/', (req, res) => {
    res.render('register', { error: null, success: null });
});

router.post('/', (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
        return res.render('register', { error: 'All fields are required.', success: null });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.render('register', { error: 'Please enter a valid email address.', success: null });
    }

    if (password.length < 8) {
        return res.render('register', { error: 'Password must be at least 8 characters.', success: null });
    }

    if (password !== confirmPassword) {
        return res.render('register', { error: 'Passwords do not match.', success: null });
    }

    const result = authService.registerUser(email, password);
    if (!result.success) {
        return res.render('register', { error: result.error, success: null });
    }

    res.render('register', { error: null, success: 'Account created! You can now log in.' });
});

module.exports = router;
