const fs = require('fs');
const paper = require('paper');

const SVG_PATH = fs.readFileSync('tasa_path_fixed.txt', 'utf8').trim();

paper.setup(new paper.Size(1000, 1000));

try {
  // Create path item directly from pathData
  const path = new paper.CompoundPath(SVG_PATH);
  
  // Union the overlapping paths
  const united = path.unite();
  
  // Export back to SVG path data string
  let resultPath = '';
  if (united instanceof paper.CompoundPath || united instanceof paper.Path) {
    resultPath = united.exportSVG().getAttribute('d');
  } else {
    united.children.forEach(c => {
      if (c.exportSVG) resultPath += c.exportSVG().getAttribute('d');
    });
  }
  
  fs.writeFileSync('tasa_path_fixed_united.txt', resultPath);
  console.log("United path saved to tasa_path_fixed_united.txt.");
} catch(e) {
  console.error("Error during path processing:", e);
}
