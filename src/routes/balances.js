const express = require('express');
const router = express.Router();

const BalancesController = require('../controllers/balances');

router.get('/force/:internalNumber*?', BalancesController.update);

module.exports = router;