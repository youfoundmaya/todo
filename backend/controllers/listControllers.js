const Todo = require("../models/listSchema");

exports.getTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const newTodo = new Todo({
      title,
      desc,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

exports.removeTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await Todo.deleteOne({ title });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error removing todo" });
  }
};

exports.updateTodo = async (req, res) => {
  const { title } = req.params;
  const { newTitle, desc } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { title },
      { title: newTitle, desc },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};
