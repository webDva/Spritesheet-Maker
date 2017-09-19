let express = require('express');
let mysql = require('mysql');
let multer = require('multer');
let cors = require('cors');
let fs = require('fs');
let path = require('path');
let bodyParser = require('body-parser');
let Spritesmith = require('spritesmith');

// Configuration for multer
const UPLOAD_PATH = './backend/uploads';
const upload = multer({storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${UPLOAD_PATH}/`);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),

    fileFilter: (req, file, cb) => {
        // Skip the file if it's not an image.
        if (!/^image\//.test(file.mimetype)) {
            return cb(null, false);
        }

        cb(null, true);
    }
});

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
    // Add paths of each image so that they can be ran under Spritesmith.
    let images = [];
    req.files.forEach(image => {
        images.push(image.path);
    });

    let padding = Number(req.body.padding);

    Spritesmith.run({src: images, padding: padding}, (err, result) => {
        res.send({'newImage': result.image});
    });

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