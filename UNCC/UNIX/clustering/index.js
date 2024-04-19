const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Home route" });
});

app.get("/heavy", (req, res) => {
  setTimeout(() => {
    res.json({ message: "Heavy task done" });
  }, 5000);
});

app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`);
});
