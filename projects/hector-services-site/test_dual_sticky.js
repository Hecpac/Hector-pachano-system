const fs = require('fs');

function build(p) {
  let txt = fs.readFileSync(p, 'utf8');
  
  // Make the text container sticky and viewport height
  txt = txt.replace(
    'className="landing-hero__content"',
    'className="landing-hero__content sticky top-0 flex flex-col justify-center h-[100svh]"'
  );
  
  // Make the bottom actions sticky? 
  // Wait, bottom actions are in a separate Parallax outside the grid.
  // The grid is 250vh. The actions will be below it.
  
  fs.writeFileSync(p, txt);
}

build('/Users/hector/projects/hector-services-site/app/page.tsx');
build('/Users/hector/projects/hector-services-site/app/en/page.tsx');
