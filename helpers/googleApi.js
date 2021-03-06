const keys = require('../config/secretKeys');
const {google} = require('googleapis');
const client_id = keys.googleAuth.client_id;
const client_secret = keys.googleAuth.client_secret;
const redirect_uri = keys.googleAuth.client_callback;

const googleWebApi = {};

const run = function(command, data, callback) {
    switch(command) {
        case 'new_user':
            googleWebApi[data.username] = new google.auth.OAuth2({
                clientId : client_id,
                clientSecret : client_secret,
                redirectUri : redirect_uri
            });

            callback("success");
            break;

    }
};

module.exports = function(command, data, callback) {
    run(command, data, response => {
        callback(response);
    });
};