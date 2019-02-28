const mongoose = require('mongoose');

const userModelSchema = mongoose.Schema({
    id: {type: String, unique: true},
    name: {type: String },
    avatar: {type: String },
    skills: {
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
    questionsComplete: [],
    questionsActive: [],

});

module.exports = mongoose.model('User', userModelSchema);