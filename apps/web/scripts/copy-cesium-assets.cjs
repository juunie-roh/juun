// Copies only the Cesium CSS files needed for the viewer widget styles.
// The rest of Cesium is loaded from CDN at runtime via CESIUM_BASE_URL.
const fs = require("fs");
const path = require("path");

const cesiumWidgetsPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "cesium",
  "Build",
  "Cesium",
  "Widgets",
);
const destPath = path.join(__dirname, "..", "public", "cesium", "Widgets");

const files = ["widgets.css", "lighter.css"];

fs.mkdirSync(destPath, { recursive: true });

for (const file of files) {
  const src = path.join(cesiumWidgetsPath, file);
  const dest = path.join(destPath, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${file} → public/cesium/Widgets/${file}`);
}
