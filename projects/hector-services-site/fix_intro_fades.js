const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let txt = fs.readFileSync(p, 'utf8');

const fadeCode = `
      const fadeStart = 0.84
      const opacity = 1 - clamp((zoomProgress - fadeStart) / (1 - fadeStart), 0, 1)

      computer.style.opacity = opacity.toFixed(3)
      computer.style.transform = \`translate3d(\${panX.toFixed(2)}px, \${panY.toFixed(2)}px, 0) rotateX(\${rotateX.toFixed(2)}deg) rotateY(\${rotateY.toFixed(2)}deg) scale(\${scale.toFixed(4)})\`

      // Fade out the surrounding hero text early in the zoom
      const contentText = document.querySelector('.landing-hero__content') as HTMLElement
      const bottomActions = document.querySelector('.landing-hero__bottom') as HTMLElement
      if (contentText && bottomActions) {
        // Fade them out between 10% and 40% zoom progress
        const textOpacity = 1 - clamp((zoomProgress - 0.1) / 0.3, 0, 1)
        contentText.style.opacity = textOpacity.toFixed(3)
        bottomActions.style.opacity = textOpacity.toFixed(3)
        
        // Also fade out the background glow and vignette
        const bgElements = document.querySelectorAll('.landing-hero__vignette, .landing-hero__bg-glow, .landing-hero__grain')
        bgElements.forEach(el => {
            (el as HTMLElement).style.opacity = textOpacity.toFixed(3)
        })
      }
`;

txt = txt.replace(
  `      const fadeStart = 0.84
      const opacity = 1 - clamp((zoomProgress - fadeStart) / (1 - fadeStart), 0, 1)

      computer.style.opacity = opacity.toFixed(3)
      computer.style.transform = \`translate3d(\${panX.toFixed(2)}px, \${panY.toFixed(2)}px, 0) rotateX(\${rotateX.toFixed(2)}deg) rotateY(\${rotateY.toFixed(2)}deg) scale(\${scale.toFixed(4)})\``,
  fadeCode
);

fs.writeFileSync(p, txt);
