const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/en/page.tsx';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace("INP < 200ms · LCP < 2.5s", "INP &lt; 200ms · LCP &lt; 2.5s");
fs.writeFileSync(p, txt);
