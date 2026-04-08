const fs = require('fs');
const newPath = fs.readFileSync('arial_path.txt', 'utf8').trim();

const preloaderFile = 'app/components/Preloader.tsx';
let content = fs.readFileSync(preloaderFile, 'utf8');

// Find the TEXT_PATH_D definition and replace its value
const searchStringRegex = /const TEXT_PATH_D = "[^"]+";/;
content = content.replace(searchStringRegex, `const TEXT_PATH_D = "${newPath}";`);

fs.writeFileSync(preloaderFile, content);
console.log("Preloader.tsx updated with Arial Bold path.");
