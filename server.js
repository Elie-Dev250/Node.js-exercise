const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

// Simple in-memory user database for demo purposes
let users = []; // Stores user data (username and password)

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/login') {
    serveFile(res, './login.html');
  } else if (req.url === '/signup') {
    serveFile(res, './signup.html');
  } else if (req.url === '/login' && req.method === 'POST') {
    handleLogin(req, res);
  } else if (req.url === '/signup' && req.method === 'POST') {
    handleSignup(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 - Page Not Found');
  }
});

function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Error loading file.');
    } else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
}

function handleLogin(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, password } = querystring.parse(body);

    // Check if user exists and password matches
    const user = users.find(u => u.username === username);
    if (user && user.password === password) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(`<h1>Welcome, ${username}!</h1>`);
    } else {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Invalid username or password</h1>');
    }
  });
}

function handleSignup(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const { username, password } = querystring.parse(body);

    // Check if the username already exists
    if (users.some(u => u.username === username)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Username already exists! Please choose another one.</h1>');
    } else {
      // Save the new user
      users.push({ username, password });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Account created successfully! <a href="/login">Login here</a></h1>');
    }
  });
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
