# GoreeCloud Reader — Development Foundation User Manual

## Current availability

GoreeCloud Reader is in development. The current repository contains preview application shells using **synthetic sample media only**. It is not a production Reader release.

## Web preview

Open `apps/web/index.html` in a modern browser.

Available foundation interactions:

1. Use the search field to filter synthetic titles, creators, and series.
2. Choose All, Books, Manga, Comics, or Audiobooks to filter the preview library.
3. Select a synthetic item to view its detail panel.
4. Use the action buttons to see explicit messages about features that are not implemented yet.

The web preview does not read local files, upload media, persist reading history, connect to a server, or sign in to a GoreeCloud account.

## Android preview

The Android project is under `apps/android`. It presents a synthetic Reader library using Jetpack Compose. The repository does not yet include accepted release artifacts or a verified production installation path.

## Not yet available

Do not rely on Reader yet for importing or scanning a personal library, reading EPUB/PDF/comics, audiobook playback, downloads, synchronization, annotations, user permissions, or backup/recovery.

## Privacy note

The foundation intentionally avoids real personal-media processing while Privacy Shield and other required Platform-System runtime boundaries are incomplete.
