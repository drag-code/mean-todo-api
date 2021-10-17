const mongoose = require('mongoose');

const TaskListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },
});


const TaskList = mongoose.model("TaskList", TaskListSchema);

module.exports = TaskList;