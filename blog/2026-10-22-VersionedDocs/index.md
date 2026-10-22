---
slug: versioned-documentation
title: "One documentation site, two versions per module"
date: 2026-10-22T12:00:00+02:00
authors: [gioxx]
tags: [nebula, kb, documentation, dev]
---

Nebula.KB-dev is gone. The documentation for the development versions of the Nebula modules now lives here, on [kb.gioxx.org](https://kb.gioxx.org), next to the documentation for the released versions.

{/* truncate */}

Until today there were two sites: kb.gioxx.org for the versions published on the PowerShell Gallery, and Nebula.KB-dev for what was coming next (I explained the difference [in this post](/news/DocuDev)). Keeping two copies of the same documentation in sync was getting harder than it was worth, so I merged them.

Every module (Automations, Core, Log and Tools) now has two versions of its documentation:

- **Stable**: the version published on the PowerShell Gallery. It is the default and keeps the same addresses as before, for example [/Nebula/Core/intro](/Nebula/Core/intro). Your bookmarks still work.
- **Next**: the version in development, under `/next/`, for example [/Nebula/Core/next/intro](/Nebula/Core/next/intro). Every page shows a banner, so you always know you are reading about something that has not been released yet.

To switch between them, use the version menu at the top right of the navigation bar. It appears only when you are reading the pages of a module.

When a new version of a module reaches the PowerShell Gallery, its Next documentation becomes the new Stable. Older versions are not kept: if you are not running the latest release, update the module (`Update-Module`) before following the documentation.

:::warning
The caveat from the old Nebula.KB-dev still applies: a module that has not yet been released on the PowerShell Gallery can be unstable, incomplete, or still have bugs. If you download it from GitHub before it is published, you do so at your own risk.
:::

If you find something wrong in the new structure, [open an issue](https://github.com/gioxx/Nebula.KB/issues/new/choose).
