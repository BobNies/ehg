const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.use(‘/’, express.static(`${__dirname}/client/build`));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
