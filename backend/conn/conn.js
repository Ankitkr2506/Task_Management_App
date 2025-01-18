require("dotenv").config(); // Load environment variables from .env file
const mongoose = require("mongoose");

const conn = async () => {
    try {
        // Connect to MongoDB using Mongoose
        const response = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new MongoDB connection string parser
            useUnifiedTopology: true, // Use the unified topology layer
        });
        if (response) {
            console.log("Connected to DB successfully");
        }
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

conn();
