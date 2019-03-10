const mongooseHelper = require('../helpers/mongoose');
const Axios = require('axios');
const google = require('../helpers/googleApi');
const passportRefreshToken = require('passport-oauth2-refresh');


// function grabNewToken(username, refreshToken, callback) {
//     passportRefreshToken.requestNewAccessToken('google', refresherToken, {},function (err, accessToken, refreshToken) {
//         if (err) return console.log("Refresh Token error: ", err);
//         let newRefreshToken = refreshToken == null ? refresherToken : refreshToken;
//
//         spotify('setAccessToken', {username: username, access_token: accessToken});
//
//         mongooseHelper('update', {identifier: {username: username}, data: {'google': {access_token: accessToken, refresh_token: newRefreshToken}}});
//         callback();
//     });
//
// }


module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/initial', this.initialise);
            // router.get('/getFinishedQuestions', this.getFinishedQuestions);
            // router.post('/updateFinishedQuestions', this.updateFinishedQuestions);
            // router.get('/getActiveQuestions', this.getActiveQuestions);
            // router.post('/updateUserSkill', this.updateUserSkill);
            // router.post('/deleteUserAccount', this.deleteUserAccount);
            // router.post('/refreshToken', this.refreshToken);
        },

        initialise: function (req, res) {
            mongooseHelper('user_info', {identifier: {id: req.user.id }}, resp => {
                console.log(resp);
                if (resp.success) {
                    res.json({
                        success: true,
                        name: resp.data.name,
                        email: resp.data.email,
                        avatar: resp.data.avatar,
                    });
                } else {
                    res.json({success: false});
                }
            })
        }
    };
};