const assert = require("node:assert/strict");
const test = require("node:test");

test("build produces a dist folder with core files", async () => {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const root = path.resolve(__dirname, "..");
  const dist = path.join(root, "dist");

  await assert.doesNotReject(async () => {
    await fs.access(dist);
  });

  const requiredFiles = ["index.html", "styles.css", "game.js"];
  for (const file of requiredFiles) {
    await assert.doesNotReject(async () => {
      await fs.access(path.join(dist, file));
    });
  }
});
