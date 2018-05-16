const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmail = functions.https.onRequest((request, response) => {
  const mailOptions = {
    from: '"EHG" <whatsthatfunction@gmail.com>',
    to: '"Josh Nies" <whatsthatfunction@gmail.com>'
  };

  mailOptions.subject = 'New Message from EHG Contact Form';
  mailOptions.text = 'This is a developer test.';

  response.send("Sending message...");

  return mailTransport.sendMail(mailOptions)
    .then(() => console.log('New message sent out'))
    .catch((error) => console.error('There was an error while sending the email:', error));
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
