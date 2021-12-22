const mongoose = require('mongoose');

async function connectToDB(){
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDB;