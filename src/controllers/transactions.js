const _ = require('lodash');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {call} = require('../helpers/service');
const {isNumber} = require('../helpers/utils');

exports.list = async (req, res, next) => {
    let page = _.isUndefined(req.params.page) ? 1 : req.params.page;
    if (!isNumber(page)) {
        res.redirect('/404');
        return;
    }

    const limit = 40;
    const skip = (page === 1) ? 0 : (limit * (page - 1))

    const endpoint = "/transactions";
    let data = new URLSearchParams();
    data.append('skip', skip);
    data.append('limit', limit);
    data.append('page', page);

    let transactions = await call(endpoint + '?' + data);

    const briefEndpoint = "/transactions/brief";
    let brief = await call(briefEndpoint);

    if (page > transactions.results.totalPages) {
        res.redirect('/transactions/');
        return;
    }

    res.render('transactions/list', {
        brief: brief.results,
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

exports.get = async (req, res, next) => {
    let externalNumber = req.params.externalNumber;
    if (!isNumber(externalNumber)) {
        res.redirect('/404');
        return;
    }

    const limit = _.isUndefined(req.params.limit) ? 16 : req.params.limit;
    const page = _.isUndefined(req.params.page) ? 1 : req.params.page;
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
        res.render('transactions/get', {
            balance: transactions.results.data.balance[0].balance,
            total: transactions.results.data.total,
            showing: {
                from: ((page - 1) * limit) + 1,
                to: ((page * limit) > transactions.results.data.total) ? transactions.results.data.total : page * limit
            },
            totalPages: transactions.results.data.totalPages,
            currentPage: page,
            internal_number: transactions.results.data.card_info[0].internal_number,
            external_number: transactions.results.data.card_info[0].external_number,
            transactions: transactions.results.data.transactions,
            uri: 'transactions/get/' + externalNumber
        });
    }
}