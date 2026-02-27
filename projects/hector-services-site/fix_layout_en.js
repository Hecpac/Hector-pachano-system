const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/en/page.tsx';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace(
  '<Parallax speed={0.4} relativeTo="scroll" className="landing-hero__content" zIndex={2}>',
  '<Parallax speed={0.4} relativeTo="scroll" className="landing-hero__content self-start" zIndex={2}>'
);
fs.writeFileSync(p, txt);
