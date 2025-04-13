const mongoose = require('mongoose');
const Candidate = require('../models/Candidate');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Candidate.deleteMany({});
  await Candidate.insertMany([
    {
      name: "Alice Johnson",
      phone: "1234567890",
      email: "alice@example.com",
      gender: "Female",
      experience: "2 Years",
      skills: ["JavaScript", "React"],
    },
    {
      name: "Bob Smith",
      phone: "9876543210",
      email: "bob@example.com",
      gender: "Male",
      experience: "3 Years",
      skills: ["Python", "Django"],
    },
  ]);
  console.log("Seeded DB");
  mongoose.disconnect();
});
