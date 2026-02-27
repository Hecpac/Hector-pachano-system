const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/globals.css';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace(
  ".landing-hero {\n  min-height: 100svh;\n  display: flex;\n  flex-direction: column;\n  padding: 0 40px;\n  position: relative;\n  overflow: hidden;",
  ".landing-hero {\n  min-height: 100svh;\n  display: flex;\n  flex-direction: column;\n  padding: 0 40px;\n  position: relative;\n  overflow: clip;"
);
fs.writeFileSync(p, txt);
