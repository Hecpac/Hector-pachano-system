const fs = require('fs');

function fix(p) {
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(
    'className="landing-hero-track relative h-auto md:h-[250vh]"',
    'className="landing-hero-track"'
  );
  fs.writeFileSync(p, txt);
}

fix('/Users/hector/projects/hector-services-site/app/page.tsx');
fix('/Users/hector/projects/hector-services-site/app/en/page.tsx');
