const mongoose = require("mongoose");

const connectDB = async() => {
    try {
     await mongoose.connect(process.env.MONGO_URI);
        console.log("connect to mongoDB")
    } catch (error) {
        console.log("error conected to mongoDB", error);
    }
};

module.exports = { connectDB };
