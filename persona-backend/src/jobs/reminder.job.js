const cron = require("node-cron");
const Task = require("../models/Task");
const User = require("../models/User");

// ⏰ TASK REMINDERS (every 5 minutes) - Only for tasks, not habits/goals
cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();
    const windowEnd = new Date(now.getTime() + 30 * 60 * 1000);

    const tasks = await Task.find({
      type: "task", // Only tasks get reminders
      completed: false,
      reminderSent: false,
      dueAt: { $gte: now, $lte: windowEnd },
    });

    for (const task of tasks) {
      const user = await User.findById(task.user);
      if (!user?.pushToken) continue;

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.pushToken,
          title: "LifeOS Reminder",
          body: task.title,
        }),
      });

      task.reminderSent = true;
      await task.save();
    }
  } catch (err) {
    console.error("❌ Task reminder cron failed:", err.message);
  }
});

// 🔄 HABIT REMINDERS (once per recurrence period)
cron.schedule("0 9 * * *", async () => {
  try {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const dayOfMonth = now.getDate();

    // Find habits that need reminders today
    const habits = await Task.find({
      type: "habit",
      completed: false,
    });

    for (const habit of habits) {
      let shouldNotify = false;

      if (habit.recurring === "daily") {
        shouldNotify = true;
      } else if (habit.recurring === "weekly" && dayOfWeek === 1) {
        // Monday reminders for weekly habits
        shouldNotify = true;
      } else if (habit.recurring === "monthly" && dayOfMonth === 1) {
        // First of month for monthly habits
        shouldNotify = true;
      }

      if (shouldNotify) {
        const user = await User.findById(habit.user);
        if (!user?.pushToken) continue;

        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: user.pushToken,
            title: "LifeOS Habit",
            body: habit.title,
          }),
        });
      }
    }
  } catch (err) {
    console.error("❌ Habit reminder cron failed:", err.message);
  }
});

// 🎯 GOAL REMINDERS (weekly nudge only)
cron.schedule("0 10 * * 1", async () => {
  try {
    // Every Monday at 10 AM
    const goals = await Task.find({
      type: "goal",
      completed: false,
    });

    for (const goal of goals) {
      const user = await User.findById(goal.user);
      if (!user?.pushToken) continue;

      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.pushToken,
          title: "LifeOS Goal",
          body: `Remember: ${goal.title}`,
        }),
      });
    }
  } catch (err) {
    console.error("❌ Goal reminder cron failed:", err.message);
  }
});

// 🌅 DAILY HABIT NOTIFICATION (8 AM)
cron.schedule("0 8 * * *", async () => {
  try {
    const users = await User.find({ pushToken: { $exists: true } });

    for (const user of users) {
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: user.pushToken,
          title: "LifeOS",
          body: "What’s on your mind today?",
        }),
      });
    }
  } catch (err) {
    console.error("❌ Daily habit cron failed:", err.message);
  }
});
