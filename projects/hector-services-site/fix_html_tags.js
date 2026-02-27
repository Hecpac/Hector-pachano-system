const fs = require('fs');

function fix(p) {
  let txt = fs.readFileSync(p, 'utf8');
  txt = txt.replace(
    '        </Parallax>\n      </div>\n    </section>',
    '        </Parallax>\n    </section>'
  );
  fs.writeFileSync(p, txt);
}

fix('/Users/hector/projects/hector-services-site/app/en/page.tsx');
