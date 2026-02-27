const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/page.tsx';
let txt = fs.readFileSync(p, 'utf8');

txt = txt.replace(
  '<section className="landing-hero">',
  '<section className="landing-hero-track relative h-auto md:h-[250vh]"><div className="landing-hero sticky top-0 h-[100svh] w-full">'
);

txt = txt.replace(
  '</section>\n\n      <section className="landing-content-wrapper">',
  '</div></section>\n\n      <section className="landing-content-wrapper">'
);

// Apply similar fix to en/page.tsx
const pen = '/Users/hector/projects/hector-services-site/app/en/page.tsx';
let txtEn = fs.readFileSync(pen, 'utf8');

txtEn = txtEn.replace(
  '<section className="landing-hero">',
  '<section className="landing-hero-track relative h-auto md:h-[250vh]"><div className="landing-hero sticky top-0 h-[100svh] w-full">'
);

txtEn = txtEn.replace(
  '</section>\n\n      <section className="landing-content-wrapper">',
  '</div></section>\n\n      <section className="landing-content-wrapper">'
);

fs.writeFileSync(p, txt);
fs.writeFileSync(pen, txtEn);

