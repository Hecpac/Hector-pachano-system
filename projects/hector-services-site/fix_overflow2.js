const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/globals.css';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace(
  "  overflow: clip;",
  "  overflow-x: clip;\n  overflow-y: visible;"
);
fs.writeFileSync(p, txt);
