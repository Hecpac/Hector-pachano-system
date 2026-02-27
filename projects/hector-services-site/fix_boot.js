const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let txt = fs.readFileSync(p, 'utf8');

const oldCode = `          // Typewriter effect on spans
          const spans = screenTitle.querySelectorAll('span') as NodeListOf<HTMLElement>
          spans.forEach((span, i) => {
            span.style.opacity = '0'
            span.style.transform = 'translateY(4px)'
            span.style.transition = 'opacity 0.1s ease, transform 0.1s ease'
            setTimeout(() => {
              span.style.opacity = '1'
              span.style.transform = 'translateY(0)'
            }, 300 + (i * 200))
          })`;

const newCode = `          // Let CSS animations handle the spans, just make the container visible
          screenTitle.style.transition = 'opacity 0.1s ease'
          screenTitle.style.opacity = '1'`;

if(txt.includes(oldCode)) {
  txt = txt.replace(oldCode, newCode);
  fs.writeFileSync(p, txt);
  console.log("Fixed!");
} else {
  console.log("oldCode not found!");
}
