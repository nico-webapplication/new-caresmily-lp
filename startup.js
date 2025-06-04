const { spawn } = require('child_process');

// Set the port environment variable
process.env.PORT = '5000';

console.log('Starting Next.js application on port 5000...');

// Start Next.js with the correct port
const nextProcess = spawn('npx', ['next', 'dev', '-p', '5000', '-H', '0.0.0.0'], {
  stdio: 'inherit',
  env: process.env
});

nextProcess.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down...');
  nextProcess.kill('SIGINT');
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  nextProcess.kill('SIGTERM');
});