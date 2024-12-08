import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb Connected")
    } catch (error) {
        console.log("failed to Connect to DB",error);
        process.exit(1);
    }
}