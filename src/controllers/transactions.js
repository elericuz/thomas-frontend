const _ = require('lodash');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {call} = require('../helpers/service');
const {isNumber} = require('../helpers/utils');

exports.dashboard = async (req, res, next) => {
    let page = _.isUndefined(req.params.page) ? 1 : req.params.page;
    if (!isNumber(page)) {
        res.redirect('/404');
        return;
    }

    const limit = 16;
    const skip = (page === 1) ? 0 : (limit * (page - 1))

    const endpoint = "/transactions/get";
    let data = new URLSearchParams();
    data.append('skip', skip);
    data.append('limit', limit);
    data.append('page', page);

    let transactions = await call(endpoint + '?' + data);

    if (page > transactions.results.totalPages) {
        res.redirect('/transactions/');
        return;
    }

    res.render('transactions/dashboard', {
        total: transactions.results.total,
        showing: {
            from: ((page - 1) * limit) + 1,
            to: ((page * limit) > transactions.results.total) ? transactions.results.total : page * limit
        },
        totalPages: transactions.results.totalPages,
        currentPage: page,
        transactions: transactions.results.data,
        uri: 'transactions'
    });
}

exports.list = async (req, res, next) => {
    let externalNumber = req.params.externalNumber;
    if (!isNumber(externalNumber)) {
        res.redirect('/404');
        return;
    }

    let page = _.isUndefined(req.params.page) ? 1 : req.params.page;
    if (!isNumber(page)) {
        res.redirect('/404');
        return;
    }

    const limit = 16;
    const skip = (page === 1) ? 0 : (limit * (page - 1))

    const endpoint = "/transactions/get";
    let data = new URLSearchParams();
    data.append('external_number', externalNumber);
    data.append('skip', skip);
    data.append('limit', limit);
    data.append('page', page);

    let transactions = await call(endpoint + '?' + data);

    if (page > transactions.results.totalPages) {
        res.redirect('/transactions/get/' + externalNumber);
    } else {
        res.render('transactions/list', {
            balance: await getBalance(transactions.results.data[0].internal_number),
            total: transactions.results.total,
            showing: {
                from: ((page - 1) * limit) + 1,
                to: ((page * limit) > transactions.results.total) ? transactions.results.total : page * limit
            },
            totalPages: transactions.results.totalPages,
            currentPage: page,
            internal_number: transactions.results.data[0].internal_number,
            external_number: transactions.results.data[0].external_number,
            transactions: transactions.results.data,
            uri: 'transactions/get/' + externalNumber
        });
    }
}

async function getBalance(internalNumber) {
    const endpoint = "/balances/get";

    let data = new URLSearchParams();
    data.append('internal_number', internalNumber);

    let balance = await call(endpoint + '?' + data);

    return _.isEmpty(balance.results.data) ? 0 : balance.results.data[0].balance;
}