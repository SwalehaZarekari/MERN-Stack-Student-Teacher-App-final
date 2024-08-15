const mongoose= require("mongoose");


const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo Coonected ${mongoose.connection.host}`)
    }
    catch(error){
        console.log(`MongoDB sever Issue ${error}`)
    }
};

module.exports = connectDB;