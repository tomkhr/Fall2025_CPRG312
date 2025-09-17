const express = require('express');
const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');   // cross origin resource sharing.

const app = express();
const port = 3000;
const frontendUrl = "http://localhost:5173";

app.use(cors({
    origin: frontendUrl,
}));

app.use(express.static('public', {
    setHeaders: (res, path) => {
        if(path.endsWith('.css')) {
            res.set('Cache-Control', 'max-age=60, immutable');
        }
        if(path.endsWith('.jpg') || path.endsWith('png')) {
            const fileContent = fs.readFileSync(path);
            const eTag = crypto.createHash('sha256').update(fileContent).digest('hex');
            res.set('Etag', eTag);
            res.set('Cache-Control', "max-age=180, immutable");
        }
    }
}));

app.get('/', (req,res) => {
    console.log('Home Route');
    res.type('text/json');
    res.setHeader('Cache-Control', 'max-age=10, public');
    res.json({
        success: true,
        heading: 'Caching Demo',
        body: [
            {
                key: 1,
                val: "This page and its assets are serverd with cache control header"
            },
            {
                key: 2,
                val: "Open network tab in developer tool to see cache control header"
            }
        ],
        img: {
            url: 'http://localhost:3000/images/img1.png',
            alt: "Test image for caching behavior"
        }
    });
});


http.createServer(app).listen(port, () => {
    console.log(`server is running on port: ${port}`);
});