const esbuild = require('esbuild');

// Build the TypeScript code into JavaScript using esbuild
esbuild.build({
  entryPoints: ['src/app.ts'],      // Your entry TypeScript file
  outfile: 'dist/app.js',           // Output file after transpiling
  bundle: true,                     // Bundle all dependencies into one file
  platform: 'node',                 // Target Node.js environment
  target: 'node16',                 // Set the target Node.js version (adjust for your version)
  sourcemap: true,                  // Generate source maps for debugging
  resolveExtensions: ['.ts', '.js'],// Allow importing .ts and .js files without extensions
  loader: {
    '.ts': 'ts',                    // Handle .ts files with TypeScript loader
  },
}).catch(() => process.exit(1));   // Exit on error
