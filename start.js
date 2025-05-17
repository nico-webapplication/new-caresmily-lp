const { spawn } = require('child_process');

console.log('Starting Next.js application on port 5000...');
const nextProcess = spawn('npx', ['next', 'dev', '-p', '5000'], {
  stdio: 'inherit',
  shell: true
});

nextProcess.on('error', (error) => {
  console.error('Failed to start Next.js process:', error);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Shutting down...');
  nextProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM. Shutting down...');
  nextProcess.kill('SIGTERM');
  process.exit(0);
});