const mongoHelper = require('helpers/mongo');
const Axios = require('axios');
const google = require('helpers/googleApi');
const passportRefreshToken = require('passport-oauth2-refresh');


function grabNewToken(username, refreshToken, callback) {
    passportRefreshToken.requestNewAccessToken('google', refreshToken, {},function (err, accessToken, refreshToken) {
        if (err) return console.log("Refresh Token error: ", err);
        let newRefreshToken = refreshToken == null ? refresherToken : refreshToken;


        // mongo('update', 'users', {identifier: {username: username}, data: {'google': {access_token: accessToken, refresh_token: newRefreshToken}}});
        callback();
    });

}


module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/getFinishedQuestions', this.getFinishedQuestions);
            router.post('/updateFinishedQuestions', this.updateFinishedQuestions);
            router.get('/initial', this.initialise);
            router.get('/getActiveQuestions', this.getActiveQuestions);
            router.post('/updateUserSkill', this.updateUserSkill);
            router.post('/deleteUserAccount', this.deleteUserAccount);
            router.post('/refreshToken', this.refreshToken);
        },

        initialise: function (req, res) {
            google('new_user', {username: req.user.id }, () => {

            });

        }
    };
};