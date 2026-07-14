const { execSync } = require('child_process');
try {
  execSync('npx tsc --noEmit', { stdio: 'inherit' });
  console.log('TS compiled successfully');
} catch(e) {
  process.exit(1);
}
