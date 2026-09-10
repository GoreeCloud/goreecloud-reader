# GoreeCloud Reader — Security

## Current security status

Reader is a development foundation and is **not production-approved**. Wardveil Security runtime integration is not implemented or accepted.

## Foundation attack-surface constraints

- Web preview contains no application network calls or credentials.
- Android preview requests no sensitive runtime permissions.
- Synthetic fixtures contain no personal information.
- Privacy Shield source manifest is fail-closed.
- CI uses read-only repository content permission.
- Secrets, production environment files, private keys, tokens, and credentials must never be committed.

## Future security requirements

Before real media is processed, Reader must define and verify controls for authentication, authorization, media access, file parsing, archive handling, metadata extraction, server-side processing, downloads, administrative operations, sessions/devices, secure transport, input validation, resource exhaustion, malicious files, and dependency risk.

Untrusted CBZ/CBR/ZIP/EPUB/PDF/audio inputs must be treated as hostile until validated. Archive extraction must defend against path traversal, decompression bombs, oversized resources, malformed files, and unsafe parser behavior.

## Vulnerability reporting

Do not place exploit details, credentials, private user data, or GoreeCloud infrastructure secrets in public issues. Use the authorized private GoreeCloud security-reporting path when one is established for Reader. This repository does not currently claim a dedicated public vulnerability mailbox.

## Status integrity

A passing source validation workflow is not equivalent to security acceptance. Wardveil protection must be independently implemented, evidenced, and accepted before corresponding claims are made.
