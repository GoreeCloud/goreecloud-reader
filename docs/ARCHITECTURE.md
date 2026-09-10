# GoreeCloud Reader — Foundation Architecture

## Architecture goal

Reader is being built as original GoreeCloud software with shared domain contracts and platform-specific clients. The foundation intentionally separates interface development from real personal-media processing.

## Current components

```text
apps/web ───────┐
                ├── synthetic Reader domain fixtures
apps/android ───┘

contracts/      portable media/progress schemas
privacy/        fail-closed Privacy Shield declaration
scripts/        source-level validation
```

There is no backend service, persistent catalog, account service, sync service, scan worker, media parser, reader engine, or audiobook engine in this revision.

## Planned service boundaries

Future architecture is expected to separate:

- library/catalog state;
- source-media access;
- ingestion and metadata extraction;
- generated derivatives and caches;
- reading/listening state;
- annotation state;
- synchronization;
- offline transfer;
- administration and operational state.

Exact service boundaries remain subject to implementation evidence and Platform-System contracts.

## Authority model

A visible feature is not authority. Reader operations that touch user-controlled media or activity will require appropriate GoreeCloud Identity authority, Privacy Shield permission, Wardveil security acceptance, and relevant operational/continuity controls. GoreeCloud Mesh may transport or coordinate accepted capabilities but must not grant authority by itself.

## Original-file preservation

Source media should be opened read-only wherever possible. Generated covers, thumbnails, indexes, optimized page images, transcodes, and metadata databases must have separate storage identities and lifecycle rules.

## Threat-aware ingestion

Future archive/document ingestion must bound extraction size/count/depth, reject traversal paths, constrain parser resources, identify malformed or unsupported media, and avoid executing embedded active content.
