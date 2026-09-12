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
  'apps/web/package.json',
  'apps/web/playwright.config.mjs',
  'apps/web/tests/glaze-rendered.spec.mjs',
  'apps/web/TESTING.md',
  'apps/android/app/src/main/AndroidManifest.xml',
  'apps/android/app/src/main/java/com/goreecloud/reader/MainActivity.kt',
  'contracts/library-item.schema.json',
  'contracts/reading-progress.schema.json',
  'contracts/listening-progress.schema.json',
  'contracts/glaze-ui/reader-glaze-v1.3.json',
  'privacy/privacy-shield.application-manifest.json',
  'docs/ARCHITECTURE.md',
  'docs/ANDROID-BUILD.md',
  'docs/GLAZE-UI-ADOPTION.md',
  'docs/PRIVACY.md',
  'scripts/validate-glaze-adoption.mjs'
];

const fail = (message) => {
  console.error(`Foundation validation failed: ${message}`);
  process.exit(1);
};

for (const filePath of [...requiredRootFiles, ...requiredFoundationFiles]) {
  if (!fs.existsSync(filePath)) fail(`missing ${filePath}`);
  if (fs.statSync(filePath).isFile() && fs.readFileSync(filePath, 'utf8').trim().length < 20) fail(`${filePath} is materially empty`);
}

for (const filePath of [
  'contracts/library-item.schema.json',
  'contracts/reading-progress.schema.json',
  'contracts/listening-progress.schema.json',
  'contracts/glaze-ui/reader-glaze-v1.3.json',
  'privacy/privacy-shield.application-manifest.json',
  'apps/web/package.json'
]) {
  JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const webHtml = fs.readFileSync('apps/web/index.html', 'utf8');
if (!webHtml.includes('Synthetic Preview')) fail('web preview must clearly identify synthetic content');
if (!webHtml.includes('0.0.4-foundation')) fail('web preview must report the current 0.0.4 foundation version');

const features = fs.readFileSync('FEATURES.md', 'utf8');
if (!features.includes('Not implemented / still planned')) fail('FEATURES.md must preserve unimplemented-state clarity');

const platform = fs.readFileSync('goreecloud.platform.yaml', 'utf8');
if (!platform.includes('status: nonconformant')) fail('platform contract must remain nonconformant at foundation stage');
if (!platform.includes("version: '0.0.4-foundation'")) fail('platform contract must identify the 0.0.4 foundation milestone');

const readme = fs.readFileSync('README.md', 'utf8');
const specifications = fs.readFileSync('SPECIFICATIONS.md', 'utf8');
for (const [name, value] of [['README.md', readme], ['SPECIFICATIONS.md', specifications]]) {
  if (!value.includes('0.0.4-foundation')) fail(`${name} must match the 0.0.4 foundation milestone`);
}

const webPackage = JSON.parse(fs.readFileSync('apps/web/package.json', 'utf8'));
if (webPackage.devDependencies?.['@playwright/test'] !== '1.63.0') fail('Playwright must remain exactly pinned to 1.63.0 for this acceptance milestone');
if (webPackage.devDependencies?.['axe-core'] !== '4.13.0') fail('axe-core must remain exactly pinned to 4.13.0 for this acceptance milestone');

console.log('Reader foundation validation passed.');
