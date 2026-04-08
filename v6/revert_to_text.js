const fs = require('fs');

const file = 'app/components/Preloader.tsx';
let content = fs.readFileSync(file, 'utf8');

// The file has a complex GSAP timeline involving textObjRef and textFillRef.
// I will just replace the exact <path> tags with <text> tags.

const pathRegex = /<path\s+ref=\{textObjRef\}(?:[^>]*|\n)*\/>/g;
const pathFillRegex = /<path\s+ref=\{textFillRef\}(?:[^>]*|\n)*\/>/g;

const textTag = `<text
          ref={textObjRef}
          x="130"
          y="250"
          fontFamily="var(--font-tasa-orbiter)"
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
          fill="transparent"
          stroke="#F14108"
          strokeWidth="0.8"
          style={{ letterSpacing: '0.02em' }}
        >
          Powered by Senpex
        </text>`;

const textFillTag = `<text
          ref={textFillRef}
          x="130"
          y="250"
          fontFamily="var(--font-tasa-orbiter)"
          fontSize="18"
          fontWeight="600"
          textAnchor="middle"
          fill="#F14108"
          stroke="none"
          style={{ opacity: 0, letterSpacing: '0.02em' }}
        >
          Powered by Senpex
        </text>`;

content = content.replace(pathRegex, textTag);
content = content.replace(pathFillRegex, textFillTag);

// We need to change the refs from SVGPathElement to SVGTextElement
content = content.replace(/useRef<SVGPathElement>/g, 'useRef<SVGTextElement>');

// And we must replace the length calculations that were hardcoded or inflated 
const lengthFix = `
    const textObj = textObjRef.current;
    const textFill = textFillRef.current;
    if (textObj) {
      // Just hardcode a large enough dasharray for smooth sweeping over entire text width
      textObj.style.strokeDasharray = "1000";
      textObj.style.strokeDashoffset = "1000";
    }
`;

// Replace the older path calculations:
const oldCalcRegex = /\/\/ Get the total length of the text path.*?(?=const tl = gsap\.timeline)/s;
content = content.replace(oldCalcRegex, lengthFix + '\n    ');

// For the GSAP timeline text animation, we need to animate it to offset 0 duration 2.
// The old code:
// .to(textObj, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, "<")

fs.writeFileSync(file, content);
console.log("Reverted to SVG text!");
