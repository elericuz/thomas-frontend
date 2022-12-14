const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users')

// router.get('/', HomeController.index);

router.get('/signup', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.render('users/signup')
})

router.post('/signup', UserController.signup);

module.exports = router;