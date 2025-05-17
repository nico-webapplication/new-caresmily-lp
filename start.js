// Simple script to start the server and forward ports
const { spawn } = require('child_process');
const server = spawn('node', ['server.js']);

server.stdout.on('data', (data) => {
  console.log(`${data}`);
});

server.stderr.on('data', (data) => {
  console.error(`${data}`);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});