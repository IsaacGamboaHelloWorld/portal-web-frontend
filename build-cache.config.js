const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const files = {
  css: 'styles.css',
  main: 'main.js',
  scripts: 'scripts.js',
  runtime: 'runtime.js'
};

const packageJson = require('./package.json');
const rootDir = path.resolve(__dirname, './');
const buildDir = path.join(rootDir, 'dist');
const swPath = path.join(buildDir, 'ngsw.json');
const indexPath = path.join(buildDir, 'index.html');

const cssPath = path.join(buildDir, files.css);
const cssNewFileName = `styles.${packageJson.version}.css`;
const cssNewPath = path.join(buildDir, cssNewFileName);

const jsMainPath = path.join(buildDir, files.main);
const jsMainNewFileName = `main.${packageJson.version}.js`;
const jsMainNewPath = path.join(buildDir, jsMainNewFileName);

const jsScriptsPath = path.join(buildDir, files.scripts);
const jsScriptsNewFileName = `scripts.${packageJson.version}.js`;
const jsScriptsNewPath = path.join(buildDir, jsScriptsNewFileName);

const jsRuntimePath = path.join(buildDir, files.runtime);
const jsRuntimeNewFileName = `runtime.${packageJson.version}.js`;
const jsRuntimeNewPath = path.join(buildDir, jsRuntimeNewFileName);

fs.renameSync(cssPath, cssNewPath);
fs.renameSync(jsMainPath, jsMainNewPath);
fs.renameSync(jsScriptsPath, jsScriptsNewPath);
fs.renameSync(jsRuntimePath, jsRuntimeNewPath);

const $ = cheerio.load(fs.readFileSync(indexPath, 'utf-8'));

$("head link[href='styles.css']").attr('href', cssNewFileName);
$("body script[src='main.js']").attr('src', jsMainNewFileName);
$("body script[src='scripts.js']").attr('src', jsScriptsNewFileName);
$("body script[src='runtime.js']").attr('src', jsRuntimeNewFileName);

fs.writeFileSync(indexPath, $.html());

fs.readFile(swPath, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  
  let result = data.replace(/styles.css/g, cssNewFileName);
  result = result.replace(/main.js/g, jsMainNewFileName);
  result = result.replace(/runtime.js/g, jsRuntimeNewFileName);
  result = result.replace(/scripts.js/g, jsScriptsNewFileName);
  
  let newResult = JSON.parse(result);
  
  newResult.hashTable[`/${cssNewFileName}`] = `${newResult.hashTable[`/${cssNewFileName}`]}-${packageJson.version}`;
  newResult.hashTable[`/${jsMainNewFileName}`] = `${newResult.hashTable[`/${jsMainNewFileName}`]}-${packageJson.version}`;
  newResult.hashTable[`/${jsRuntimeNewFileName}`] = `${newResult.hashTable[`/${jsRuntimeNewFileName}`]}-${packageJson.version}`;
  newResult.hashTable[`/${jsScriptsNewFileName}`] = `${newResult.hashTable[`/${jsScriptsNewFileName}`]}-${packageJson.version}`;

  fs.writeFile(swPath, JSON.stringify(newResult), 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
