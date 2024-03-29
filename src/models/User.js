const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    profile: {
        name: String,
        bio: String,
        phone: String,
        photo: String,
        public: { type: Boolean, default: true }
    },
    isAdminRole: { type: Boolean, required: true }
});

module.exports = mongoose.model('User', UserSchema);
