// routes/send_email.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { isSignedin, isAuthenticated } = require('../controller/auth');
const { sendEmail } = require('../controller/send_email');

// Post route for sending email
router.post(
  '/sendEmail',
  [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('phone').isLength({ min: 10 }).withMessage('Phone number must be at least 10 digits'),
    check('details').isLength({ min: 5 }).withMessage('Message should be at least 5 characters'),
  ],
  sendEmail
);

module.exports = router;
