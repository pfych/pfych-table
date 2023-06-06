const { build } = require('esbuild');
const { Generator } = require('npm-dts');

const shared = {
  entryPoints: ['src/index.ts'],
  bundle: true,
};

(async () => {
  await Promise.all([
    build({
      ...shared,
      outfile: 'dist/index.js',
    }),
    build({
      ...shared,
      outfile: 'dist/index.esm.js',
      format: 'esm',
    }),
    new Generator({
      entry: 'src/index.ts',
      output: 'dist/index.d.ts',
    }).generate(),
  ]);
})();
