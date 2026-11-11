---
slug: blog-and-projects-reorganized
title: "The KB blog moves to /blog, and every project gets its own section"
date: 2026-11-11T10:14:00+01:00
authors: [gioxx]
tags: [nebula, kb, documentation]
---

Two changes to this site today: the news section is now the **Blog**, at a new address, and the documentation of the side projects is split into one section per project.

{/* truncate */}

## The blog moves to /blog

What used to be **News** is now called **Blog** in the navigation bar: it is the blog of this KB. The link to my personal blog, [gioxx.org](https://gioxx.org), has been removed from the navigation bar.

The address changes too, from `/news` to [/blog](/blog). Links to existing posts still work: every `/news/...` address redirects to the same post under `/blog/...`.

:::warning[Update your feed reader]
The RSS and Atom feeds have moved and the old addresses no longer work. If you follow this blog in a feed reader, subscribe again with the new address:

- RSS: `https://kb.gioxx.org/blog/rss.xml`
- Atom: `https://kb.gioxx.org/blog/atom.xml`
:::

## One section per project

The [Projects](/Projects/intro) area documents the tools that live outside the Nebula modules. Until today each project was a single long page, and two of them sat in a "Microsoft 365" folder. Now every project has its own section in the sidebar, split into a few pages:

| Project | Pages |
| --- | --- |
| [Clean Mail Automation](/Projects/clean-mail-automation) | Overview, Deployment, Configuration, Usage, Troubleshooting |
| [IntuneWinAppUtil GUI](/Projects/intunewinapputilgui) | Overview, Installation and launch, Packaging, Configuration, Detection helpers, Troubleshooting |
| [Microsoft 365 Tenant Checker](/Projects/m365-tenant-checker) | Overview, API, Deployment |
| [Spam-Digest](/Projects/spam-digest) | Overview, Deployment, Configuration, Digest and AI classification, Web pages, dashboard and CLI, Troubleshooting |

Each overview page lists the pages of its section. Projects are now in alphabetical order, in the sidebar and in the Projects menu.

The content is the same, only split. Clean Mail Automation and Spam-Digest keep their address. IntuneWinAppUtil GUI and Microsoft 365 Tenant Checker lost the `/M365/` part of theirs, and the old addresses redirect to the new ones. A link to a heading of an old page now opens the overview of its project: the section you were looking for is in one of the pages listed there.

If you find a broken link, [open an issue](https://github.com/gioxx/Nebula.KB/issues/new/choose).
