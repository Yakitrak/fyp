const mongoose = require('mongoose');

const questionModelSchema = mongoose.Schema({
    id: {type: String, unique: true},
    starter: {type: Boolean},
    question: {type: String },
    startCode: [],
    correctCode: [],
    skills: {
        required: {
        },
        granted: {
        },
    },
});

module.exports = mongoose.model('Question', questionModelSchema);