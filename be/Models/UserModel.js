const mg=require('mongoose');
const UserSchema = new mg.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    language: {
        type: String,
        required: true,
        trim: true
    },
});
const UserModel = mg.model('User', UserSchema);
module.exports = UserModel;