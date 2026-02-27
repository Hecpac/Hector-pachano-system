const fs = require('fs');

function revert(p) {
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(
    'className="landing-hero__content sticky top-0 flex flex-col justify-center h-[100svh]"',
    'className="landing-hero__content self-start mt-[10vh]"'
  );
  fs.writeFileSync(p, txt);
}

revert('/Users/hector/projects/hector-services-site/app/page.tsx');
revert('/Users/hector/projects/hector-services-site/app/en/page.tsx');
