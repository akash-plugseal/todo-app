const express = require("express");
const { UserModel, TodoModel } = require("../model/user.model");
const { Authenticated } = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/create-todo', Authenticated, async function (req, res) {
    const { title, description, isCompleted } = req.body;

    if (!title || !description) return res.status(400).json({ message: "Title is required" });

    try {
        const newTodo = new TodoModel({
            title,
            description,
            isCompleted,
            userId: req.user.id
        })

        await newTodo.save();
        res.json({ message: "Todo created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
})

router.get('/get-todo', Authenticated, async function (req, res) {

    try {
        const todos = await TodoModel.find({ userId: req.user.id }).select("-__v");
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
})

module.exports = router;