import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const json = relative => JSON.parse(read(relative));
const clone = value => JSON.parse(JSON.stringify(value));

const expected = Object.freeze({
  readerRepository: 'GoreeCloud/goreecloud-reader',
  implementedSourceMapping: '1.3.0',
  historicalStableBaseline: '1.4.1',
  currentStableTarget: '1.5.1',
  developmentVersion: '1.5.0-dev.1',
  developmentRevision: 'e7c397837908e4644d6230f17d0f73e84e3d1558',
  sharedProfileId: 'goreecloud-reader-offline'
});

const contract = json('contracts/glaze-ui/reader-glaze-v1.5-development.json');
const v13Contract = json('contracts/glaze-ui/reader-glaze-v1.3.json');
const platform = read('goreecloud.platform.yaml');
const glazeRoot = String(process.env.GLAZE_V15_ROOT || '').trim();

assert.ok(glazeRoot, 'GLAZE_V15_ROOT must point to the exact historical Glaze UI V1.5 Development checkout');
assert.ok(fs.existsSync(glazeRoot), `GLAZE_V15_ROOT does not exist: ${glazeRoot}`);
const upstreamRevision = execFileSync('git', ['-C', glazeRoot, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
assert.equal(upstreamRevision, expected.developmentRevision, 'Historical Glaze V1.5 checkout must match the exact governed Development revision');

assert.equal(contract.schemaVersion, 1);
assert.equal(contract.documentVersion, '1.0');
assert.equal(contract.recordType, 'goreecloud-reader-glaze-v1.5-development-integration');
assert.equal(contract.consumer?.repository, expected.readerRepository);
assert.equal(contract.consumer?.lifecycle, 'development');
assert.equal(contract.glazeUi?.canonicalRepository, 'GoreeCloud/goreecloud-glaze-ui');
assert.equal(contract.glazeUi?.implementedSourceMapping, expected.implementedSourceMapping);
assert.equal(contract.glazeUi?.requiredStableConsumerTarget, expected.historicalStableBaseline, 'Historical Development record must retain the Stable baseline that governed when it was created');
assert.equal(contract.glazeUi?.developmentVersion, expected.developmentVersion);
assert.equal(contract.glazeUi?.developmentRevision, expected.developmentRevision);
assert.equal(contract.glazeUi?.sharedRepresentativeProfile, expected.sharedProfileId);
assert.equal(contract.integrationBoundary?.developmentOnly, true);
assert.equal(contract.integrationBoundary?.testOnly, true);
assert.equal(contract.integrationBoundary?.runtimeDependencyAdded, false);
assert.equal(contract.integrationBoundary?.platformManifestStableTargetChanged, false);
assert.equal(contract.integrationBoundary?.currentStableMigrationCompleted, false);
assert.equal(contract.integrationBoundary?.consumerAcceptanceEstablished, false);
assert.equal(contract.integrationBoundary?.releaseCandidateQualified, false);
assert.equal(contract.integrationBoundary?.stableQualified, false);
assert.equal(contract.integrationBoundary?.productionEligible, false);
assert.equal(contract.authorityBoundary?.glazeAuthority, 'presentation-only');
assert.equal(contract.authorityBoundary?.authorizationMayBeInferredByGlaze, false);
assert.equal(contract.authorityBoundary?.providerPrecedenceMayBeInferredByGlaze, false);
assert.equal(contract.authorityBoundary?.permissionMayBeGrantedByGlaze, false);
assert.equal(contract.authorityBoundary?.consequentialExecutionMayBeAutomatic, false);
assert.equal(contract.authorityBoundary?.fallbackExecutionMayBeAutomatic, false);
assert.equal(contract.acceptance?.repositoryLocalConsumerAcceptance, false);
assert.equal(contract.acceptance?.productionAcceptance, false);
assert.equal(contract.validation?.scenarios?.length, 4);

assert.equal(v13Contract.glazeUi?.version, expected.implementedSourceMapping, 'Reader implemented source mapping must remain V1.3 / 1.3.0');
assert.equal(v13Contract.acceptance?.productionEligible, false, 'Reader V1.3 source mapping must remain non-production evidence');
assert.match(platform, /result:\s*applicable-migration-required/);
assert.match(platform, /version:\s*'1\.3\.0'/);
assert.match(platform, /glaze_ui_required:\s*'1\.5\.1'/);
assert.ok(platform.includes('glaze-ui==1.5.1'), 'Platform dependency must use the current Stable Glaze target 1.5.1');
assert.ok(!platform.includes("glaze_ui_required: '1.5.0-dev.1'"), 'Historical Development V1.5 must never become the Stable compatibility requirement');
assert.ok(!platform.includes('glaze-ui==1.5.0-dev.1'), 'Historical Development V1.5 must never become the production Glaze dependency');

const upstreamRegistry = JSON.parse(fs.readFileSync(path.join(glazeRoot, 'registry/development/glaze-v1.5.0-dev.1.json'), 'utf8'));
const representativeConsumers = JSON.parse(fs.readFileSync(path.join(glazeRoot, 'contracts/v1.5/representative-consumers.dev.json'), 'utf8'));
assert.equal(upstreamRegistry.version, expected.developmentVersion);
assert.equal(upstreamRegistry.lifecycle, 'development');
assert.equal(upstreamRegistry.consumerEligible, false);
assert.equal(upstreamRegistry.stableBaseline, expected.historicalStableBaseline);
assert.equal(upstreamRegistry.representativeConsumerAcceptanceEstablished, false);
assert.equal(upstreamRegistry.representativeConsumerIntegrationChangesStableTarget, false);
assert.equal(upstreamRegistry.privacyAuthorityMayOwnAuthorizationTruth, true);
assert.equal(representativeConsumers.stableConsumerTarget, expected.historicalStableBaseline);
assert.equal(representativeConsumers.developmentOnly, true);
assert.equal(representativeConsumers.consumerAcceptanceEstablished, false);
assert.equal(representativeConsumers.repositoryLocalAcceptanceRequired, true);

const {resolveGlazeInterface} = await import(pathToFileURL(path.join(glazeRoot, 'js/glaze-v1.5-resolution.dev.mjs')).href);
const {glazeProviderDevelopmentContract} = await import(pathToFileURL(path.join(glazeRoot, 'js/glaze-v1.5-provider-registry.dev.mjs')).href);
assert.equal(glazeProviderDevelopmentContract.privacyAuthorityMayOwnAuthorizationTruth, true);
assert.equal(glazeProviderDevelopmentContract.providerPrecedenceInferred, false);
assert.equal(glazeProviderDevelopmentContract.authorizationInferred, false);

const readerProfile = representativeConsumers.profiles.find(profile => profile.id === expected.sharedProfileId);
assert.ok(readerProfile, `Missing upstream representative Reader profile: ${expected.sharedProfileId}`);
assert.equal(readerProfile.repository, expected.readerRepository);

function assertGlobalBoundaries(result) {
  assert.equal(result.version, expected.developmentVersion);
  assert.equal(result.lifecycle, 'development');
  assert.equal(result.stableBaseline, expected.historicalStableBaseline);
  assert.equal(result.authority.glazeAuthority, 'presentation-only');
  assert.equal(result.authority.authorizationInferred, false);
  assert.equal(result.authority.permissionGranted, false);
  assert.equal(result.authority.providerPrecedenceInferred, false);
  assert.equal(result.authority.operationalAuthorityGranted, false);
  assert.equal(result.authority.automaticNavigationAllowed, false);
  assert.equal(result.authority.automaticPermissionRequestAllowed, false);
  assert.equal(result.authority.automaticConsequentialExecutionAllowed, false);
  assert.equal(result.authority.automaticFallbackExecutionAllowed, false);
  assert.equal(result.continuity.taskStateReset, false);
  assert.equal(result.continuity.pageReloadRequired, false);
  assert.equal(result.privacy.localFirst, true);
  assert.equal(result.privacy.telemetryRequired, false);
  assert.equal(result.privacy.remoteAnalysisRequired, false);
  assert.equal(result.diagnostics.authority.operationalAuthorityGranted, false);
  assert.equal(result.diagnostics.authority.securityStateManufactured, false);
  assert.equal(result.diagnostics.authority.privacyStateManufactured, false);
  assert.equal(result.diagnostics.privacy.rawContextIncluded, false);
  assert.equal(result.diagnostics.privacy.providerIdentityIncluded, false);
}

const offline = resolveGlazeInterface(clone(readerProfile.input));
assertGlobalBoundaries(offline);
assert.equal(offline.composition.paneMode, 'multi-pane');
assert.equal(offline.composition.materialPreference, 'quiet');
assert.equal(offline.composition.motionPreference, 'reduced');
assert.equal(offline.composition.connectivityPresentation, 'offline');
const offlineSyncDestination = offline.navigation.destinations.find(item => item.id === 'sync');
assert.equal(offlineSyncDestination.visible, true);
assert.equal(offlineSyncDestination.enabled, false);
assert.equal(offlineSyncDestination.state, 'offline');
assert.equal(offline.navigation.acceptedCurrentId, 'sync');
assert.equal(offline.navigation.currentDestinationChanged, false);
const offlineContinue = offline.actions.actions.find(item => item.id === 'continue-reading');
const offlineSync = offline.actions.actions.find(item => item.id === 'sync-library');
assert.equal(offlineContinue.enabled, true);
assert.equal(offlineContinue.contextuallyRelevant, true);
assert.equal(offlineSync.enabled, false);
assert.equal(offlineSync.state, 'offline');
assert.equal(offlineSync.suggestedFallbackActionId, 'continue-reading');
assert.equal(offlineSync.automaticExecutionAllowed, false);
assert.equal(offline.actions.fallbackExecutionAutomatic, false);

const onlineInput = clone(readerProfile.input);
onlineInput.providers.find(provider => provider.id === 'reader-platform').context.connectivity.class = 'online';
onlineInput.providers.find(provider => provider.id === 'reader-sync-service').capabilities[0].state = 'available';
const online = resolveGlazeInterface(onlineInput);
assertGlobalBoundaries(online);
assert.equal(online.composition.connectivityPresentation, 'normal');
const onlineSync = online.actions.actions.find(item => item.id === 'sync-library');
assert.equal(onlineSync.enabled, true);
assert.equal(onlineSync.state, 'available');
assert.equal(online.capabilities.byId['service.library-sync'].provenance.authority, 'service');
assert.equal(onlineSync.automaticExecutionAllowed, false);
assert.equal(online.actions.fallbackExecutionAutomatic, false);

const conflictInput = clone(onlineInput);
conflictInput.providers.push({
  id: 'reader-secondary-sync-service',
  authority: 'service',
  capabilities: [{id: 'service.library-sync', domain: 'service', state: 'available'}]
});
const conflict = resolveGlazeInterface(conflictInput);
assertGlobalBoundaries(conflict);
assert.ok(conflict.conflicts.capabilityIds.includes('service.library-sync'));
assert.equal(conflict.capabilities.byId['service.library-sync'], undefined);
const conflictedSync = conflict.actions.actions.find(item => item.id === 'sync-library');
assert.equal(conflictedSync.enabled, false);
assert.equal(conflictedSync.state, 'unknown');
assert.ok(conflictedSync.reasonCodes.includes('capability-unknown'));
assert.equal(conflict.authority.providerPrecedenceInferred, false);

const privacyInput = clone(readerProfile.input);
privacyInput.providers.push({
  id: 'privacy-shield',
  authority: 'privacy',
  capabilities: [{
    id: 'authorization.reading-history-data-use',
    domain: 'authorization',
    state: 'permission-required'
  }]
});
privacyInput.actions.push({
  id: 'enable-reading-history-sync',
  label: 'Enable reading history sync',
  requiredCapabilities: ['authorization.reading-history-data-use'],
  consequential: true
});
const privacy = resolveGlazeInterface(privacyInput);
assertGlobalBoundaries(privacy);
const privacyCapability = privacy.capabilities.byId['authorization.reading-history-data-use'];
assert.equal(privacyCapability.provenance.authority, 'privacy');
const privacyAction = privacy.actions.actions.find(item => item.id === 'enable-reading-history-sync');
assert.equal(privacyAction.enabled, false);
assert.equal(privacyAction.state, 'permission-required');
assert.equal(privacyAction.consequential, true);
assert.equal(privacyAction.recoveryAction.kind, 'request-permission');
assert.equal(privacyAction.recoveryAction.userInitiated, true);
assert.equal(privacyAction.recoveryAction.automaticExecutionAllowed, false);
assert.equal(privacy.actions.permissionRequestedAutomatically, false);
const privacyDiagnostic = privacy.diagnostics.capabilities.find(item => item.id === 'authorization.reading-history-data-use');
assert.equal(privacyDiagnostic.authority, 'privacy');
assert.equal(privacyDiagnostic.providerIdentityIncluded, false);
assert.equal(JSON.stringify(privacy.diagnostics).includes('privacy-shield'), false);

console.log('GoreeCloud Reader / historical GLAZE UI 1.5.0-dev.1 repository-local Development regression: PASS');
console.log(`Historical exact upstream Glaze Development revision: ${expected.developmentRevision}`);
console.log('Historical Reader Development scenarios: 4');
console.log(`Historical V1.5 Development Stable baseline: ${expected.historicalStableBaseline}`);
console.log(`Current Stable consumer target is independently reconciled to: ${expected.currentStableTarget}`);
console.log(`Implemented Reader Glaze source mapping remains: ${expected.implementedSourceMapping}`);
console.log('Reader V1.5 consumer acceptance established by historical regression: false');
