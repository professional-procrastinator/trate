const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id:{
        type:String,
        required: true
    },
    user: {
        type:Object,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    attachments:{
        type:Array,
        required:false
    }
},{timestamps:true})


const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
module.exports = Post;