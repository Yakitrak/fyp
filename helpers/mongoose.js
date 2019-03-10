const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/PyParson';
const User = require('../models/user');

module.exports = (func, data, callback) => {
    mongoose.connect(mongoDB, { useNewUrlParser: true });

        mongoose.Promise = global.Promise;
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));

        switch (func) {
            case 'user_info':
                User.find({ 'id': data.identifier.id.toString() }, 'email name avatar', function (err, userInformation) {
                    if (err) return callback({ success: false, errorMsg: err});
                    callback({success: true, data: userInformation[0]});
                });
                break;
        }
};