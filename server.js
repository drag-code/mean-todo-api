require("dotenv").config();
const express = require('express');
const mongoose = require('./db/mongoose');
const taskRouter = require('./routes/taskRouter');
const taskListRouter = require('./routes/taskListRouter');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());
app.use('/task', taskRouter);
app.use('/taskList', taskListRouter);

app.listen(process.env.APP_PORT, () => {
    console.log(`LISTENING ON PORT ${process.env.APP_PORT}`);
});