const router = require("express").Router();
const TaskList = require("../db/models/TaskList");
const Task = require("../db/models/Task");
const mongoose = require("../db/mongoose");

router.get("/", async (_, res) => {
	try {
		const lists = await TaskList.find({});
		return res.status(200).json({ data: lists });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.get("/:listId", async (req, res) => {
	try {
		const list = await TaskList.find({ _id: req.params.listId });
		return res.status(200).json({ data: list });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.post("/create/", async (req, res) => {
	try {
		const list = req.body;
		const newList = await TaskList.create(list);
		return res.status(201).json({ msg: "TASKLIST CREATE", data: newList });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.patch("/:listId/edit", async (req, res) => {
	try {
		const listId = req.params.listId;
		const list = req.body;
		const updated = await TaskList.updateOne({ _id: listId }, list);
		return res.status(200).json({ msg: "TASKLIST EDIT", data: updated });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.delete("/:listId", async (req, res) => {
	try {
		const listId = req.params.listId;
		const deleted = await TaskList.deleteOne({ _id: listId });
		return res.status(200).json({ msg: "TASKLIST ERASED", data: deleted });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.get("/:listId/tasks", async (req, res) => {
	try {
		const tasks = await Task.find({ _listId: req.params.listId });
		return res.status(200).json({ data: tasks });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.get("/:listId/tasks/:taskId", async (req, res) => {
	try {
		const task = await Task.find({
			_listId: req.params.listId,
			_id: req.params.taskId,
		});
		return res.status(200).json({ data: task });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.post("/:listId/tasks/create", async (req, res) => {
	try {
		const task = req.body;
		const newTask = await Task.create(task);
		return res.status(201).json({ msg: "TASK CREATE", data: newTask });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.patch("/:listId/tasks/:taskId/edit", async (req, res) => {
	try {
		const task = req.body;
		const updated = await Task.updateOne(
			{ _id: req.params.taskId, _listId: req.params.listId },
			task
		);
		return res.status(200).json({ msg: "TASK EDIT", data: updated });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.delete("/:listId/tasks/:taskId", async (req, res) => {
	try {
		const deleted = await Task.deleteOne({
			_id: req.params.taskId,
			_listId: req.params.listId,
		});
		return res.status(200).json({ msg: "TASK ERASED", data: deleted });
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	}
});

router.delete("/:listId/tasks", async(req, res) => {
	const session = mongoose.startSession();
	const transactionOptions = {
		readPreference: "primary",
		readConcern: { level: "local" },
		writeConcern: { w: "majority" },
	};
	try {
		(await session).withTransaction(async () => {
			await Task.deleteMany({ _listId: req.params.listId });
			const data = await TaskList.deleteOne({ _id: req.params.listId });
			return res.status(200).json({ msg: "TASKLIST ERASED WITH THEIR TASKS", data});
		}, transactionOptions);
	} catch (e) {
		return res.json({ msg: `There was an error ${e}` });
	} finally {
		(await session).endSession();
	}
});

module.exports = router;
