const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength:64
    },
    username:{
        type: String,
        required: true,
        maxlength:100
    },
    email: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required:true
    },
    banner:{
        type: String,
        required: true,
        minlength:7,
        maxlength:7
    },
    bio:{
        type: String,
        required:true,
        maxlength:500
    }
},{timestamps:true})


const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;