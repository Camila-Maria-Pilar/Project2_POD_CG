const withAuth = require('../utils/auth');
const express = require('express');
const router = express.Router();
const { User, Pod } = require('../models');

// Route for rendering the registration page
router.get('/register', (req, res) => {
  res.render('register');
});

// Route for handling user registration form submission
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred during registration' });
  }
});

// Route for rendering the login page
router.get('/login', (req, res) => {
  // Check if the user is already logged in
  if (req.session.logged_in) {
    res.redirect('/dashboard'); // Redirect to the dashboard if logged in
  } else {
    res.render('login'); // Render the login page
  }
});


// Route for handling user login form submission
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      res.status(401).render('error', { error: 'Invalid email or password' });
      return;
    }

    req.session.logged_in = true;
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred during login' });
  }
});

// Route for rendering the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const deliveryData = await Pod.findAll({ where: { userId: req.session.user.id } });
    res.render('dashboard', { deliveryData });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred while fetching delivery data' });
  }
});


// Route for rendering the create POD page
router.get('/create_pod', (req, res) => {
  res.render('create_pod');
});

// API route for handling form submission
router.post('/submit_form', withAuth, async (req, res) => {
  try {
    const { date, client, description } = req.body;
    await Pod.create({ date, client, description, userId: req.session.user.id });
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred while creating a new POD entry' });
  }
});

// Route for handling user logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
