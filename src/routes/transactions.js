const express = require('express');
const router = express.Router();

const TransactionsController = require('../controllers/transactions');

router.get('/get/:externalNumber/:page*?', TransactionsController.list);
router.get('/:page*?', TransactionsController.dashboard);

module.exports = router;