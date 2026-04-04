const fs = require("fs");

const required = [
  "dist/index.html",
  "dist/game.js",
  "dist/styles.css"
];

let ok = true;
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing ${file}`);
    ok = false;
  }
}

if (ok) {
  console.log("smoke test ok");
}

process.exit(ok ? 0 : 1);
