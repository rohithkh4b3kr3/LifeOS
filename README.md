# LifeOS 🧠  
**Turn messy thoughts into a structured life.**

LifeOS is a calm, voice-first personal AI that helps you organize your daily tasks, habits, and goals — without forcing you to manually plan everything.

You talk or type.  
LifeOS understands.  
Your life becomes lighter.

---

## ✨ What LifeOS Does

Most productivity apps make you do the organizing.

LifeOS flips that.

You can:
- Dump messy thoughts
- Speak naturally
- Write unstructured plans

LifeOS:
- Extracts tasks
- Understands priority
- Detects recurring habits
- Organizes everything automatically
- Reminds you at the right time

No dashboards to manage.  
No complex setup.  
Just clarity.

---

## 🧠 Core Idea

> People think in chaos.  
> Software expects structure.  
> LifeOS bridges that gap.

---

## 📱 LifeOS v1 — App Flow

### 1️⃣ Chat Screen (Main)
- Type or speak naturally
- Example:
  > “Tomorrow submit assignment urgent. Call mom every week. My goal is to get fit this year.”

LifeOS extracts:
- Tasks
- Priorities
- Recurring habits
- Long-term goals

---

### 2️⃣ Today Screen
- Shows only **today’s tasks**
- Grouped by priority:
  - 🔴 High
  - 🟡 Medium
  - 🟢 Low
- Tap to complete

No clutter.  
No noise.

---

### 3️⃣ Timeline Screen
- Upcoming tasks (week / month)
- Read-only
- Clean chronological view

---

## 🎙 Voice-First by Design

LifeOS is built around how humans naturally think:
- Speak instead of typing
- No command syntax
- No rigid formats

Voice input → AI parsing → structured life.

---

## 🔔 Smart Notifications

- Task reminders before deadlines
- Daily gentle check-in:
  > “What’s on your mind today?”

LifeOS brings you back — without being annoying.

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Cron jobs for reminders
- Natural language parsing with `chrono-node`

### Mobile
- React Native
- Expo
- Android & iOS ready
- Push notifications via Expo

### AI Logic
- Sentence segmentation
- Priority detection
- Recurring habit detection
- Goal vs task classification
- Date parsing from natural language

---

## 🧾 Task Object (Source of Truth)

```json
{
  "_id": "string",
  "title": "string",
  "priority": "High | Medium | Low",
  "completed": false,
  "dueAt": "Date | null",
  "recurring": "daily | weekly | monthly | null",
  "type": "task | habit | goal",
  "source": "ai",
  "createdAt": "Date"
}
```
## 🧪 Current Status

✅ AI memory parsing works

✅ Task extraction & grouping

✅ Voice input (native STT roadmap ready)

✅ Push notifications

🚧 Authentication UI (intentionally skipped for v1)

🚧 Cloud deployment (planned)

🎯 Philosophy

LifeOS is intentionally:

Calm

Minimal

Human-first

No gamification.
No pressure.
No guilt.

Just help.

🔮 What’s Next

Native speech-to-text (on-device)

Better habit intelligence

Smarter reminders

Offline-first support

## 👤 Built By

Keni
Learning in public.
Building slowly.
Optimizing for usefulness — not hype.

📜 License

MIT — use it, fork it, improve it.
