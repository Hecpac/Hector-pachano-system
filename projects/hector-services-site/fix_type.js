const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace(
  "const screenTitle = stage.querySelector('.landing-computer__screen-title')",
  "const screenTitle = stage.querySelector('.landing-computer__screen-title') as HTMLElement"
);
txt = txt.replace(
  "const screenMetric = stage.querySelector('.landing-computer__screen-metric')",
  "const screenMetric = stage.querySelector('.landing-computer__screen-metric') as HTMLElement"
);
txt = txt.replace(
  "const screenStatus = stage.querySelector('.landing-computer__screen-status')",
  "const screenStatus = stage.querySelector('.landing-computer__screen-status') as HTMLElement"
);
txt = txt.replace(
  "const spans = screenTitle.querySelectorAll('span')",
  "const spans = screenTitle.querySelectorAll('span') as NodeListOf<HTMLElement>"
);
fs.writeFileSync(p, txt);
