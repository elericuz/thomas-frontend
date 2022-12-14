const _ = require('lodash');
const fetch = require('node-fetch')

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

    return await fetch(endpoint, options)
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