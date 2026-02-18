import mongoose from "mongoose";
// const URI = "mongodb://localhost:27017/";
const URI = process.env.MONGODB_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection Successful!");
    } catch (error) {
        console.log("Connection Failed!", error);
        process.exit(0);
    }
};

export default connectDb;
