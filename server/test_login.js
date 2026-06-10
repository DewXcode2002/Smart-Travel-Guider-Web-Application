const fetch = require('node-fetch'); // Wait, node-fetch might not be available or CommonJS issues

// I'll use simple http module
const http = require('http');

const data = JSON.stringify({
    email: 'admin@travelguider.com',
    password: 'admin123'
});

const options = {
    hostname: 'localhost',
    port: 5001,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('Body:', body);
    });
});

req.on('error', (e) => {
    console.error('Problem with request:', e.message);
});

req.write(data);
req.end();
