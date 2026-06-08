const fs = require('fs');
const path = require('path');

function findFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(findFiles(file));
    } else { 
      results.push(file);
    }
  });
  return results;
}

const files = findFiles('./src');
files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css') || file.endsWith('.js')) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('https://grainy-gradients.vercel.app/noise.svg')) {
      content = content.replace(/https:\/\/grainy-gradients.vercel.app\/noise\.svg/g, '/noise.svg');
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
    }
  }
});
