const express = require("express");
const collectionRoutes = require("./routes/collection.routes");
const booksRoutes = require("./routes/books.routes");
const logsRoutes = require("./routes/logs.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Assignment 7 API is running" }));
app.use("/collection", collectionRoutes);
app.use("/books", booksRoutes);
app.use("/logs", logsRoutes);

app.use((req, res) => res.status(404).json({ message: "Route not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error", error: err.message });
});

module.exports = app;
