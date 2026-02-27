const fs = require('fs');
const pCss = '/Users/hector/projects/hector-services-site/app/globals.css';
let css = fs.readFileSync(pCss, 'utf8');

css = css.replace(
  `.landing-hero-track {
  position: relative;
  height: auto;
}
@media (min-width: 981px) {
  .landing-hero-track {
    height: 250vh;
  }
}`,
  `.landing-hero-track {
  position: relative;
  height: 250vh;
}`
);

fs.writeFileSync(pCss, css);

const pTsx = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let tsx = fs.readFileSync(pTsx, 'utf8');

tsx = tsx.replace(
  `    const isMobile = window.innerWidth < 980
    const MAX_SCALE = prefersReducedMotion || isMobile ? 1 : 80

    if (isMobile) {
      // track.classList.remove('h-[300vh]')
      // track.style.height = 'auto'
      // stage.classList.remove('h-screen', 'sticky')
      stage.style.height = 'auto'
      stage.style.position = 'relative'
    }`,
  `    const MAX_SCALE = prefersReducedMotion ? 1 : 80`
);

tsx = tsx.replace(
  `    const applyTransform = () => {
      if (prefersReducedMotion || isMobile) {
        computer.style.transform = 'scale(1)'
        computer.style.opacity = '1'
        return
      }`,
  `    const applyTransform = () => {
      if (prefersReducedMotion) {
        computer.style.transform = 'scale(1)'
        computer.style.opacity = '1'
        return
      }`
);

fs.writeFileSync(pTsx, tsx);
