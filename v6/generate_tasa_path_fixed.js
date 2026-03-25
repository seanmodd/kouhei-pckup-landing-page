const TextToSVG = require('text-to-svg');
const fontPath = './TASA_Orbiter_700.ttf'; 

try {
  const textToSVG = TextToSVG.loadSync(fontPath);
  const attributes = { fill: 'transparent', stroke: '#F14108', 'stroke-width': '1' };
  
  // Calculate text dimensions first to center it precisely underneath the P logo at x=130
  const fontSize = 15;
  const metrics = textToSVG.getMetrics('Powered by Senpex', { fontSize: fontSize });
  const textWidth = metrics.width;
  
  const options = {
    x: 130 - (textWidth / 2), 
    y: 235, 
    fontSize: fontSize, 
    anchor: 'top left', // Use top left and precise X coordinate
    attributes: attributes
  }; 
  
  const d = textToSVG.getD('Powered by Senpex', options);
  
  const fs = require('fs');
  fs.writeFileSync('tasa_path_fixed.txt', d);
  console.log("Successfully wrote recentered TASA Orbiter path to tasa_path_fixed.txt");
  
} catch(e) {
  console.error("Error loading font:", e);
}
