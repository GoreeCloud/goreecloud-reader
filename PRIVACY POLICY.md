# GoreeCloud Reader — Privacy Policy

## Status

This policy describes the **development foundation** currently present in this repository. It must be revised and accepted before Reader processes real personal libraries or activity.

## Current foundation behavior

The `0.0.1-foundation` application shells use hard-coded synthetic data. They do not intentionally collect, transmit, upload, synchronize, index, persist, or analyze a user's books, media files, reading history, listening history, annotations, account information, or device library.

The web foundation performs no application network request. The Android foundation declares no storage, media-library, account, location, contacts, microphone, camera, or other sensitive runtime permission.

## Privacy Shield boundary

The repository's Privacy Shield application manifest declares **zero purposes and zero resources**. This is a fail-closed source state. It does not grant authority for real data processing.

Real Reader operations must remain disabled until the relevant operation has an accepted privacy purpose, resource scope, identity/authority context, minimization rules, retention/deletion behavior, and runtime Privacy Shield authorization.

## Planned personal data

Future Reader capabilities may require user-controlled processing of library metadata, reading/listening progress, bookmarks, highlights, notes, history, preferences, shelves, permissions, and offline state. Their exact privacy behavior is not yet implemented and must not be inferred from the roadmap.

## External integrations

No third-party metadata or content integration is enabled in the foundation. Future external metadata integrations must be optional, clearly disclosed, minimized, and independently authorized. Reader must not depend on unauthorized content sources or piracy-oriented integrations.

## Self-hosting objective

The product objective is for authorized personal Reader state to remain inside the user's GoreeCloud environment unless the user explicitly enables an approved external integration. This objective is planned architecture, not a claim that a production service currently exists.
