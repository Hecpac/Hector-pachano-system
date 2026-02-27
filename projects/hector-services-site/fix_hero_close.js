const fs = require('fs');

function fix(p) {
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(
    /<\/section>\s*<div className="landing-content-wrapper">/g,
    '</div></section>\n\n      <div className="landing-content-wrapper">'
  );
  txt = txt.replace(
    /<\/section>\s*<section className="landing-content-wrapper">/g,
    '</div></section>\n\n      <section className="landing-content-wrapper">'
  );
  fs.writeFileSync(p, txt);
}

fix('/Users/hector/projects/hector-services-site/app/page.tsx');
fix('/Users/hector/projects/hector-services-site/app/en/page.tsx');
