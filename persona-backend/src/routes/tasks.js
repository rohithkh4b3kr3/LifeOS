const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// ---- TODAY ----
router.get("/today", auth, async (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  // Only show tasks, not habits or goals
  const tasks = await Task.find({
    user: req.user.id,
    type: "task",
    dueAt: { $gte: start, $lte: end },
    completed: false,
  }).sort({ dueAt: 1 });

  // Sort by priority: High > Medium > Low
  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  tasks.sort((a, b) => {
    const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    return priorityDiff !== 0 ? priorityDiff : 0;
  });

  res.json(tasks);
});

// ---- UPCOMING ----
router.get("/upcoming", auth, async (req, res) => {
  const now = new Date();

  // Only show tasks, not habits or goals
  const tasks = await Task.find({
    user: req.user.id,
    type: "task",
    dueAt: { $gt: now },
    completed: false,
  })
    .sort({ dueAt: 1 })
    .limit(20);

  res.json(tasks);
});

// ---- COMPLETE TASK ----
router.patch("/:id/complete", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { completed: true },
    { new: true }
  );

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
});

// ---- BULK CREATE TASKS ----
router.post("/bulk-create", auth, async (req, res) => {
  try {
    const { tasks } = req.body;
    if (!Array.isArray(tasks)) {
      return res.status(400).json({ error: "Tasks array required" });
    }

    const createdTasks = await Task.insertMany(
      tasks.map((task) => ({
        ...task,
        user: req.user.id,
        source: "ai",
      }))
    );

    res.json({ success: true, tasks: createdTasks, count: createdTasks.length });
  } catch (err) {
    console.error("Bulk create error:", err);
    res.status(500).json({ error: "Failed to create tasks" });
  }
});

module.exports = router;
