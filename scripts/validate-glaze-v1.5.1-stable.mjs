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
  stableVersion: '1.5.1',
  stableRevision: '98da57064ede0f334627b632bc16801f580331af',
  stableBaseline: '1.5.0',
  stableBaselineRevision: 'b7fa8164bfdeaa1dc0acb21b770e7601120da04e',
  reviewedImplementationAnchor: 'ee1032a0822ab8e103f8afe48e5c1859fde65cc9',
  qualificationAnchor: '5b59d0e36950d737dba35b58ae58058684e0831b',
  platformContractVersion: '0.2',
  platformContractRevision: '981c5807f249955e9f2c6c5d9136c9ed9c8017e9',
  sharedProfileId: 'goreecloud-reader-offline'
});

const contract = json('contracts/glaze-ui/reader-glaze-v1.5.1-stable.json');
const v13Contract = json('contracts/glaze-ui/reader-glaze-v1.3.json');
const platform = read('goreecloud.platform.yaml');
const glazeRoot = String(process.env.GLAZE_V151_ROOT || '').trim();

assert.ok(glazeRoot, 'GLAZE_V151_ROOT must point to the exact Glaze UI 1.5.1 Stable checkout');
assert.ok(fs.existsSync(glazeRoot), `GLAZE_V151_ROOT does not exist: ${glazeRoot}`);
const upstreamRevision = execFileSync('git', ['-C', glazeRoot, 'rev-parse', 'HEAD'], {encoding: 'utf8'}).trim();
assert.equal(upstreamRevision, expected.stableRevision, 'Glaze V1.5.1 checkout must match exact current Stable authority');

assert.equal(contract.schemaVersion, 1);
assert.equal(contract.documentVersion, '1.0');
assert.equal(contract.recordType, 'goreecloud-reader-glaze-v1.5.1-stable-compatibility');
assert.equal(contract.consumer?.repository, expected.readerRepository);
assert.equal(contract.consumer?.lifecycle, 'development');
assert.deepEqual(contract.consumer?.supportedSurfaces, ['web', 'android']);
assert.equal(contract.glazeUi?.canonicalRepository, 'GoreeCloud/goreecloud-glaze-ui');
assert.equal(contract.glazeUi?.implementedSourceMapping, expected.implementedSourceMapping);
assert.equal(contract.glazeUi?.requiredStableConsumerTarget, expected.stableVersion);
assert.equal(contract.glazeUi?.stableVersion, expected.stableVersion);
assert.equal(contract.glazeUi?.stableRevision, expected.stableRevision);
assert.equal(contract.glazeUi?.stableEntrypoint, 'js/glaze-v1.5.1.mjs');
assert.equal(contract.glazeUi?.stableBaseline, expected.stableBaseline);
assert.equal(contract.glazeUi?.stableBaselineRevision, expected.stableBaselineRevision);
assert.equal(contract.glazeUi?.reviewedImplementationAnchor, expected.reviewedImplementationAnchor);
assert.equal(contract.glazeUi?.qualificationAnchor, expected.qualificationAnchor);
assert.equal(contract.glazeUi?.sharedRepresentativeProfile, expected.sharedProfileId);
assert.equal(contract.glazeUi?.qualifiedSharedObligations, 18);
assert.equal(contract.platformContract?.version, expected.platformContractVersion);
assert.equal(contract.platformContract?.authorityRevision, expected.platformContractRevision);
assert.equal(contract.platformContract?.integralPlatformSystemCount, 7);
assert.equal(contract.platformContract?.syncIsIntegralPlatformSystem, false);
assert.equal(contract.integrationBoundary?.compatibilityOnly, true);
assert.equal(contract.integrationBoundary?.runtimeDependencyAdded, false);
assert.equal(contract.integrationBoundary?.currentStableTargetReconciled, true);
assert.equal(contract.integrationBoundary?.currentStableSourceMigrationCompleted, false);
assert.equal(contract.integrationBoundary?.consumerAcceptanceEstablished, false);
assert.equal(contract.integrationBoundary?.sharedQualificationInheritedAsConsumerAcceptance, false);
assert.equal(contract.integrationBoundary?.stableQualified, false);
assert.equal(contract.integrationBoundary?.productionEligible, false);
assert.equal(contract.authorityBoundary?.glazeAuthority, 'presentation-only');
assert.equal(contract.authorityBoundary?.authorizationMayBeInferredByGlaze, false);
assert.equal(contract.authorityBoundary?.providerPrecedenceMayBeInferredByGlaze, false);
assert.equal(contract.authorityBoundary?.permissionMayBeGrantedByGlaze, false);
assert.equal(contract.authorityBoundary?.navigationMayBeAutomatic, false);
assert.equal(contract.authorityBoundary?.consequentialExecutionMayBeAutomatic, false);
assert.equal(contract.authorityBoundary?.fallbackExecutionMayBeAutomatic, false);
assert.equal(contract.acceptance?.repositoryLocalConsumerAcceptance, false);
assert.equal(contract.acceptance?.productionAcceptance, false);
assert.equal(contract.validation?.scenarios?.length, 4);

