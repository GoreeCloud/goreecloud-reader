import fs from 'node:fs';

const manifestPath = 'privacy/privacy-shield.application-manifest.json';
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const fail = (message) => {
  console.error(`Privacy boundary validation failed: ${message}`);
  process.exit(1);
};

if (manifest.application_id !== 'goreecloud-reader') fail('unexpected application_id');
if (!Array.isArray(manifest.purposes) || manifest.purposes.length !== 0) fail('foundation purposes must remain empty');
if (!Array.isArray(manifest.resources) || manifest.resources.length !== 0) fail('foundation resources must remain empty');

const webJs = fs.readFileSync('apps/web/app.js', 'utf8');
if (/\bfetch\s*\(|XMLHttpRequest|WebSocket|navigator\.sendBeacon/.test(webJs)) {
  fail('web foundation must not perform application network requests');
}

const manifestXml = fs.readFileSync('apps/android/app/src/main/AndroidManifest.xml', 'utf8');
if (/<uses-permission\b/.test(manifestXml)) fail('Android foundation must not declare runtime permissions');

console.log('Privacy boundary validation passed: synthetic-only, fail-closed foundation.');
