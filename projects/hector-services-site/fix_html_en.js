const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/en/page.tsx';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace(
  "        </Parallax>\n      </div></div></section>",
  "        </Parallax>\n      </div>\n    </section>"
);
fs.writeFileSync(p, txt);
