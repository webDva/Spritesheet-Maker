let express = require('express');
let mysql = require('mysql');
let multer = require('multer');
let cors = require('cors');
let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser');
let Spritesmith = require('spritesmith');

// Setup
const UPLOAD_PATH = './backend/uploads';
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${UPLOAD_PATH}/`);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
//const upload = multer({storage: storage});
const upload = multer({storage: multer.memoryStorage()});

/*
 * API Server
 */

const app = express();
app.use(cors()); // Needed for file sharing.
// Needed for POST requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || '3000';
app.set('port', port);

// File upload
app.post('/upload', upload.array('files'), (req, res) => {
    let receivedImages = [];
    let imageType = /^image\//;
    req.files.forEach(currentFile => {
        if (imageType.test(currentFile.mimetype)) {
            receivedImages.push(currentFile.path);
        }
    });
    res.send({'yourFreakingFile': req.files[0].buffer});
//    Spritesmith.run({src: receivedImages}, (err, result) => {
//        res.send({'yourFreakingFile': result.image});
//    });
    console.log('receieved files');
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