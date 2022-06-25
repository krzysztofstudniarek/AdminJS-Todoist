const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], required: true },
});
const User = mongoose.model('User', UserSchema);

module.exports = {
    UserSchema,
    User,
}