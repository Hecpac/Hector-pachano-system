const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/globals.css';
let txt = fs.readFileSync(p, 'utf8');

const trackCss = `
.landing-hero-track {
  position: relative;
  height: auto;
}
@media (min-width: 981px) {
  .landing-hero-track {
    height: 250vh;
  }
}
`;

txt = txt.replace(
  ".landing-hero {\n  min-height: 100svh;",
  trackCss + "\n.landing-hero {\n  min-height: 100svh;"
);
fs.writeFileSync(p, txt);
