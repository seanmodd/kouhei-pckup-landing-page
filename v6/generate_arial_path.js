const TextToSVG = require('text-to-svg');
const fontPath = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'; 

try {
  const textToSVG = TextToSVG.loadSync(fontPath);
  const attributes = { fill: 'transparent', stroke: '#F14108', 'stroke-width': '1' };
  
  // The P logo is approx 130px wide, centered at x=130. 
  // We want the text to be reasonably sized under it.
  const options = {
    x: 130, 
    y: 245, 
    fontSize: 16, // Proportional font will look bigger than monospaced, 16px is a good guess
    anchor: 'top middle', 
    attributes: attributes
  }; 
  
  const d = textToSVG.getD('Powered by Senpex', options);
  
  const fs = require('fs');
  fs.writeFileSync('arial_path.txt', d);
  console.log("Successfully wrote path to arial_path.txt");
  
} catch(e) {
  console.error("Error loading font:", e);
}
