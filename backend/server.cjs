const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();

mongoose.connect("mongodb://localhost:27017/eco-friendly-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  actions: [{ action: String, timestamp: Date }],
});

const User = mongoose.model("User", userSchema);

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.post("/api/user-action", async (req, res) => {
  const { action } = req.body;
  const user = await User.findOne({});
  if (!user) return res.status(404).json({ message: "User not found" });

  user.actions.push({ action, timestamp: new Date() });
  await user.save();

  res.json({ message: "User action recorded successfully" });
});

app.get("/api/suggestions", async (req, res) => {
  const user = await User.findOne({});
  if (!user) return res.status(404).json({ message: "User not found" });

  try {
    const suggestions = await getEcoFriendlySuggestions(user.actions);
    res.json({ suggestions });
  } catch (error) {
    console.error("Error getting eco-friendly suggestions:", error);
    res.status(500).json({ message: "Error getting eco-friendly suggestions" });
  }
});

async function getEcoFriendlySuggestions(actions) {
  return [
    "Consider switching to energy-efficient appliances to save electricity.",
    "Reduce water usage by fixing leaks and taking shorter showers.",
    "Use reusable bags instead of single-use plastic bags when shopping.",
    "Plant trees in your community to help offset carbon emissions.",
    "Switch to a vegetarian or vegan diet to reduce your carbon footprint.",
  ];
}

app.listen(3000, () => console.log("Server listening on port 3000"));
