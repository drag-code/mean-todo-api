const router = require('express').Router();
const Task = require("../db/models/Task");

router.get('/', (req, res) => {
    res.send("TASK INDEX")
});

module.exports = router;