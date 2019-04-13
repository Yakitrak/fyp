const mongoose = require('mongoose');

const userModelSchema = mongoose.Schema({
    id: {type: String, unique: true},
    email: {type: String},
    name: {type: String },
    avatar: {type: String },
    skills: {
        control: {type: Number, default: 0 },
        bool_operators: {type: Number, default: 0 },
        readwrite: {type: Number, default: 0 },
        functions: {type: Number, default: 0 },
        exceptions: {type: Number, default: 0 },
        dictionary: {type: Number, default: 0 },
        list: {type: Number, default: 0 },
    },
    questionsActive: {},
    google: {
        access_token: {type: String},
        refresh_token: {type: String}
    }

});

module.exports = mongoose.model('User', userModelSchema);