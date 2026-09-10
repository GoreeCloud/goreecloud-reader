# GoreeCloud Reader — Privacy Architecture Notes

## Foundation rule

Real personal-library processing is disabled at the foundation stage. The Privacy Shield manifest declares no authorized purposes or resources.

## Data classes expected later

Reader may eventually process:

- source-media paths/resources and library metadata;
- user reading/listening progress;
- bookmarks, highlights, and notes;
- history and completion state;
- favorites, shelves, and collections;
- reader/playback preferences;
- offline-download state;
- administrator-managed library access rules.

These are planning categories only; the foundation does not process them.

## Required future privacy decisions

Each operation must define its purpose, data minimization, resource scope, acting identity, retention, deletion, export, synchronization, external disclosure, offline behavior, and backup/recovery interaction.

External metadata matching must remain optional and disclose what title/creator/identifier information leaves the GoreeCloud environment. No external content source may become an implicit or unauthorized piracy integration.