assert.equal(v13Contract.glazeUi?.version, expected.implementedSourceMapping, 'Reader implemented source mapping must remain V1.3 / 1.3.0');
assert.equal(v13Contract.acceptance?.productionEligible, false, 'Reader V1.3 source mapping must remain non-production evidence');
assert.match(platform, /schema_version:\s*'0\.2'/);
assert.match(platform, /platform_contract:\s*'0\.2'/);
assert.match(platform, /result:\s*applicable-migration-required/);
assert.match(platform, /version:\s*'1\.3\.0'/);
assert.match(platform, /glaze_ui_required:\s*'1\.5\.1'/);
assert.ok(platform.includes('goreecloud-platform-contract==0.2'), 'Platform dependency must use current Contract 0.2');
assert.ok(platform.includes('glaze-ui==1.5.1'), 'Platform dependency must require current Stable Glaze 1.5.1');
assert.ok(!/^  sync:/m.test(platform), 'GoreeCloud Sync must not be represented as an eighth Integral Platform System');
assert.ok(platform.includes('GoreeCloud Sync remains a separately governed application/service capability'), 'Reader must preserve separate Sync governance truth');

assert.equal(fs.readFileSync(path.join(glazeRoot, 'VERSION'), 'utf8').trim(), expected.stableVersion);
const lifecycle = JSON.parse(fs.readFileSync(path.join(glazeRoot, 'registry/lifecycle.json'), 'utf8'));
assert.equal(lifecycle.currentOfficial, expected.stableVersion);
assert.equal(lifecycle.currentStable, expected.stableVersion);
assert.equal(lifecycle.activeCandidate, null);
assert.equal(lifecycle.activePatchReleaseCandidate, null);
const stableLifecycle = lifecycle.releases.find(release => release.version === expected.stableVersion);
assert.ok(stableLifecycle, 'Current Stable lifecycle entry must exist');
assert.equal(stableLifecycle.status, 'stable');
assert.equal(stableLifecycle.consumerEligible, true);
assert.equal(stableLifecycle.stableBaseline, expected.stableBaseline);
assert.equal(stableLifecycle.runtimeEntrypoint, 'js/glaze-v1.5.1.mjs');
assert.equal(stableLifecycle.sourceQualificationAnchor, expected.qualificationAnchor);

const consumers = JSON.parse(fs.readFileSync(path.join(glazeRoot, 'consumers/registry.json'), 'utf8'));
assert.equal(consumers.officialBaseline, expected.stableVersion);
assert.equal(consumers.requiredConsumerVersion, expected.stableVersion);
const readerConsumer = consumers.consumers.find(consumer => consumer.repository === expected.readerRepository);
assert.ok(readerConsumer, 'Current Stable Glaze consumer registry must include GoreeCloud Reader');
assert.equal(readerConsumer.status, 'adoption-required');
assert.equal(readerConsumer.requiredTargetVersion, expected.stableVersion);
assert.equal(readerConsumer.productionEligible, false);
assert.equal(readerConsumer.targetVersion, null);

const representativeConsumers = JSON.parse(fs.readFileSync(path.join(glazeRoot, 'contracts/v1.5/representative-consumers.dev.json'), 'utf8'));
const readerProfile = representativeConsumers.profiles.find(profile => profile.id === expected.sharedProfileId);
assert.ok(readerProfile, `Missing retained representative Reader profile: ${expected.sharedProfileId}`);
assert.equal(readerProfile.repository, expected.readerRepository);

const stableModule = await import(pathToFileURL(path.join(glazeRoot, 'js/glaze-v1.5.1.mjs')).href);
const {resolveGlazeInterface, glazeV151} = stableModule;
assert.equal(glazeV151.version, expected.stableVersion);
assert.equal(glazeV151.lifecycle, 'stable');
assert.equal(glazeV151.stableBaseline, expected.stableBaseline);
assert.equal(glazeV151.consumerEligible, true);
assert.equal(glazeV151.reviewedImplementationAnchor, expected.reviewedImplementationAnchor);
assert.equal(glazeV151.sourceQualificationAnchor, expected.qualificationAnchor);
assert.equal(glazeV151.qualifiedStabilizationObligations, 18);
assert.equal(glazeV151.authorityBoundary, 'presentation-only');
assert.equal(glazeV151.providerPrecedenceInferred, false);
assert.equal(glazeV151.authorizationInferred, false);
assert.equal(glazeV151.permissionRequestAutomatic, false);
assert.equal(glazeV151.automaticNavigationAllowed, false);
assert.equal(glazeV151.consequentialExecutionAutomatic, false);
assert.equal(glazeV151.fallbackExecutionAutomatic, false);
assert.equal(glazeV151.telemetryRequired, false);
assert.equal(glazeV151.remoteAnalysisRequired, false);
assert.equal(glazeV151.downstreamConsumerAcceptanceAutomatic, false);
assert.equal(glazeV151.productionAcceptanceAutomatic, false);

function assertGlobalBoundaries(result) {
  assert.equal(result.version, expected.stableVersion);
  assert.equal(result.lifecycle, 'stable');
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
assert.equal(offline.composition.connectivityPresentation, 'offline');
const offlineSyncDestination = offline.navigation.destinations.find(item => item.id === 'sync');
assert.equal(offlineSyncDestination.visible, true);
assert.equal(offlineSyncDestination.enabled, false);
assert.equal(offlineSyncDestination.state, 'offline');
const offlineContinue = offline.actions.actions.find(item => item.id === 'continue-reading');
const offlineSync = offline.actions.actions.find(item => item.id === 'sync-library');
assert.equal(offlineContinue.enabled, true);
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

console.log('GoreeCloud Reader / GLAZE UI 1.5.1 repository-local Stable compatibility: PASS');
console.log(`Reader exact upstream Glaze Stable revision: ${expected.stableRevision}`);
console.log(`Current required Stable consumer target: ${expected.stableVersion}`);
console.log(`Implemented Reader Glaze source mapping remains: ${expected.implementedSourceMapping}`);
console.log('Reader Stable source migration completed: false');
console.log('Reader repository-local consumer acceptance established: false');
console.log('Reader Release Candidate / Stable / production acceptance established: false');
