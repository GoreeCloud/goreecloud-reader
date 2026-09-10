import fs from 'node:fs';

const requiredRootFiles = [
  'README.md',
  'SPECIFICATIONS.md',
  'FEATURES.md',
  'FEATURE-ROADMAP.md',
  'BENEFITS.md',
  'COMPETITIVE-OBJECTIVES.md',
  'BRANDING.md',
  'USER-MANUAL.md',
  'PRIVACY POLICY.md',
  'NOTES.md',
  'SECURITY.md',
  '.gitignore',
  '.editorconfig',
  'goreecloud.platform.yaml',
  'LICENSE'
];

const requiredFoundationFiles = [
  'apps/web/index.html',
  'apps/web/app.css',
  'apps/web/app.js',
  'apps/android/app/src/main/AndroidManifest.xml',
  'apps/android/app/src/main/java/com/goreecloud/reader/MainActivity.kt',
  'contracts/library-item.schema.json',
  'contracts/reading-progress.schema.json',
  'contracts/listening-progress.schema.json',
  'privacy/privacy-shield.application-manifest.json',
  'docs/ARCHITECTURE.md',
  'docs/GLAZE-UI-ADOPTION.md',
  'docs/PRIVACY.md'
];

const fail = (message) => {
  console.error(`Foundation validation failed: ${message}`);
  process.exit(1);
};

for (const path of [...requiredRootFiles, ...requiredFoundationFiles]) {
  if (!fs.existsSync(path)) fail(`missing ${path}`);
  if (fs.statSync(path).isFile() && fs.readFileSync(path, 'utf8').trim().length < 20) fail(`${path} is materially empty`);
}

for (const path of ['contracts/library-item.schema.json', 'contracts/reading-progress.schema.json', 'contracts/listening-progress.schema.json', 'privacy/privacy-shield.application-manifest.json']) {
  JSON.parse(fs.readFileSync(path, 'utf8'));
}

const webHtml = fs.readFileSync('apps/web/index.html', 'utf8');
if (!webHtml.includes('Synthetic Preview')) fail('web preview must clearly identify synthetic content');

const features = fs.readFileSync('FEATURES.md', 'utf8');
if (!features.includes('Not implemented / still planned')) fail('FEATURES.md must preserve unimplemented-state clarity');

const platform = fs.readFileSync('goreecloud.platform.yaml', 'utf8');
if (!platform.includes('status: nonconformant')) fail('platform contract must remain nonconformant at foundation stage');

console.log('Reader foundation validation passed.');
