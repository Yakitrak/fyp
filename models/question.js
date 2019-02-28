const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PyParson');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

    const questionModelSchema = mongoose.Schema({
        id: {type: String, unique: true},
        question: {type: String },
        startCode: [],
        correctCode: [],
        skillType: {
            simple: {type: Number, default: 0 },
            control_structure: {type: Number, default: 0 },
            conditions: {type: Number, default: 0 },
            read__write: {type: Number, default: 0 },
            functions: {type: Number, default: 0 },
            exception_handling: {type: Number, default: 0 },
            dictionaries: {type: Number, default: 0 },
            list: {type: Number, default: 0 },
            data_types: {type: Number, default: 0 },
            boolean_expressions: {type: Number, default: 0 },
        },
    });

    let Question = mongoose.model('Question', questionModelSchema);

    let questions = [
        {
            "skillLevel": "?",
            "question": "Print out the fruits in order: apple, banana, cherry",
            "startCode": [
                { "id": 0, "indent": 0, "line": "# Drag correct blocks above this! Nothing below is marked!" },
                { "id": 1, "indent": 0, "line": "fruits = ['apple', 'banana', 'cherry']" },
                { "id": 2, "indent": 0, "line": "for fruit in fruits:" },
                { "id": 3, "indent": 0, "line": "print(cherry)" },
                { "id": 4, "indent": 0, "line": "print(fruit)" }

            ],
            "correctCode": [
                { "id": 1, "indent": 0 },
                { "id": 2, "indent": 0 },
                { "id": 4, "indent": 1 }
            ]
        },
        {
            "skillLevel": "?",
            "question": "Define and use the hello function to print 'hello Bill' then 'hello Jim'",
            "startCode": [
                { "id": 0, "indent": 0, "line": "# Drag correct blocks above this! Nothing below is marked!" },
                { "id": 1, "indent": 0, "line": "hello('Jim')" },
                { "id": 2, "indent": 0, "line": "print('Hello ', name)" },
                { "id": 3, "indent": 0, "line": "hello('Bill')" },
                { "id": 4, "indent": 0, "line": "def hello(Bill):" },
                { "id": 5, "indent": 0, "line": "def hello(name):" }

            ],
            "correctCode": [
                { "id": 5, "indent": 0 },
                { "id": 2, "indent": 1 },
                { "id": 3, "indent": 0 },
                { "id": 1, "indent": 0 }
            ]
        },
    ];

    Question.collection.insert(questions, function (err, docs) {
        if (err){
            return console.error(err);
        } else {
            console.log("Multiple questions added to database");
        }
    });
});





