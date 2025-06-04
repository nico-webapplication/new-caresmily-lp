#!/usr/bin/env node

const { exec } = require('child_process');

// Set environment variables
process.env.PORT = '5000';
process.env.HOSTNAME = '0.0.0.0';

console.log('Starting Next.js on port 5000...');

// Start Next.js with proper configuration
const server = exec('npx next dev -p 5000 -H 0.0.0.0', {
  env: process.env,
  cwd: process.cwd()
});

server.stdout.on('data', (data) => {
  process.stdout.write(data);
});

server.stderr.on('data', (data) => {
  process.stderr.write(data);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  server.kill('SIGTERM');
});