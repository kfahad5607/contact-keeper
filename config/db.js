const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');
const connectDB = async () => {
   

    try {
       await mongoose.connect(db, {
            useNewUrlParser: true,
           useCreateIndex: true,
           useUnifiedTopology: true,
            useFindAndModify: false
       });
        console.log("mongo connected");
        
    } catch (error) {
        console.log(error.message, 'jj');
        process.exit(1)
        
    }
} 

module.exports = connectDB;
