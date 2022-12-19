const express = require('express');
const router = express.Router();

const TransactionsController = require('../controllers/transactions');

router.get('/get/:externalNumber/:page*?', TransactionsController.get);
router.get('/:page*?', TransactionsController.list);

module.exports = router;