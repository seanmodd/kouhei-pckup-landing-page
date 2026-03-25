const { writeFileSync } = require('fs');
// This is a simple script to generate an SVG path for the text "Powered by Senpex"
// We'll use a basic svg structure that we can later embed into the preloader
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 50">
  <text x="130" y="35" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="none" stroke="#F14108" stroke-width="1" text-anchor="middle" id="senpex-text">
    Powered by Senpex
  </text>
</svg>`;
writeFileSync('senpex_text.svg', svgContent);
console.log('Created senpex_text.svg');
