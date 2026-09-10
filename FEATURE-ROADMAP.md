# GoreeCloud Reader — Feature Roadmap

## Roadmap Status

All items in this roadmap are **Planned** unless a later authoritative update explicitly changes their lifecycle state. This roadmap records implementation obligations; it does not state that the capabilities are currently implemented or verified.

## Product Goal

Deliver a private, self-hosted, multi-client Reader platform that supports the essential workflow:

**Import → Organize → Read or Listen → Save Progress → Resume Anywhere**

## Phase 1 — Initial Release Priorities

1. Manga and comic libraries.
2. EPUB book libraries.
3. Audiobook libraries.
4. Automatic metadata extraction.
5. Series and volume organization.
6. Dedicated manga/comic reader.
7. Dedicated EPUB reader.
8. Dedicated audiobook player.
9. Continue Reading.
10. Continue Listening.
11. Cross-device progress synchronization.
12. Offline downloads.
13. Glaze UI integration.
14. Search and library filtering.
15. User-specific progress and favorites.

## Core Product Capability Domains

### Unified Library and Organization

- Separate Books, Manga, Comics, and Audiobooks views.
- Unified search, activity views, favorites, completion states, and next-in-series discovery.
- Custom shelves, smart collections, genre/creator/series/publisher/tag browsing.
- Multiple personal libraries and per-user permissions.
- Structured hierarchy: Library → Series or Work → Edition or Volume → Chapter or Issue → Media Resource.
- Alternate editions, multi-format works, linked ebook/audiobook editions, and independent edition progress.

### Manga, Comics, and Webtoons

- Dedicated manga reader with right-to-left and left-to-right support.
- Single page, double spreads, automatic spread detection, scrolling, webtoon mode, fitting, zoom, preloading, transitions, blank-page handling, margin cropping, remembered preferences, and exact progress.
- Comic reader with spreads, fullscreen, navigation thumbnails, issue navigation, and next unread issue transitions.
- Webtoon mode with long-image support, stitching, spacing controls, position tracking, and scroll restoration.

### Ebook and PDF Reading

- EPUB reader with typography, spacing, margins, themes, pagination/scrolling, orientation, TOC, chapter navigation, in-book search, selection, bookmarks, highlights, notes, and progress estimates.
- PDF reading with page and continuous modes, thumbnails, zoom/fitting, rotation, text search where available, bookmarks, progress, and last-page restoration.

### Audiobooks

- Dedicated audiobook player with exact timestamp resume, chapters, speed, sleep timer, skip intervals, bookmarks, notes, history, artwork, narrator/author/series metadata, remaining-time estimates, and completion tracking.
- Playback controls for chapter navigation, seeking, speed, sleep timer, bookmarking, volume, and supported audio outputs.

### Progress, Sync, and Offline

- Precise progress for manga/comics, ebooks, PDFs, and audiobooks.
- Continue Reading and Continue Listening home surfaces.
- Sync of progress, bookmarks, highlights, notes, favorites, completion state, histories, preferences, shelves, and collections through the GoreeCloud account.
- Offline downloads for books, issues, volumes, series, audiobooks, selected chapters, and collections.
- Smart download policies for next unread content, unfinished content, newly added chapters, cleanup, and storage limits.

### Metadata, Scanning, and Import

- Rich title metadata for names, series, creators, publication data, edition/ISBN/language/genre/tags, direction/status, and artwork.
- Authorized metadata editing, edition linking, duplicate merges, and split corrections.
- Recursive library scanning, new/change/remove detection, extraction, detection, validation, duplicate handling, thumbnail generation, and refresh scheduling.
- Import Inbox for uncertain classification before titles enter the main library.
- Original source files preserved wherever possible; generated derivatives stored separately.

### Formats

- Manga/comics: CBZ, CBR, ZIP-based image archives, image directories, PDF, fixed-layout EPUB.
- Ebooks: EPUB, PDF, TXT, and practical HTML-based ebooks.
- Audiobooks: M4B, M4A, MP3, AAC, FLAC, OGG, OPUS.
- Client codec differences may use server-side compatibility handling where appropriate.

### Discovery, Shelves, and Detail Pages

- Library-wide search by title, series, creator, narrator, publisher, genre, tag, ISBN, description, volume, and issue.
- Personalized shelves and smart shelves based on metadata and activity.
- Artwork-driven title and series pages with progress, Read/Listen actions, downloads, favorites, related editions/volumes/issues, and status indicators.

### Profiles, Privacy, and Accessibility

- Per-user histories, progress, favorites, bookmarks, annotations, downloads, age-appropriate restrictions, and library/content permissions.
- Optional personal history with privacy and history-management controls.
- Accessibility: scalable text, high contrast, screen readers, keyboard navigation, configurable tap zones, reduced motion, dyslexia-friendly options, flexible spacing, speed controls, and accessible labels.
- Self-hosted privacy model; external metadata integrations optional and disclosed; no dependency on unauthorized content sources or piracy-oriented integrations.

### Glaze UI and Clients

- Latest Glaze UI design language with artwork-first detail pages, adaptive backgrounds, translucent surfaces, cover grids, list/shelf layouts, responsive animation, distraction-free readers, audiobook Now Playing, tablet layouts, and touch-friendly navigation.
- Planned clients: Web, Android, Android tablets, Desktop, and large-screen tablet experiences.

### Performance and Optimization

- Cover/thumbnail/page caching, image optimization, progressive loading, prefetching, EPUB/PDF indexing, direct audiobook streaming, compatibility transcoding where necessary, audio range requests, and local client caching.

## Phase 2 — Post-Core Enhancements

After the core library and playback architecture is stable, planned enhancements include:

- Full-text ebook search.
- PDF OCR.
- Improved metadata matching.
- Smart recommendations and personalized reading suggestions.
- Reading goals and reading/listening statistics.
- Annual reading summaries.
- Advanced smart shelves.
- Automatic series matching.
- Advanced duplicate detection.
- Citation tools.
- Dictionary integration.
- Translation assistance.
- Vocabulary tools.
- Enhanced accessibility.
- Advanced annotation management.
- Cross-format progress assistance between ebook and audiobook editions.
- Improved large-library performance.

## Platform-System Integration Planning

Reader must be evaluated against GoreeCloud Manager, Privacy Shield, Wardveil Security, Everkeep, Glaze UI, GoreeCloud Mesh, and GoreeCloud Identity. Where the product specification already names account/profile, privacy, Glaze UI, sync, permissions, or self-hosting behavior, those remain planned product requirements. Detailed integration mechanisms, enforcement points, recovery behavior, and implementation evidence remain to be defined and verified before any integration is represented as complete.

## Lifecycle Rule

A roadmap item remains active until it is implemented and verified or receives an explicit authoritative lifecycle disposition such as cancellation, supersession, or confirmed non-applicability. Documentation changes alone do not complete a feature.
