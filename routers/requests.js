const mongooseHelper = require('../helpers/mongoose');
const Axios = require('axios');
const google = require('../helpers/googleApi');
const passportRefreshToken = require('passport-oauth2-refresh');

module.exports = function () {
    return {
        setRouting: function (router) {
            router.get('/initial', this.initialise);
            router.get('/getUserQuestions', this.getUserQuestions);
            router.post('/updateUserQuestions', this.updateUserQuestions);
            // router.post('/updateUserSkill', this.updateUserSkill);
        },

        initialise: function (req, res) {
            mongooseHelper('user_info', {identifier: {id: req.user.id }}, resp => {
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
        },

        getUserQuestions: function (req, res) {
            mongooseHelper('get_questions', {identifier: {id: req.user.id }}, resp => {
                if (resp.success) {
                    res.json({
                        success: true,
                        questions: resp.data,
                    });
                } else {
                    res.json({success: false});
                }
            })
        },

        updateUserQuestions: function (req, res) {
            mongooseHelper('update_questions', {identifier: {id: req.user.id, question_id: req.query.id, score: req.query.score }}, resp => {
                if (resp.success) {
                    res.json({
                        success: true,
                        questions: resp.data,
                    });
                } else {
                    res.json({success: false});
                }
            })
        },
    };
};