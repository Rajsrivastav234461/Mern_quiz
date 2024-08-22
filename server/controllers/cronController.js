const User = require('../models/User');
const nodemailer = require('nodemailer');

// Function to evaluate the tests and send emails
exports.evaluateTests = async (req, res) => {
    try {
         const users = await User.find();  

        users.forEach(async (user) => {
             const score = calculateScore(user); // Implement this function

             await sendEmail(user.email, score);
        });

        res.status(200).json({ message: 'Tests evaluated and emails sent' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

 const sendEmail = async (email, score) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,  
            pass: process.env.EMAIL_PASS,  
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Test Score',
        text: `Your test score is: ${score}`,
    };

    await transporter.sendMail(mailOptions);
};

 const calculateScore = (user) => {
     return Math.floor(Math.random() * 100);
};
