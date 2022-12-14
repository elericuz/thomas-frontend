const _ = require('lodash');
const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.index = async (req, res, next) => {
    res.render('home/index');
}

exports.errorPage = async (req, res, next) => {
    res.render('home/404');
}