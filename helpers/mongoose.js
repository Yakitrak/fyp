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
            case 'get_start_questions':
                Question.find({ 'starter': true }, '_id', function (err, questions) {
                    if (err) return callback({ success: false, errorMsg: err});
                    let questionIds = [];
                    questions.forEach(function(element) {
                        questionIds.push({id: element._id, isComplete: false, score: 0 });
                    });

                    callback({success: true, data: questionIds});
                });
                break;
            case 'get_questions':
                let questionsData = [];
                // find the user's active questions
                User.findOne({ 'id': data.identifier.id.toString() }, 'questionsActive',  function (err, questionList) {
                    if (err) return callback({ success: false, errorMsg: err});
                    // get the question data from id
                    let count =  0;
                    questionList.questionsActive.forEach(function(element) {
                       Question.findById(element.id, null)
                           .then(function (data) {
                               count++;
                            questionsData.push({data, isComplete: element.isComplete, score: element.score });
                            if (count === questionList.questionsActive.length) {
                                callback({success: true, data: questionsData});
                            }
                           })
                           .catch(function(errs) {
                           console.log(errs);
                           });
                    });

                });
                break;
            case 'update_questions':
                let question_id = data.identifier.question_id;
                let score = data.identifier.score;

                User.findOneAndUpdate({ 'id': data.identifier.id.toString() }, { $set: { '' : true, '' : score }}, function(err, resp) {




                });
                break;
        }
};