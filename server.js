const path = require('path');
const express = require('express');
const sgMail = require('@sendgrid/mail');
const app = express();

// SendGrid mail API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const port = process.env.PORT || 5000;

app.use('/', express.static(`${__dirname}/client/build`));

app.post('/api/sendContactMail', (req, res) => {
  const msg = {
    to: req.query.to,
    from: req.query.from,
    subject: req.query.subject,
    text: req.query.text,
    html: req.query.html,
  };
  sgMail.send(msg);
  res.send(msg);
})

app.listen(port, () => console.log(`Listening on port ${port}`));
