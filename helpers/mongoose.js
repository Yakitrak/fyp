const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/PyParson';
const User = require('../models/userSchema');
const Question = require('../models/questionSchema');

module.exports = (func, data, callback) => {
    mongoose.connect(mongoDB, { useNewUrlParser: true });

        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        switch (func) {
            case 'user_info':
                User.find({ 'id': data.identifier.id.toString() }, 'email name avatar', function (err, userInformation) {
                    if (err) return callback({ success: false, errorMsg: err});
                    callback({success: true, data: userInformation[0]});
                });
                break;
            case 'delete_account':
                User.deleteOne({ 'id': data.identifier.id.toString() }, function (err, userInformation) {
                    if (err) return callback({ success: false, errorMsg: err});
                    callback({success: true});
                });
                break;
            case 'get_suitable_questions_start':
                Question.find({
                    $and : [
                        { "skills.required.control": { $eq: 0 }},
                        { "skills.required.bool_operators": { $eq: 0 }},
                        { "skills.required.readwrite": { $eq: 0 }},
                        { "skills.required.functions": { $eq: 0 }},
                        { "skills.required.exceptions": { $eq: 0 }},
                        { "skills.required.dictionary": { $eq: 0 }},
                        { "skills.required.list": { $eq: 0 }},
                    ]}, '_id', function (err, questions) {
                    if (err) return callback({ success: false, errorMsg: err});
                    let questionIds = {};
                    console.log(questions);
                    questions.forEach(function(element) {
                        questionIds[element._id] = {
                            id: element._id,
                            isComplete: false,
                            score: 0,
                        };
                    });

                    callback({success: true, data: questionIds});
                });
                break;
            case 'get_questions':
                let questionsData = {} ;
                // find the user's active questions
                User.findOne({ 'id': data.identifier.id.toString() }, 'questionsActive',  function (err, questionList) {
                    if (err) return callback({ success: false, errorMsg: err});
                    // get the question data from id
                    let count =  0;
                    Object.keys(questionList.questionsActive).forEach(function(key) {
                        questionsData[key] = {
                            isComplete: questionList.questionsActive[key].isComplete,
                            score: questionList.questionsActive[key].score,
                        };
                       Question.findById(key, null)
                           .then(function (data) {
                               count++;
                               questionsData[key].data = data;
                            if (count === Object.keys(questionList.questionsActive).length) {
                                callback({success: true, data: questionsData});
                            }
                           })
                           .catch(function(errs) {
                           console.log(errs);
                           });
                    });
                });
                break;
            case 'update_questions_progress':
                let question_id = data.identifier.question_id;
                let score = data.identifier.score;
                const queryQuestionScore = 'questionsActive.' + question_id + '.score';
                const queryQuestionActive = 'questionsActive.' + question_id + '.isComplete';

                User.findOneAndUpdate({ 'id': data.identifier.id.toString() }, { $set: { [queryQuestionActive] : true, [queryQuestionScore] : score }})
                    .then(function (resp) {
                        callback({ success: true, response: resp });
                    })
                    .catch(function(errs) {
                        callback({ success: false, error: errs });
                    });
                break;
            case 'update_skill_level':
                let newSkills = {};
                let newQuestions = {};

                // gets current skill
                User.findOne({ 'id': data.identifier.id.toString() }, 'skills questionsActive')
                    .then(function (resp) {

                        newQuestions = resp.questionsActive;

                        // create new skills object
                        Object.keys(resp.skills).forEach(function(key) {
                            if (resp.skills.hasOwnProperty(key)) {
                            // if needs to update
                            if (data.identifier.updateValues[key] === undefined) {
                                newSkills[key] = resp.skills[key];
                            } else {
                                newSkills[key] = resp.skills[key] + data.identifier.updateValues[key];
                            }
                        }
                        });

                        // gets new questions from new skill level
                        Question.find({
                            $and : [
                                { "skills.required.control": { $lte: newSkills.control }},
                                { "skills.required.bool_operators": {$lte: newSkills.bool_operators }},
                                { "skills.required.readwrite": {$lte: newSkills.readwrite }},
                                { "skills.required.functions": {$lte: newSkills.functions }},
                                { "skills.required.exceptions": {$lte: newSkills.exceptions }},
                                { "skills.required.dictionary": {$lte: newSkills.dictionary }},
                                { "skills.required.list": {$lte: newSkills.list }},
                            ]}, '_id')
                            .then(function (resp) {
                                // console.log('NEW QUESTIONS', resp);

                                resp.forEach(function(element) {
                                    // add questions to account if not already there
                                    if (newQuestions[element._id] === undefined) {
                                        newQuestions[element._id] = {
                                            id: element._id,
                                            isComplete: false,
                                            score: 0,
                                        };
                                    }
                                });

                                // set new skills AND questions
                                User.findOneAndUpdate({'id': data.identifier.id.toString()}, {$set: {'skills': newSkills, 'questionsActive' : newQuestions }})
                                    .then(function (resp) {
                                        callback({success: true, response: resp});
                                    })
                                    .catch(function (errs) {
                                        callback({success: false, error: errs});
                                    });

                            })
                            .catch(function (errs) {
                                callback({success: false, error: errs});
                            });

                    })
                    .catch(function (errs) {
                        callback({success: false, error: errs});
                    });

                break;
            case 'get_skill_level':
                User.findOne({ 'id': data.identifier.id.toString() }, 'skills', function (err, userInformation) {
                    if (err) return callback({ success: false, errorMsg: err});
                    callback({success: true, data: userInformation.skills });
                });
                break;
        }
};