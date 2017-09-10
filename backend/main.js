let express = require('express');
let mysql = require('mysql');
let multer = require('multer');
let cors = require('cors');
let fs = require('fs');
let http = require('http');
let path = require('path');

const app = express();

// Point static path to dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));