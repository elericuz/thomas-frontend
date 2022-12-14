const express = require('express');
const router = express.Router();

const TransactionsController = require('../controllers/transactions');

router.get('/', TransactionsController.dashboard);
router.get('/:externalNumber/:page*?', TransactionsController.list);

module.exports = router;