// copy-cesium-assets.js
const fs = require("fs-extra");
const path = require("path");

// Path to node_modules cesium package
const cesiumPackagePath = path.join(__dirname, "..", "node_modules", "cesium");
// Destination in public folder
const cesiumPublicPath = path.join(__dirname, "..", "public", "cesium");

async function copyCesiumAssets() {
  console.log("Copying Cesium assets to public directory...");

  try {
    // Check if the destination exists
    if (fs.existsSync(cesiumPublicPath)) {
      console.log("Removing existing cesium directory or symlink...");
      // Remove it regardless of what it is (file, symlink, or directory)
      await fs.remove(cesiumPublicPath);
    }

    // Ensure the destination directory exists
    await fs.ensureDir(cesiumPublicPath);

    // Copy Build directory
    await fs.copy(
      path.join(cesiumPackagePath, "Build", "Cesium"),
      cesiumPublicPath,
    );

    console.log("Cesium assets copied successfully!");
  } catch (err) {
    console.error("Error copying Cesium assets:", err);
    process.exit(1);
  }
}

copyCesiumAssets();
