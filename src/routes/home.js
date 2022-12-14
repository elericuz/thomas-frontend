const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/home')

router.get('/', HomeController.index);
router.get('/404', HomeController.errorPage);

module.exports = router;