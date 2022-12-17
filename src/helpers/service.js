const _ = require('lodash');
const fetch = require('node-fetch')

const api = process.env.ENVIRONMENT === "DEVELOPMENT" ? process.env.ENDPOINT_DEV : process.env.ENDPOINT

exports.call = async (endpoint, method = 'GET', headers = null, query = null) => {
    let options = {
        method: method
    }

    if (!_.isNull(headers)) {
        options = {...options, headers: headers};
    }

    if (!_.isNull(query)) {
        options = {...options, body: query};
    }

    let url = api + endpoint
    if (process.env.ENVIRONMENT === "DEVELOPMENT") {
        console.log(url);
    }

    return await fetch(url, options)
        .then(response => response.json())
        .then(
            data => {
                return data;
            },
            err => {
                console.log('Err', 'Something went wrong!');
                console.log('Err', err);
                return err;
            },
        )
}