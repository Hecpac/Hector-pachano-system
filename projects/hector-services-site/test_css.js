const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/globals.css';
let txt = fs.readFileSync(p, 'utf8');

txt = txt.replace(
  `.landing-hero-track {
  position: relative;
  height: 250vh;
}
.landing-hero {
  min-height: 100svh;
  display: flex;`,
  `.landing-hero {
  min-height: 100svh;
  display: flex;`
);

fs.writeFileSync(p, txt);
