const mongoose = require('mongoose');
const questionInserts = require('./questions_insert');
const mongoDB = 'mongodb://localhost:27017/PyParson';
const db = mongoose.connection;
const Question = require('./questionSchema');

module.exports.questionsInsert = function() {
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // Question.collection.drop(); //empty questions collection
    Question.collection.insert(questionInserts.questions, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
            console.log("Multiple questions added to database");
        }
    });
};

