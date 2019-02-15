const mongoose = require('mongoose');

const userModelSchema = mongoose.Schema({
    id: {type: String, unique: true},
    email: {type: String },
    avatar: {type: String, default:'#'},
    skills: {
        x: {type: Number, default: 0 },
        y: {type: Number, default: 0 },
        z: {type: Number, default: 0 },
    },
    questionsActive: [],

});

module.exports = mongoose.model('User', userModelSchema);