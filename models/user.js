const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength:64
    },
    email: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required:true
    }
},{timestamps:true})


const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;