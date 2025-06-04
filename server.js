
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const routes = require('./route');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; 