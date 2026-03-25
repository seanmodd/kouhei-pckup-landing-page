const TextToSVG = require('text-to-svg');
const fontPath = './TASA_Orbiter_400.ttf';

try {
  const textToSVG = TextToSVG.loadSync(fontPath);
  const metrics = textToSVG.getMetrics('Powered by Senpex', { fontSize: 16 });
  const d = textToSVG.getD('Powered by Senpex', { x: 130 - (metrics.width / 2), y: 235, fontSize: 16, anchor: 'top left' });
  const fs = require('fs');
  fs.writeFileSync('tasa_path_400.txt', d);
  console.log("Wrote 400 path to tasa_path_400.txt");

  // Basic check for overlaps: if 'e' has multiple independent self-intersecting loops, the path commands usually will cross.
  // We'll trust our eyes with the next screenshot.
} catch(e) {
  console.error("Error loading font:", e);
}
