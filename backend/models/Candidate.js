const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  gender: String,
  experience: String,
  skills: [String],
});

module.exports = mongoose.model("Candidate", candidateSchema);
