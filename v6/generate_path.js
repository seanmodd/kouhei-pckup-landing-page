const TextToSVG = require('text-to-svg');
const fontPath = '/System/Library/Fonts/SFNSMono.ttf'; 
try {
  const textToSVG = TextToSVG.loadSync(fontPath);
  const attributes = { fill: 'transparent', stroke: '#F14108', 'stroke-width': '1' };
  const options = {x: 130, y: 245, fontSize: 13, anchor: 'top middle', attributes: attributes}; // Reduced font size slightly to fit width
  
  const d = textToSVG.getD('Powered by Senpex', options);
  
  console.log("PATH_D_OUTPUT_START");
  console.log(d);
  console.log("PATH_D_OUTPUT_END");
} catch(e) {
  console.error("Error loading font:", e);
}
