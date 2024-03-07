const express = require('express');
const router = express.Router();
const Data = require('../models/Data');

// Middleware function to log request start time
const logRequestStart = (req, res, next) => {
  req.startTime = Date.now();
  next();
};

// declare for count the add & update data
let addCount = 0;
let updateCount = 0;

// Middleware function to log request end time and calculate execution time
const logRequestEnd = (req, res, next) => {
  const endTime = Date.now();
  const executionTime = endTime - req.startTime;
  console.log(`Request to ${req.method} ${req.originalUrl} took ${executionTime} ms`);
  next();
};

// Add middleware to log request start time for all routes
router.use(logRequestStart);

// Add data controller
router.post('/add', async (req, res, next) => {
  try {
    const startTime = Date.now(); // Record start time
    const newData = await Data.create(req.body);
    addCount++; // Increment add count
    const endTime = Date.now(); // Record end time
    const executionTime = endTime - startTime; // Calculate execution time
    res.status(201).json({ ...newData.toObject(), executionTime }); // Include execution time in the response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  next(); // Call next middleware to log request end time
});

// getall Ids controller
router.get('/getall', async (req, res, next) => {
  try {
    const ids = await Data.find().select('_id');
    res.json(ids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  next(); // Call next middleware to log request end time
});

// Update data controller
router.put('/update/:id', async (req, res, next) => {
  try {
    const startTime = Date.now(); // Record start time
    const existingData = await Data.findById(req.params.id);
    if (!existingData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    // Merge existing data with updated data
    Object.assign(existingData, req.body);
    const updatedData = await existingData.save();
    updateCount++; // Increment update count
    const endTime = Date.now(); // Record end time
    const executionTime = endTime - startTime; // Calculate execution time
    res.json({ ...updatedData.toObject(), executionTime }); // Include execution time in the response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  next(); // Call next middleware to log request end time
});

// Count data controller
router.get('/count', async (req, res, next) => {
  try {
    res.json({ addCount, updateCount }); // Send both add and update counts
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  next(); // Call next middleware to log request end time
});

// Add middleware to log request end time for all routes
router.use(logRequestEnd);

module.exports = router;
