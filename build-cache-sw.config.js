const fs = require('fs');
const path = require('path');

const packageJson = require('./package.json');
const rootDir = path.resolve(__dirname, './');
const buildDir = path.join(rootDir, 'dist');
const swPath = path.join(buildDir, 'pb-sw.js');

fs.readFile(swPath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  
  let result = data.replace(/static-v./g, 'static-v.' + packageJson.version);
  
  fs.writeFile(swPath, result, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
