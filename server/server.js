require('dotenv').config()
const express = require('express');
const {createServer} = require('http');
const mongoose = require('mongoose');
const {Server} = require('socket.io');
const app = express();
const Post = require('./models/post');
const ObjectId = require('mongodb').ObjectID;

try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
  } catch (err) {
    console.log(err);
}

const httpServer = createServer(app);
const io = new Server(httpServer,{
    cors:{
        origin:'*',
        methods:['GET','POST','PUT','DELETE'],
    },
    maxHttpBufferSize:10000000000,
    pingTimeout:20000
});

const User = require('./models/user');

io.on('connection',async (socket)=>{
    if(Object.keys(socket.handshake.auth).length == 0){
        socket.disconnect();
        return;
    }
    
    const Posts = await Post.find().lean(); 
    socket.emit('posts',Posts);
    console.log('socket joined')
    socket.join('listening')
    socket.on('new-post',async (data)=>{
        const user = await User.findOne({"_id":ObjectId(socket.handshake.auth.id)});
       
        const post = new Post({
            id:data.id,
            user:user,
            body:(data.body==""?" ":data.body),
            attachments:data.attachments
        })
        post.save();
        io.in('listening').emit('post',post);

    })

    socket.on('delete-post',async (data)=>{
        await Post.findOneAndDelete({"_id":ObjectId(data)});

        io.in('listening').emit('deleted-post',{
            id:data
        })
    })
    socket.on('Binary Message',(data)=>{
        console.log(data)
    })
})

app.get('/',(req,res)=>{
    res.send('me when the')
})



const port = process.env.PORT || 5001;
httpServer.listen(port, ()=>{
    console.log(`The server is listening on port ${port}`)
})