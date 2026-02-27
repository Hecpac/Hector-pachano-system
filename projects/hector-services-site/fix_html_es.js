const fs = require('fs');
const p = '/Users/hector/projects/hector-services-site/app/page.tsx';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace(
  "        </div>\n      </div></section>",
  "        </div>\n      </div>\n    </section>"
);
fs.writeFileSync(p, txt);
