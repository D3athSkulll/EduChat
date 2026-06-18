import mongoose from "mongoose";

export const connectDB = async() =>{
    const mongoUri = process.env.MONGO_URI;
    console.log(mongoUri);
    if(!mongoUri){
        throw new Error("MONGO_URI is missing");
    }

    await mongoose.connect(mongoUri);

    console.log("MongoDB connected")
}