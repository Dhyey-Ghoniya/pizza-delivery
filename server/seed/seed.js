const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const User = require('../models/User');
const Inventory = require('../models/Inventory');

const items = [
  { category: 'base', name: 'Thin Crust', quantity: 100, price: 120, image: '🫓' },
  { category: 'base', name: 'Thick Crust', quantity: 100, price: 140, image: '🍞' },
  { category: 'base', name: 'Stuffed Crust', quantity: 100, price: 180, image: '🥐' },
  { category: 'base', name: 'Gluten-Free', quantity: 100, price: 200, image: '🌾' },
  { category: 'base', name: 'Whole Wheat', quantity: 100, price: 150, image: '🌿' },
  { category: 'sauce', name: 'Marinara', quantity: 100, price: 40, image: '🍅' },
  { category: 'sauce', name: 'BBQ', quantity: 100, price: 50, image: '🔥' },
  { category: 'sauce', name: 'Alfredo', quantity: 100, price: 60, image: '🥛' },
  { category: 'sauce', name: 'Pesto', quantity: 100, price: 55, image: '🌿' },
  { category: 'sauce', name: 'Hot Sauce', quantity: 100, price: 45, image: '🌶️' },
  { category: 'cheese', name: 'Mozzarella', quantity: 100, price: 80, image: '🧀' },
  { category: 'cheese', name: 'Cheddar', quantity: 100, price: 90, image: '🧀' },
  { category: 'cheese', name: 'Parmesan', quantity: 100, price: 100, image: '🧀' },
  { category: 'cheese', name: 'Gouda', quantity: 100, price: 110, image: '🧀' },
  { category: 'cheese', name: 'Vegan Cheese', quantity: 100, price: 120, image: '🌱' },
  { category: 'veggie', name: 'Mushrooms', quantity: 100, price: 30, image: '🍄' },
  { category: 'veggie', name: 'Bell Peppers', quantity: 100, price: 25, image: '🫑' },
  { category: 'veggie', name: 'Onions', quantity: 100, price: 20, image: '🧅' },
  { category: 'veggie', name: 'Olives', quantity: 100, price: 35, image: '🫒' },
  { category: 'veggie', name: 'Tomatoes', quantity: 100, price: 25, image: '🍅' },
  { category: 'veggie', name: 'Jalapeños', quantity: 100, price: 30, image: '🌶️' },
  { category: 'veggie', name: 'Spinach', quantity: 100, price: 25, image: '🥬' },
  { category: 'veggie', name: 'Corn', quantity: 100, price: 20, image: '🌽' },
  { category: 'meat', name: 'Pepperoni', quantity: 100, price: 60, image: '🥓' },
  { category: 'meat', name: 'Chicken', quantity: 100, price: 70, image: '🍗' },
  { category: 'meat', name: 'Sausage', quantity: 100, price: 65, image: '🌭' },
  { category: 'meat', name: 'Bacon', quantity: 100, price: 75, image: '🥓' },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    const adminExists = await User.findOne({ email: 'admin@pizza.com' });
    if (!adminExists) {
      await User.create({ name: 'Admin', email: 'admin@pizza.com', password: 'Admin@123', role: 'admin', isVerified: true });
      console.log('Admin created: admin@pizza.com / Admin@123');
    }
    const count = await Inventory.countDocuments();
    if (count === 0) {
      await Inventory.insertMany(items);
      console.log(`Seeded ${items.length} inventory items.`);
    }
    console.log('Seed complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

module.exports = seedData;
if (require.main === module) seedData();
