---
"@app/nextjs": patch
---

Cesium Integration

build: Add cesium and fix configurations

* Fix next configuration:  
Add plugin settings for cesium.  
Support source map in development environment.

* Exclude public directory in tsconfig of next package.

* Ignore copied Cesium codebase by symlink from gitignore.

* Add postinstall script for Cesium preparation in package.json.
