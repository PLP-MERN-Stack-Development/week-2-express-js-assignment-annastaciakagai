
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const routes = require('./route');
const swaggerDocs = require('./swaggerconfig');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use('/api', routes);

//Initialize Swagger
swaggerDocs(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app; 