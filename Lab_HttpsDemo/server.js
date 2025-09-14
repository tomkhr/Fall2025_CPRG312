const express = require('express');
const fs = require('fs');

// Create HTTP server

const http = require('http');
const http_app = express();     // creating express app from http (Non-secure) server
const http_port = 3000;


http_app.get('/', (req, res) => {
    console.log('HTTP get');
    res.send(
        '<h1>Hello from an un-secured server</h1><h2 style="color:red;">!!!! AAHHHhhh !!!</h2>'
    );
});

http.createServer(http_app).listen(http_port, () => {
    console.log(`http server is running on port ${http_port}`);
});


// Creating HTTPS server
const https = require('https');
const https_app = express();
const https_port = 3001;
const path = require('path');

https_app.get('/', (req,res) => {
    console.log("Https get");
    res.send(
        '<h1>Hello from sercured server</h1><h2 style="color:green;">Thank god!!!!</h2>'
    );
});

const options = {
    key: fs.readFileSync(path.join(__dirname,'cert/private-key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert/certificate.pem')),
};

try {
    https.createServer(options, https_app).listen(https_port, () => {
        console.log(`https server is running on port ${https_port}`);
    })
}catch(error) {
    console.log(error);
}