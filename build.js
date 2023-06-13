const { build } = require('esbuild');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
};

(async () => {
  await Promise.all([
    build({
      ...shared,
      outfile: 'dist/index.js',
      format: 'cjs',
    }),
    build({
      ...shared,
      outfile: 'dist/index.esm.js',
      format: 'esm',
    }),
  ]);
})();
