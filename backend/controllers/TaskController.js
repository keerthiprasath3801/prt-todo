import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = new Task({
      title,
      description,
      completed: completed || false,
      user: req.user._id
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task, success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }

    res.status(200).json({ message: "Task updated successfully", task, success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found", success: false });
    }

    res.status(200).json({ message: "Task deleted successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};