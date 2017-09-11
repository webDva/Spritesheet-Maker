let express = require('express');
let mysql = require('mysql');
let multer = require('multer');
let cors = require('cors');
let fs = require('fs');
let path = require('path');

// Setup
const UPLOAD_PATH = './backend/uploads';
const upload = multer({dest: `${UPLOAD_PATH}/`});

/*
 * API Server
 */

const app = express();
app.use(cors()); // Needed for file sharing.

const port = process.env.PORT || '3000';
app.set('port', port);

// File upload
app.post('/upload', upload.single('file'), (req, res) => {
    res.send(req.file);
    console.log('receieved a file');
});

/*
 * HTTP Server
 */

// Point static path to dist
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Catch all other routes and return the index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Start the HTTP server.
app.listen(port, (errorThatOccurs) => {
    if (errorThatOccurs) {
        return console.log('Something bad happened.', errorThatOccurs);
    }

    console.log(`Server running on localhost:${port}`);
});