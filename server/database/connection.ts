const mongoose = require('mongoose');

/**
 * @param {* This code will connect our application with the mongodb database} request 
 */
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;