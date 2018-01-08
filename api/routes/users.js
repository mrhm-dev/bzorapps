const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users/auth');
const profileController = require('../controllers/users/profile');

// User Signup Route
router.post('/signup', usersController.signup);

// User Signin Route
router.post('/signin', usersController.signin);

// User Profile Routes
router.get('/profile', profileController.profile);

// Get All Registered Users
router.get('/', profileController.getAllUser);

// Update User Information
router.put('/:userId', profileController.updateUser);

// Delete User Information
router.delete(':/userId', profileController.removeUser);

module.exports = router;