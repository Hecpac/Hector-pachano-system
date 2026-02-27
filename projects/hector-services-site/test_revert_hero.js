const fs = require('fs');

function revert(p) {
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(
    '<section className="landing-hero-track"><div className="landing-hero sticky top-0 h-[100svh] w-full">',
    '<section className="landing-hero">'
  );
  txt = txt.replace(
    '        </div>\n      </div>\n    </section>',
    '        </div>\n      </section>'
  );
  fs.writeFileSync(p, txt);
}

revert('/Users/hector/projects/hector-services-site/app/page.tsx');
revert('/Users/hector/projects/hector-services-site/app/en/page.tsx');
