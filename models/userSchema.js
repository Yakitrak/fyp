const mongoose = require('mongoose');

const userModelSchema = mongoose.Schema({
    id: {type: String, unique: true},
    email: {type: String},
    name: {type: String },
    avatar: {type: String },
    skills: {
        control_structure: {type: Number, default: 0 },
        conditions_and_boolean: {type: Number, default: 0 },
        read__write: {type: Number, default: 0 },
        functions: {type: Number, default: 0 },
        exception_handling: {type: Number, default: 0 },
        dictionaries: {type: Number, default: 0 },
        list: {type: Number, default: 0 },
    },
    questionsActive: {},
    google: {
        access_token: {type: String},
        refresh_token: {type: String}
    }

});

module.exports = mongoose.model('User', userModelSchema);