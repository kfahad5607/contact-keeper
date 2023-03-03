const mongoose = require('mongoose');

const connectDB = async () => {
// 
    try {
       await mongoose.connect(process.env.DATABASE, {
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
