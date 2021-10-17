const router = require('express').Router();
const Task = require("../db/models/Task");

router.get('/', async(req, res) => {
    try {
        const lists = await Task.find({});
        return res.status(200).json({data: lists});
    } catch(e) {
        return res.json({msg: `There was an error ${e}`})
    }
});

router.get('/:taskId', async(req, res) => {
    try {
        const task = await Task.find({_id: req.params.taskId});
        return res.status(200).json({data: task});
    } catch(e) {
        return res.json({msg: `There was an error ${e}`})
    }
});

module.exports = router;