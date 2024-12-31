const bestzip = require('bestzip');
const pkg = require('../package.json');

async function createZip() {
  try {
    await bestzip({
      source: 'build/*',
      destination: `chrome-extension-hl-v${pkg.version}.zip`
    });
    console.log(`✅ Created chrome-extension-hl-v${pkg.version}.zip`);
  } catch (err) {
    console.error('Error creating zip:', err.message);
    process.exit(1);
  }
}

createZip();
