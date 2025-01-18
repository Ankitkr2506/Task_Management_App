const mongoose=require("mongoose");
const taskSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
        unique: true,
    },
    important: {
        type: Boolean,
        required: true,
        default: false,
    },
    complete: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {timestamps: true});
module.exports = mongoose.model("task", taskSchema);