const mongo = require('../helpers/mongo');
const Axios = require('axios');


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
        }
    };
};