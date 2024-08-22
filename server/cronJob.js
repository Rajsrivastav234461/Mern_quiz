const cron = require('node-cron');
const nodemailer = require('nodemailer');
const { evaluateTests } = require('./controllers/cronController'); // Implement this controller

// Configure email service
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can choose your email service provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Cron job to evaluate tests every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running cron job to evaluate tests');
  try {
    const results = await evaluateTests();
    results.forEach(result => {
      // Send email with the score to the user
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: result.email,
        subject: 'Your Test Score',
        text: `Hello, your score is ${result.score}.`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
    });
  } catch (error) {
    console.log('Error in cron job:', error.message);
  }
});
