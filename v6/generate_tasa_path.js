const TextToSVG = require('text-to-svg');
const fontPath = './TASA_Orbiter_700.ttf'; 

try {
  const textToSVG = TextToSVG.loadSync(fontPath);
  const attributes = { fill: 'transparent', stroke: '#F14108', 'stroke-width': '1' };
  
  // The P logo is approx 130px wide, centered at x=130. 
  // For TASA Orbiter, 16px is a good start. Let's see how wide it makes it.
  const options = {
    x: 130, 
    y: 245, 
    fontSize: 16, 
    anchor: 'top middle', 
    attributes: attributes
  }; 
  
  const d = textToSVG.getD('Powered by Senpex', options);
  
  const fs = require('fs');
  fs.writeFileSync('tasa_path.txt', d);
  console.log("Successfully wrote TASA Orbiter path to tasa_path.txt");
  
} catch(e) {
  console.error("Error loading font:", e);
}
