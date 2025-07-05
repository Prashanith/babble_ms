const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/server.ts'],  // Your entry TypeScript file
  outfile: 'dist/server.js',       // Output JavaScript file after transpiling
  bundle: true,                    // Bundle all dependencies into one file
  platform: 'node',                 // Target platform is Node.js
  target: 'node16',                 // Set the target Node.js version
  sourcemap: true,                 // Generate source maps for debugging
  external: ['express'],           // Exclude express from bundling
  loader: {
    '.ts': 'ts',                   // Handle `.ts` files with TypeScript loader
  },
  resolveExtensions: ['.ts', '.js'], // Allow importing `.ts` and `.js` files without extensions
}).catch(() => process.exit(1));   // Exit on errors
