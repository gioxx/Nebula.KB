---
title: Clean Mail Automation
description: Dockerized IMAP mailbox cleanup that deletes emails older than a retention period, with multi-mailbox support, cron scheduling, a web status page and optional Telegram notifications.
tags:
  - Projects
  - Python
  - IMAP
  - Docker
slug: /clean-mail-automation
sidebar_position: 1
---

# Clean Mail Automation

`clean-mail-automation` is a Docker-first tool that connects to one or more IMAP mailboxes and **permanently deletes** emails older than a retention period (default: 10 days) from a folder. It runs once when the container starts, then on a cron schedule, and serves a web status page.

It is the companion of [Spam-Digest](../spam-digest/index.md): Clean Mail Automation keeps folders you don't need to archive (notifications, reports, alerts) short, Spam-Digest helps you catch real email that landed in spam.

## Overview

### Links
- Source code: [github.com/gioxx/clean-mail-automation](https://github.com/gioxx/clean-mail-automation)
- Docker Hub image: `gfsolone/clean-mail-automation`
- GHCR image: `ghcr.io/gioxx/clean-mail-automation`

### Key features
- **Retention by days** (`CLEAN_DAYS`, per-mailbox `clean_days`), with a per-run CLI override (`--days`).
- **Multi-mailbox**: any number of IMAP accounts and folders in one container (`MAILBOX_CONFIGS`).
- **Cron scheduling** inside the container, plus an immediate cleanup at every container start.
- **Web status page** on port `8080`: configuration, schedule, last run per mailbox, and Telegram actions.
- **Telegram notifications (optional)**: after every run, or as a periodic digest, optionally only when something was deleted.
- Pure Python standard library, no dependencies. Logs go to the container's stdout.

### Architecture at a glance
- **Script** (`clean_email.py`): IMAP connection(s), search by date, deletion, Telegram notifications and digest.
- **Status server** (`status_server.py`): web status page. Started by `entrypoint.sh`, not by the script.
- **Entrypoint** (`entrypoint.sh`): writes the cron schedule(s), starts the status server, runs the first cleanup, then starts cron.
- **Container** (`Dockerfile`): Python slim image with cron.

## In this section

- [Deployment](./deployment.md): Run it with Docker Compose (single or multi-mailbox), docker run or locally.
- [Configuration](./configuration.md): Environment variables and CLI arguments.
- [Usage](./usage.md): What gets deleted, the web status page, Telegram notifications and logs.
- [Troubleshooting](./troubleshooting.md): Common errors and how to fix them.
