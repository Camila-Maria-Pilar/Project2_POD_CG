const withAuth = require('../utils/auth');
const express = require('express');
const router = express.Router();
const { User, Pod } = require('../models');




// Route for rendering the registration page
router.get('/register', (req, res) => {
  res.render('register', { isRegisterPage: true }); 
});


// Route for handling user registration form submission
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    let errorMessage = 'An error occurred during registration';
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      errorMessage = 'The email address is already registered';        
    }       
    res.render('register', { isRegisterPage: true, error: errorMessage });
  }
});


// Route for rendering the login page
router.get('/login', (req, res) => {
  // Check if the user is already logged in
  if (req.session.logged_in) {
    res.redirect('/dashboard'); // Redirect to the dashboard if logged in
  } else {
    res.render('login', { isLoginPage: true }); 
  }
});


// Route for handling user login form submission
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !user.checkPassword(password)) {
      throw new Error('Invalid email or password');
    }

    req.session.logged_in = true;
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.render('login', { isLoginPage: true, error: error.message });
  }
});



// Route for rendering the dashboard page
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const deliveryData = await Pod.findAll({
      where: { userId: req.session.user.id },
      include: [{ model: User, as: 'user' }],
    });

    console.log(deliveryData); // Check the retrieved data in the console

    const formattedDeliveryData = deliveryData.map(item => item.get({ plain: true }));
    console.log(formattedDeliveryData); // Check the formatted data in the console

    res.render('dashboard', { deliveryData: formattedDeliveryData });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: error.message });
  }
});


// Route for rendering the update POD form
router.get('/edit_pod/:id', withAuth, async (req, res) => {
  try {
    const podId = req.params.id;
    const podData = await Pod.findByPk(podId);
    const formattedPodData = podData.get({ plain: true });
    res.render('edit_pod', { podData: formattedPodData });
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred while rendering the update form' });
  }
});


// Route for handling the update POD form submission
router.post('/update_pod/:id', withAuth, async (req, res) => {
  try {
    const podId = req.params.id;
    const { date, client, description } = req.body;
    await Pod.update({ date, client, description }, { where: { id: podId } });
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred while updating the POD entry' });
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
    console.log('Creating POD:', { date, client, description, userId: req.session.user.id }); // Add this line
    await Pod.create({ date, client, description, userId: req.session.user.id });
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred while creating a new POD entry' });
  }
});


// Route for deleting a POD entry
router.get('/delete_pod/:id', withAuth, async (req, res) => {
  try {
    const podId = req.params.id;
    await Pod.destroy({ where: { id: podId } });
    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
    res.status(500).render('error', { error: 'An error occurred while deleting the POD' });
  }
});


// Route for handling user logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.render('logout', { isLogoutPage: true }); 
  });
});


// Route for the root URL ("/")
router.get('/', (req, res) => {
  res.redirect('/login');
});

module.exports = router;
