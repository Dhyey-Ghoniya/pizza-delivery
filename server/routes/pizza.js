const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const auth = require('../middleware/auth');

// @route   GET /api/pizza/bases
// @desc    Get all pizza bases
router.get('/bases', auth, async (req, res) => {
  try {
    const bases = await Inventory.find({ category: 'base', quantity: { $gt: 0 } });
    res.json(bases);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   GET /api/pizza/sauces
// @desc    Get all sauces
router.get('/sauces', auth, async (req, res) => {
  try {
    const sauces = await Inventory.find({ category: 'sauce', quantity: { $gt: 0 } });
    res.json(sauces);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   GET /api/pizza/cheeses
// @desc    Get all cheeses
router.get('/cheeses', auth, async (req, res) => {
  try {
    const cheeses = await Inventory.find({ category: 'cheese', quantity: { $gt: 0 } });
    res.json(cheeses);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   GET /api/pizza/veggies
// @desc    Get all veggies
router.get('/veggies', auth, async (req, res) => {
  try {
    const veggies = await Inventory.find({ category: 'veggie', quantity: { $gt: 0 } });
    res.json(veggies);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// @route   GET /api/pizza/meats
// @desc    Get all meats
router.get('/meats', auth, async (req, res) => {
  try {
    const meats = await Inventory.find({ category: 'meat', quantity: { $gt: 0 } });
    res.json(meats);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
