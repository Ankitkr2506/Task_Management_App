const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tasks: [{
        type: mongoose.Types.ObjectId,
        ref: "task", // Array of references to the Task model
    }],
});

module.exports = mongoose.model("User", userSchema);
