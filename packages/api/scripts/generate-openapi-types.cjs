const openapiTS = require("openapi-typescript").default;
const { astToString } = require("openapi-typescript");
const path = require("node:path");
const fs = require("node:fs/promises");
const configs = require("../openapi.json");

async function generate() {
  // Use __dirname to resolve relative to script location (packages/api/scripts/)
  // Go up one level to packages/api/, then into generated/openapi/
  const outputDir = path.resolve(__dirname, "../generated/openapi");

  // Ensure output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  for (const config of configs) {
    console.log(`Generating ${config.name}.ts from ${config.url}...`);

    try {
      // Generate TypeScript AST from OpenAPI schema
      const ast = await openapiTS(config.url, {
        exportType: true,  // Use "export type" for better tree-shaking
        alphabetize: true, // Sort properties alphabetically for consistency
      });

      // Convert AST to string
      const output = astToString(ast);

      // Write to file (adds .d.ts extension)
      const filePath = path.join(outputDir, `${config.name}.d.ts`);
      await fs.writeFile(filePath, output, "utf8");

      console.log(`✓ Generated ${config.name}.d.ts`);
    } catch (error) {
      console.error(`✗ Failed to generate ${config.name}:`, error.message);
      process.exitCode = 1;
    }
  }

  console.log("\n✓ All done!");
}

generate().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});