const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let txt = fs.readFileSync(p, 'utf8');

txt = txt.replace(
  'className="landing-hero__computer-stage landing-hero__computer-stage--intro"',
  'className="landing-hero__computer-stage landing-hero__computer-stage--intro relative h-[250vh]"'
);

txt = txt.replace(
  '<div className="landing-hero__computer-stage-inner"',
  '<div className="landing-hero__computer-stage-inner sticky top-0 flex h-[100svh] items-center justify-center"'
);

// In syncScroll
txt = txt.replace(
  `    const syncScroll = () => {
      const heroTrack = document.querySelector('.landing-hero-track') as HTMLElement
      if (!heroTrack) return
      
      const trackRect = heroTrack.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = Math.max(trackRect.height - viewportHeight, 1)
      
      // Calculate how far down the 250vh track we have scrolled
      zoomProgress = clamp(-trackRect.top / travel, 0, 1)
      applyTransform()
    }`,
  `    const syncScroll = () => {
      const trackRect = track.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = Math.max(trackRect.height - viewportHeight, 1)
      
      // Calculate how far down the 250vh track we have scrolled
      zoomProgress = clamp(-trackRect.top / travel, 0, 1)
      applyTransform()
    }`
);

// Remove the fade logic that expects .landing-hero__content
const fadeCode = `
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
txt = txt.replace(fadeCode, '');

fs.writeFileSync(p, txt);
