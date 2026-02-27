const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let txt = fs.readFileSync(p, 'utf8');

txt = txt.replace(
  `    const applyTransform = () => {
      if (prefersReducedMotion) {
        computer.style.transform = 'scale(1)'
        computer.style.opacity = '1'
        return
      }`,
  `    const applyTransform = () => {
      if (prefersReducedMotion || isMobile) {
        computer.style.transform = 'scale(1)'
        computer.style.opacity = '1'
        return
      }`
);

fs.writeFileSync(p, txt);
