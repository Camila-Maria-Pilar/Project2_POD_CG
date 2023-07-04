const express = require('express');
const router = express.Router();

//  route for rendering the login page
router.get('/login', (req, res) => {
  res.render('login');
});

//  route for rendering the dashboard page
router.get('/dashboard', (req, res) => {

  // TODO: get data from db

  // TODO:  pass data to render 
  res.render('dashboard');
});

//  route for rendering the create POD page
router.get('/create_pod', (req, res) => {
  res.render('create_pod');
});

//  route for rendering the logout page
router.get('/logout', (req, res) => {
  res.render('logout');
});

//  API route for handling form submission
router.post('/submit_form', (req, res) => {
  // Process the form data and perform necessary actions
 

  // Redirect or render a response
  res.redirect('/dashboard');
});

module.exports = router;
