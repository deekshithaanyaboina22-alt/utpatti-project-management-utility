const Task = require("../models/Task");
const TaskHistory = require("../models/TaskHistory");

// Create Task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Get All Tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate(
      "assignedUser",
      "name email role"
    );

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const existingTask = await Task.findById(req.params.id);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    if (
      req.body.status &&
      req.body.status !== existingTask.status
    ) {
      await TaskHistory.create({
        taskId: existingTask._id,
        oldStatus: existingTask.status,
        newStatus: req.body.status,
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTaskHistory = async (req, res) => {
  try {
    const history = await TaskHistory.find({
      taskId: req.params.id,
    })
      .populate({
        path: "taskId",
        populate: {
          path: "assignedUser",
          select: "name",
        },
      })
      .sort({ changedAt: 1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskHistory,
};