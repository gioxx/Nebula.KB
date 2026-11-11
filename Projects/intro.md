---
id: intro
title: 'Overview'
description: Overview of side projects documented in this KB.
sidebar_position: 1
---

# Projects overview

This area hosts documentation for small, self-contained projects that live outside the Nebula PowerShell modules. Often, though, they’re still projects connected to the Microsoft 365 world.  
Each project has its own section, split into pages on how to run, deploy, configure and troubleshoot it.

:::note[Work in Progress 🚧]
More projects will be added here as soon as their documentation is ready.  
**Remember**: many of the projects available on GitHub, but not yet documented in this KB, often already have a `README.md` file that explains everything you need to know.
:::

## Available projects
### Mail tools
- [Clean Mail Automation](clean-mail-automation/index.md): Docker-first IMAP cleanup that deletes emails older than a retention period, with cron scheduling, a status page and optional Telegram notifications.
- [Spam-Digest](spam-digest/index.md): daily digest of IMAP spam folders with optional AI triage, blocklist/allowlist rules and web pages to rescue, trust or delete emails.

### Microsoft 365
- [IntuneWinAppUtil GUI](intunewinapputilgui/index.md) — WPF/PowerShell GUI wrapper to package Win32 apps for Intune.
- [Microsoft 365 Tenant Checker](m365-tenant-checker/index.md) — Flask-based utility and minimal web UI to verify if a domain is registered with Microsoft 365.
