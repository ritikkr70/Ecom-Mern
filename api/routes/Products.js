const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


router.post('/items', async (req, res) => {
    try {
      const item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
      });
      await item.save();
  
      res.status(201).json({ message: 'Item created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


// Endpoint for getting a list of items available for purchase
router.get('/items', async (req, res) => {
  try {
    // Get a list of items from the database
    const items = await Item.find();

    // Send a response
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;