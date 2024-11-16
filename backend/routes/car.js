const express = require('express');
const multer = require('multer');
const Car = require('../models/Car');
const auth = require('../middleware/auth');
const router = express.Router();

const upload = multer({ dest: 'uploads/' }); // Update for cloud storage

// Create a car
router.post('/', auth, upload.array('images', 10), async (req, res) => {
  try {
    const images = req.files.map(file => file.path); // Replace with cloud URLs
    const { title, description, tags } = req.body;
    const car = new Car({ title, description, tags, images, user: req.user.id });
    await car.save();
    res.status(201).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all cars of a user
router.get('/', auth, async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search cars globally
router.get('/search', auth, async (req, res) => {
  const { keyword } = req.query;
  try {
    const cars = await Car.find({
      $or: [
        { title: new RegExp(keyword, 'i') },
        { description: new RegExp(keyword, 'i') },
        { tags: new RegExp(keyword, 'i') },
      ],
    });
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
