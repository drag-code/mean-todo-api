require("dotenv").config();
const express = require('express');
const mongoose = require('./db/mongoose');
const app = express();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
    console.log(`LISTENING ON PORT ${process.env.APP_PORT}`);
});