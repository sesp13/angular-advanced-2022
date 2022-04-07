const { response } = require('express');
const { request } = require('express');
const express = require('express');
// Create server
const app = express();

// routes
app.get('/', (req = request, res = response) => {
  res.status(200).json({ ok: true, msg: 'Hello world' });
});

// Turn on server
app.listen(3000, () => {
  console.log(`Server listening on port: ${3000}`);
});
