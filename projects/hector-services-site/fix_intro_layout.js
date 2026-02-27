const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/components/sections/hero-monitor-intro.tsx';
let txt = fs.readFileSync(p, 'utf8');

txt = txt.replace(
  'className="landing-hero__computer-stage landing-hero__computer-stage--intro relative h-[300vh]"',
  'className="landing-hero__computer-stage landing-hero__computer-stage--intro"'
);

txt = txt.replace(
  '<div className="landing-hero__computer-stage-inner sticky top-0 flex h-screen items-center justify-center"',
  '<div className="landing-hero__computer-stage-inner"'
);

txt = txt.replace(
  "track.classList.remove('h-[300vh]')\n      track.style.height = 'auto'\n      stage.classList.remove('h-screen', 'sticky')",
  "// track.classList.remove('h-[300vh]')\n      // track.style.height = 'auto'\n      // stage.classList.remove('h-screen', 'sticky')"
);

txt = txt.replace(
  `    const syncScroll = () => {
      const trackRect = track.getBoundingClientRect()
      const viewportHeight = window.innerHeight || 1
      const travel = Math.max(trackRect.height - viewportHeight, 1)

      zoomProgress = clamp(-trackRect.top / travel, 0, 1)
      applyTransform()
    }`,
  `    const syncScroll = () => {
      // Use window.scrollY for hero tracking since hero is at the top of the page
      const viewportHeight = window.innerHeight || 1
      // Zoom from 0 to 1 over the course of scrolling one viewport height
      zoomProgress = clamp(window.scrollY / viewportHeight, 0, 1)
      applyTransform()
    }`
);

fs.writeFileSync(p, txt);
