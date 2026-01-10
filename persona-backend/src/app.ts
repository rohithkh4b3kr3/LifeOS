import express from "express";
import cors from "cors";
import brainDumpRoutes from "./routes/brainDumpRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/brain-dumps", brainDumpRoutes);

app.get("/", (_req, res) => {
  res.send("LifeOS API is running");
});

module.exports = app;
