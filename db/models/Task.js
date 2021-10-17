const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});


const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;