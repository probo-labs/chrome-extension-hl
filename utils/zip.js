const bestzip = require('bestzip');
const pkg = require('../package.json');
const fs = require('fs');

async function createZip() {
  try {
    // Create versioned zip
    const versionedZip = `chrome-extension-hl-v${pkg.version}.zip`;
    await bestzip({
      source: 'build/*',
      destination: versionedZip
    });
    console.log(`✅ Created ${versionedZip}`);

    // Create latest zip (copy of the versioned one)
    fs.copyFileSync(versionedZip, 'chrome-extension-hl-latest.zip');
    console.log('✅ Created chrome-extension-hl-latest.zip');
  } catch (err) {
    console.error('Error creating zip:', err.message);
    process.exit(1);
  }
}

createZip();
