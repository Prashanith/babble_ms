const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/app.ts'],      // Your entry point TypeScript file
  outfile: 'dist/app.js',           // Output file after transpiling
  bundle: true,                     // Bundle all dependencies into one file
  platform: 'node',                 // Target Node.js environment
  target: 'node16',                 // Target Node.js version (adjust based on your version)
  sourcemap: true,                  // Generate source maps for debugging
  resolveExtensions: ['.ts', '.js'],// Allow importing .ts and .js files without extensions
  loader: {
    '.ts': 'ts',                    // Use the TypeScript loader for .ts files
  },
}).catch(() => process.exit(1));   // Exit on error
