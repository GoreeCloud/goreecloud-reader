import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const json = (relative) => JSON.parse(read(relative));

const errors = [];
const requireCheck = (condition, message) => {
  if (!condition) errors.push(message);
};

const contractPath = 'contracts/glaze-ui/reader-glaze-v1.3.json';
const contract = json(contractPath);
const platform = read('goreecloud.platform.yaml');
const adoption = read('docs/GLAZE-UI-ADOPTION.md');
const css = read('apps/web/app.css');
const html = read('apps/web/index.html');
const js = read('apps/web/app.js');
const android = read('apps/android/app/src/main/java/com/goreecloud/reader/MainActivity.kt');

const expected = {
  version: '1.3.0',
  tag: 'v1.3.0',
  tagObjectSha: 'f020fdc8a39de442f9fdfb405d658259c52b99df',
  stableSourceCommit: 'ff34f232f295c9dcb07e4c681f66d4104d0b9323',
};

requireCheck(contract.schemaVersion === 1, 'Glaze adoption contract schemaVersion must be 1');
requireCheck(contract.recordType === 'goreecloud-reader-glaze-v1.3-adoption-contract', 'unexpected Glaze adoption recordType');
requireCheck(contract.consumer?.repository === 'GoreeCloud/goreecloud-reader', 'consumer repository must be GoreeCloud/goreecloud-reader');
requireCheck(contract.consumer?.foundationVersion === '0.0.3-foundation', 'consumer foundation version must be 0.0.3-foundation');
requireCheck(contract.consumer?.lifecycle === 'development', 'consumer lifecycle must remain development');
requireCheck(JSON.stringify(contract.consumer?.supportedSurfaces) === JSON.stringify(['web', 'android']), 'supported Glaze surfaces must remain web and android');

for (const [key, value] of Object.entries(expected)) {
  requireCheck(contract.glazeUi?.[key] === value, `Glaze ${key} must stay pinned to ${value}`);
}
requireCheck(contract.glazeUi?.repository === 'GoreeCloud/goreecloud-glaze-ui', 'Glaze source repository must remain canonical');
requireCheck(contract.glazeUi?.contract === 'GLAZE_UI_V1_3.md', 'Glaze contract must be GLAZE_UI_V1_3.md');
requireCheck(contract.glazeUi?.webEntrypoint === 'css/glaze-v1.3.0.css', 'Glaze Stable web entrypoint must be pinned');
requireCheck(contract.glazeUi?.runtimeEntrypoint === 'js/glaze-v1.3.0.mjs', 'Glaze Stable runtime entrypoint must be pinned');

requireCheck(contract.status === 'adoption-in-progress', 'Reader must remain adoption-in-progress until independent acceptance exists');
requireCheck(contract.acceptance?.repositoryLocalMapping === true, 'repository-local mapping must remain declared');
requireCheck(contract.acceptance?.automatedAdoptionValidation === true, 'automated adoption validation must remain declared');
for (const gate of [
  'renderedWebAcceptance',
  'webAccessibilityAcceptance',
  'androidNativeAcceptance',
  'androidPhysicalDeviceAcceptance',
  'androidAccessibilityAcceptance',
  'representativeTaskFlowAcceptance',
  'productionEligible',
  'acceptedV1Authorized',
]) {
  requireCheck(contract.acceptance?.[gate] === false, `${gate} must fail closed until independently accepted`);
}

requireCheck(platform.includes("version: '0.0.3-foundation'"), 'Platform Contract version must match the 0.0.3 foundation milestone');
requireCheck(platform.includes('result: applicable-migration-required'), 'Glaze platform result must remain applicable-migration-required');
requireCheck(platform.includes('version: 1.3.0'), 'Glaze platform version must remain 1.3.0');
requireCheck(platform.includes('glaze_ui_required: 1.3.0'), 'compatibility Glaze requirement must remain 1.3.0');
requireCheck(platform.includes('glaze-ui==1.3.0'), 'platform dependency must remain glaze-ui==1.3.0');
requireCheck(platform.includes(contractPath), 'Platform Contract must cite the repository-local Glaze adoption contract');
requireCheck(platform.includes('Current Glaze UI consumer acceptance is not established.'), 'Platform Contract must preserve the Glaze acceptance blocker');

requireCheck(adoption.includes('GLAZE UI V1.3'), 'adoption record must identify GLAZE UI V1.3');
requireCheck(adoption.includes(expected.version), 'adoption record must identify version 1.3.0');
requireCheck(adoption.includes(expected.tag), 'adoption record must identify the immutable v1.3.0 tag');
requireCheck(adoption.includes(expected.stableSourceCommit), 'adoption record must identify the exact Stable source commit');
requireCheck(adoption.includes('Not accepted yet'), 'adoption record must explicitly say Reader is not accepted yet');
requireCheck(adoption.includes('production eligibility remains false'), 'adoption record must preserve production ineligibility');

requireCheck(css.includes(':focus-visible'), 'web foundation must preserve visible keyboard focus');
requireCheck(css.includes('prefers-reduced-motion: reduce'), 'web foundation must preserve reduced-motion behavior');
requireCheck(css.includes('@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)))'), 'web foundation must provide a no-backdrop-filter resilience fallback');
requireCheck(css.includes('--glaze-canvas:'), 'web foundation must expose repository-local Glaze semantic mapping tokens');
requireCheck(css.includes('--glaze-surface:'), 'web foundation must expose Glaze surface token mapping');
requireCheck(css.includes('--glaze-focus:'), 'web foundation must expose Glaze focus token mapping');

const remotePattern = /(?:https?:)?\/\//i;
requireCheck(!remotePattern.test(css), 'web CSS must not fetch remote Glaze or third-party assets');
requireCheck(!remotePattern.test(html), 'web HTML must not fetch remote Glaze or third-party assets');
requireCheck(!remotePattern.test(js), 'web JS must not fetch remote Glaze or third-party assets');

requireCheck(android.includes('MaterialTheme'), 'Android foundation must preserve native MaterialTheme mapping primitives');
requireCheck(android.includes('OutlinedTextField'), 'Android foundation must preserve accessible native text-field semantics');
requireCheck(android.includes('AssistChip'), 'Android foundation must preserve native chip semantics for filtering');
requireCheck(android.includes('Synthetic Preview · No personal media is loaded or transmitted.'), 'Android foundation must preserve the explicit synthetic-data boundary');

if (errors.length) {
  console.error('Reader Glaze UI V1.3 adoption validation FAILED:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Reader Glaze UI adoption: PASS (${expected.tag} / ${expected.stableSourceCommit})`);
console.log('Acceptance remains fail-closed: rendered/native/accessibility/task-flow/production gates are not claimed.');
