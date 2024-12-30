// controller/send_email.js
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

exports.sendEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
    });
  }
  console.log("level 1");
  try {
  console.log("level 11");
    const { name, email, phone, details } = req.body;

    // Create reusable transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail', // Use the email service you prefer (e.g., Gmail, SendGrid, etc.)
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or application password
      },
    });
  console.log("level 111" + process.env.EMAIL + process.env.EMAIL_PASSWORD);

    // Email message
    let mailOptions = {
      from: process.env.EMAIL, // Sender's email address
      to: 'sattavaram1akhil@gmail.com', // Receiver's email address
      subject: 'New Message from Contact Form',
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${details}
      `,
    };

  console.log("level 1111");
    // Send email
    await transporter.sendMail(mailOptions);
  console.log("level 11111");
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.log('Error sending email:', err);
    res.status(500).json({ error: 'Error sending email' });
  }
};
