const mongoose = require('mongoose');
const questions_insert = require('./questions_insert');

mongoose.connect('mongodb://localhost:27017/PyParson');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

    const questionModelSchema = mongoose.Schema({
        id: {type: String, unique: true},
        question: {type: String },
        startCode: [],
        correctCode: [],
        skills: {
            basic: {type: Number, default: 0 },
            control_structure: {type: Number, default: 0 },
            conditions_and_boolean: {type: Number, default: 0 },
            read__write: {type: Number, default: 0 },
            functions: {type: Number, default: 0 },
            exception_handling: {type: Number, default: 0 },
            dictionaries: {type: Number, default: 0 },
            list: {type: Number, default: 0 },
            data_types: {type: Number, default: 0 },
        },
    });

    let Question = mongoose.model('Question', questionModelSchema);

    let questions = questions_insert;


    Question.collection.insert(questions, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
            console.log("Multiple questions added to database");
        }
    });
});





