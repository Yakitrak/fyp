const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/PyParson';
const db = mongoose.connection;
const questionInserts = require('./question_data.json');
const Question = require('./questionSchema');

module.exports.questionsInsert = function() {
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    mongoose.Promise = global.Promise;
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    // Question.collection.drop(); //empty questions collection
    Question.collection.insert(questionInserts, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
            console.log("Multiple questions added to database");
        }
    });
};

