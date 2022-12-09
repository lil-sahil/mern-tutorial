const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect('mongodb://admin:password@127.0.0.1:27017', {dbName:'mernapp'})
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    }catch (error){
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDB