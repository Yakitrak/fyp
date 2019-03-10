const mongoose = require('mongoose');

const questionModelSchema = mongoose.Schema({
    id: {type: String, unique: true},
    starter: {type: Boolean},
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

module.exports = mongoose.model('Question', questionModelSchema);