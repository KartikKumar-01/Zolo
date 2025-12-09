import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Database connected");
    }
    catch(error){
        console.error("Database connection failed ", error);
    }
}

export default connectDB;