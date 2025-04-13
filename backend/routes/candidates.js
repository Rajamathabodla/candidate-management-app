const express = require('express');
const router = express.Router();
const Candidate = require('../models/Candidate');

// Get candidates (with search/filter/pagination)
router.get('/', async (req, res) => {
  const { search, gender, experience, skills, page = 1, limit = 10 } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') },
    ];
  }

  if (gender) query.gender = gender;
  if (experience) query.experience = experience;
  if (skills) query.skills = { $in: skills.split(',') };

  const candidates = await Candidate.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const count = await Candidate.countDocuments(query);

  res.json({ candidates, totalPages: Math.ceil(count / limit), currentPage: +page });
});

// Add candidate
router.post('/', async (req, res) => {
  const candidate = new Candidate(req.body);
  await candidate.save();
  res.status(201).json(candidate);
});

// Delete candidate by ID
router.delete('/:id', async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Candidate deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting candidate' });
  }
});


module.exports = router;
