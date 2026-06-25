const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskHistory,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask);

router.get("/", getTasks);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

router.get("/:id/history", getTaskHistory);

module.exports = router;