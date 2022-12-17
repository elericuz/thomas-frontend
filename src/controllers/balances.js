const _ = require('lodash');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {call} = require('../helpers/service');
const {isNumber} = require('../helpers/utils');

exports.update = async (req, res, next) => {
    let internalNumber = req.params.internalNumber;
    if (!isNumber(internalNumber)) {
        res.status(404).json({
            message: 'Something went wrong.'
        })
        return
    }

    const endpoint = "/balances/force";
    let data = new URLSearchParams();
    data.append('internal_number', internalNumber);

    let balance = await call(endpoint + '?' + data);

    res.status(200).json({
        results: {
            message: "¡Saldo Actualizado!",
            data: balance.results.data
        }
    });
}