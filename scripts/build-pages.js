import fs from 'fs';
import path from 'path';

const distDir = path.resolve('client/dist');
const docsDir = path.resolve('docs');

if (!fs.existsSync(distDir)) {
  console.error('client/dist does not exist. Run client build first.');
  process.exit(1);
}

if (fs.existsSync(docsDir)) {
  fs.rmSync(docsDir, { recursive: true, force: true });
}

fs.cpSync(distDir, docsDir, { recursive: true });
fs.copyFileSync(path.join(docsDir, 'index.html'), path.join(docsDir, '404.html'));
fs.writeFileSync(path.join(docsDir, '.nojekyll'), '');

// Also sync directly to repository root for default GitHub Pages root deployment
fs.copyFileSync(path.join(docsDir, 'index.html'), path.resolve('index.html'));
fs.copyFileSync(path.join(docsDir, '404.html'), path.resolve('404.html'));
fs.writeFileSync(path.resolve('.nojekyll'), '');
if (fs.existsSync(path.resolve('assets'))) {
  fs.rmSync(path.resolve('assets'), { recursive: true, force: true });
}
fs.cpSync(path.join(docsDir, 'assets'), path.resolve('assets'), { recursive: true });

console.log('✨ Successfully synced client/dist to docs/ and root with 404.html and .nojekyll for GitHub Pages!');
