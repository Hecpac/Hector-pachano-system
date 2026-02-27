const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let txt = fs.readFileSync(p, 'utf8');

txt = txt.replace(
  `    const syncScroll = () => {
      // Use window.scrollY for hero tracking since hero is at the top of the page
      const viewportHeight = window.innerHeight || 1
      // Zoom from 0 to 1 over the course of scrolling one viewport height
      zoomProgress = clamp(window.scrollY / viewportHeight, 0, 1)
      applyTransform()
    }`,
  `    const syncScroll = () => {
      const heroTrack = document.querySelector('.landing-hero-track') as HTMLElement
      if (!heroTrack) return
      
      const trackRect = heroTrack.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = Math.max(trackRect.height - viewportHeight, 1)
      
      // Calculate how far down the 250vh track we have scrolled
      zoomProgress = clamp(-trackRect.top / travel, 0, 1)
      applyTransform()
    }`
);

fs.writeFileSync(p, txt);
