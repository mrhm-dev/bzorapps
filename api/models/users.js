const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

// Creating User Schema
const UserSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    password: {
        type: string,
        required: true
    }
});

UserSchema.plugin(timestamp);

const User = module.exports = mongoose.model('User', UserSchema);