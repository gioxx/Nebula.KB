---
title: Spam-Digest
description: Dockerized daily digest of IMAP spam folders, with optional AI triage, blocklist/allowlist rules and web pages to rescue, trust or delete emails.
tags:
  - Projects
  - Python
  - IMAP
  - Docker
  - AI
slug: /spam-digest
sidebar_position: 1
---

# Spam-Digest

Spam-Digest is a Docker-first tool that reads the spam folder of one or more IMAP mailboxes and emails you an HTML digest of what landed there. An optional AI step (Anthropic Claude) labels each email **probably legitimate**, **uncertain** or **spam**, and signed links in the digest let you rescue, trust or delete emails from a web page, without opening a mail client.

It is the companion of [Clean Mail Automation](../clean-mail-automation/index.md): Spam-Digest helps you catch real email wrongly flagged as spam, Clean Mail Automation deletes old email from folders you don't need to keep.

![Spam-Digest review page](https://raw.githubusercontent.com/gioxx/spam-digest/main/docs/img/review.webp)

## Overview

### Links
- Website: [spamdigest.gioxx.org](https://spamdigest.gioxx.org)
- Source code: [github.com/gioxx/spam-digest](https://github.com/gioxx/spam-digest)
- Docker Hub image: `gfsolone/spam-digest`
- GHCR image: `ghcr.io/gioxx/spam-digest`
- Image tags: `latest` (last release), `X.Y.Z` (a specific release), `dev` (current `main`)

### Key features
- **Daily digest email** per mailbox, on a cron schedule. No email when the spam folder is empty, unless `SEND_IF_EMPTY=true`.
- **Multi-mailbox**: any number of IMAP accounts in one container (`MAILBOX_CONFIGS`), each with its own spam folder and digest recipient.
- **Spam folder detection**: if the configured folder doesn't exist, common names are tried (`Spam`, `Junk`, `INBOX.Spam`, `INBOX.Junk`, `[Gmail]/Spam`).
- **AI triage (optional)**: only sender and subject are sent to Claude, never the body.
- **Review page**: move an email to INBOX (optionally adding the sender to the allowlist) or delete it, one at a time or a whole section at once.
- **Blocklist and allowlist rules** (sender, domain, subject keyword): blocked emails are deleted and allowed ones moved to INBOX at each run, and both are listed in the digest.
- **Delete confirmed spam** with one button, after a confirmation page.
- **Status dashboard** on port `8080`, with buttons to run a digest now.
- **SMTP or Resend** for sending the digest.
- Pure Python standard library, no dependencies.

### Architecture at a glance
- **Digest** (`spam_digest.py`): IMAP fetch, blocklist/allowlist rules, AI classification, digest HTML, email delivery, state file. Run by cron.
- **Web server** (`status_server.py`): dashboard and the signed pages (`/review`, `/filters`, `/action/delete-spam`). Started by `entrypoint.sh`.
- **Shared module** (`shared.py`): link signing and rotation, rules and allowlist storage, email delivery, file locking.
- **Entrypoint** (`entrypoint.sh`): writes the cron schedule, starts the web server, optionally runs a digest at startup (`RUN_ON_START`). Only `cron` runs as root: the digest and the web server run as the unprivileged `app` user (uid 10001).
- **Data volume** (`/data`): last-run state, signing secret, link nonces, rules, allowlist and the actions log. Mount it as a volume so links and rules survive container updates.

## In this section

- [Deployment](./deployment.md): Run it with Docker Compose (single or multi-mailbox) or build the image locally.
- [Configuration](./configuration.md): Environment variables and email delivery (SMTP or Resend).
- [Digest and AI classification](./digest-and-ai.md): How the AI labels each email and what the digest contains.
- [Web pages, dashboard and CLI](./web-pages.md): Review and filters pages, the dashboard, the command line and rescuing an email by hand.
- [Troubleshooting](./troubleshooting.md): Common errors and how to fix them.
