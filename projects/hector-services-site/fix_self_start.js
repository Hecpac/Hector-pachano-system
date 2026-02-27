const fs = require('fs');

function revert(p) {
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(
    'className="landing-hero__content self-start"',
    'className="landing-hero__content"'
  );
  fs.writeFileSync(p, txt);
}

revert('/Users/hector/projects/hector-services-site/app/page.tsx');
revert('/Users/hector/projects/hector-services-site/app/en/page.tsx');
