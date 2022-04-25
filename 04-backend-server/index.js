require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { request, response } = require('express');
const { dbConnection } = require('./db/config');

// Create server
const app = express();

// Config cors
app.use(cors());

// Read and body parse
app.use(express.json());

// Use of public directory
app.use(express.static('public'));

// routes
app.get('/', (req = request, res = response) => {
  res.status(200).json({ ok: true, msg: 'Hello world' });
});
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/hospital', require('./routes/hospital.routes'));
app.use('/api/doctor', require('./routes/doctor.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/search', require('./routes/search.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));

// Serve SPA
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Turn on server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  dbConnection();
});
