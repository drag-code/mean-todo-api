const router = require('express').Router();
const TaskList = require("../db/models/TaskList");

router.get('/', async(req, res) => {
    try {
        const lists = await TaskList.find({});
        return res.status(200).json({data: lists});
    } catch(e) {
        return res.json({msg: `There was an error ${e}`})
    }
});

router.get('/:list', async(req, res) => {
    try {
        const list = await TaskList.find({_id: req.params.list});
        return res.status(200).json({data: list});
    } catch(e) {
        return res.json({msg: `There was an error ${e}`})
    }
});

router.post('/create/', async(req, res) => {
    try {
        const list = req.body;
        const newList = await TaskList.create(list);
        res.status(201).json({msg: "TASKLIST CREATE", data: newList});
    } catch(e) {
        return res.json({msg: `There was an error ${e}`});
    }
});

router.patch('/:listId/edit', async(req, res) => {
    try {
        const listId = req.params.listId;
        const list = req.body;
        const updated = await TaskList.updateOne({_id: listId}, list);
        res.status(200).json({msg: "TASKLIST EDIT", data: updated});
    } catch(e) {
        return res.json({msg: `There was an error ${e}`});
    }
});


router.delete('/:listId', async(req, res) => {
    try {
        const listId = req.params.listId;
        const deleted = await TaskList.deleteOne({_id: listId});
        res.status(200).json({msg: "TASKLIST ERASED", data: deleted});
    } catch(e) {
        return res.json({msg: `There was an error ${e}`});
    }
});

module.exports = router;