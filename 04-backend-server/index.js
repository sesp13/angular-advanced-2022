require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { request, response } = require('express');
const { dbConnection } = require('./db/config');

// Create server
const app = express();

// Config cors
app.use(cors());

// Read and body parse
app.use(express.json());

// routes
app.get('/', (req = request, res = response) => {
  res.status(200).json({ ok: true, msg: 'Hello world' });
});
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/hospital', require('./routes/hospital.routes'));

// Turn on server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  dbConnection();
});
