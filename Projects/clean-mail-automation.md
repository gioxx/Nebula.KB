---
id: clean-mail-automation
title: Clean Mail Automation
description: Dockerized IMAP mailbox cleanup that deletes emails older than a retention period, with multi-mailbox support, cron scheduling, a web status page and optional Telegram notifications.
sidebar_position: 2
tags:
  - Projects
  - Python
  - IMAP
  - Docker
---

# Clean Mail Automation

`clean-mail-automation` is a Docker-first tool that connects to one or more IMAP mailboxes and **permanently deletes** emails older than a retention period (default: 10 days) from a folder. It runs once when the container starts, then on a cron schedule, and serves a web status page.

It is the companion of [spam-digest](spam-digest): Clean Mail Automation keeps folders you don't need to archive (notifications, reports, alerts) short, spam-digest helps you catch real email that landed in spam.

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

## Quick start

### Docker Compose: single mailbox

```yaml
services:
  clean-mail-automation:
    image: ghcr.io/gioxx/clean-mail-automation:latest
    container_name: email_cleaner
    restart: unless-stopped
    ports:
      - "8080:8080"
    environment:
      TZ: Europe/Rome
      IMAP_SERVER: imap.example.com
      EMAIL_USER: you@example.com
      EMAIL_PASS: your-password
      MAILBOX: INBOX
      CLEAN_DAYS: "10"
      # Every Monday at 01:30
      SCHEDULE_DAY: "1"
      SCHEDULE_HOUR: "1"
      SCHEDULE_MIN: "30"
```

```bash
docker compose up -d
```

:::warning[The first cleanup runs immediately]
A cleanup runs as soon as the container starts, not only at the scheduled time. Check `MAILBOX` and `CLEAN_DAYS` before starting it on a mailbox you care about: deletion is permanent.
:::

Ready-to-use compose files are in [`examples/`](https://github.com/gioxx/clean-mail-automation/tree/main/examples): `docker-compose.single.yml` (one mailbox, Telegram after each run) and `docker-compose.multi.yml` (three mailboxes, weekly Telegram digest, passwords from a `.env` file).

### Docker Compose: multi-mailbox

Set `MAILBOX_CONFIGS` to a JSON array. Keep it on **one line** (or in an `.env` file): multi-line JSON is not reliably parsed by Compose's list syntax.

```yaml
    environment:
      - MAILBOX_CONFIGS=[{"imap_server":"imap.contoso.com","email_user":"alerts@contoso.com","email_pass":"${ALERTS_PASS}","mailbox":"INBOX","clean_days":10},{"imap_server":"imap.example.com","email_user":"reports@example.com","email_pass":"${REPORTS_PASS}","mailbox":"Reports","clean_days":30}]
      - SCHEDULE_DAY=*
      - SCHEDULE_HOUR=2
      - SCHEDULE_MIN=0
```

Fields of each entry:

| Field | Default | Description |
| --- | --- | --- |
| `imap_server` | none | IMAP hostname. **Required.** |
| `imap_port` | `993` | IMAP SSL port. |
| `email_user` | none | IMAP username. **Required.** |
| `email_pass` | none | IMAP password. **Required.** |
| `email_address` | `email_user` | Label in logs, status page and notifications. |
| `mailbox` | `INBOX` | Folder to clean. |
| `clean_days` | `CLEAN_DAYS` or `10` | Retention in days for this entry. |

### docker run

```bash
docker run -d \
  -e IMAP_SERVER="imap.example.com" \
  -e EMAIL_USER="you@example.com" \
  -e EMAIL_PASS="your-password" \
  -e CLEAN_DAYS=10 \
  -e SCHEDULE_DAY=1 -e SCHEDULE_HOUR=1 -e SCHEDULE_MIN=30 \
  -e TZ=Europe/Rome \
  -p 8080:8080 \
  --name email_cleaner ghcr.io/gioxx/clean-mail-automation:latest
```

To build the image yourself: `docker build -t email-cleaner .` in a clone of the repository.

### Local run (no Docker)

Python 3.8+, standard library only:

```bash
export IMAP_SERVER="imap.example.com"
export EMAIL_USER="you@example.com"
export EMAIL_PASS="your-password"
export CLEAN_DAYS="10"
python3 clean_email.py
```

Scheduling is up to you (`cron`, systemd timer, Task Scheduler), and the status page is not started.

## Configuration

### Environment variables

| Variable | Default | Description |
| --- | --- | --- |
| `IMAP_SERVER` | none | IMAP hostname. **Required** unless `MAILBOX_CONFIGS` is set. |
| `IMAP_PORT` | `993` | IMAP port. The connection always uses SSL/TLS. |
| `EMAIL_USER` | none | IMAP username. **Required.** |
| `EMAIL_PASS` | none | IMAP password. **Required.** |
| `EMAIL_ADDRESS` | `EMAIL_USER` | Label in logs, status page and notifications. |
| `MAILBOX` | `INBOX` | Folder to clean. |
| `CLEAN_DAYS` | `10` | Delete emails older than this many days. `--days` overrides it. |
| `MAILBOX_CONFIGS` | none | JSON array for multi-mailbox mode. Replaces the single-mailbox variables above: each entry needs its own server and credentials. Only `CLEAN_DAYS` still applies, as the default for entries without `clean_days`. |
| `SEND_TELEGRAM_NOTIFICATIONS` | `false` | Enable Telegram (`1`, `true`, `yes`, `on`). |
| `TELEGRAM_BOT_TOKEN` | none | Bot token. Required when Telegram is enabled. |
| `CLEAN_EMAIL_TELEGRAM_CHAT_ID` | none | Chat ID for this app. Takes priority over `TELEGRAM_CHAT_ID`. |
| `TELEGRAM_CHAT_ID` | none | Fallback chat ID, handy when several apps share one variable. |
| `TELEGRAM_TIMEOUT` | `10` | Telegram API timeout, in seconds. |
| `TELEGRAM_NOTIFY_MODE` | `always` | `always`: a message after every run. `digest`: collect results and send them on the `DIGEST_SCHEDULE_*` cron. |
| `TELEGRAM_NOTIFY_ONLY_IF_DELETED` | `false` | Skip runs where nothing was deleted (both modes). |
| `SCHEDULE_MIN` | `0` | Cleanup cron minute. |
| `SCHEDULE_HOUR` | `0` | Cleanup cron hour. |
| `SCHEDULE_DAY` | `0` | Cleanup cron weekday: `0`/`7` Sunday … `6` Saturday, `*` every day. |
| `DIGEST_SCHEDULE_MIN` | `0` | Digest cron minute (digest mode only). |
| `DIGEST_SCHEDULE_HOUR` | `8` | Digest cron hour (digest mode only). |
| `DIGEST_SCHEDULE_DAY` | `0` | Digest cron weekday (digest mode only). |
| `WEB_PORT` | `8080` | Port of the status page inside the container. To use another host port, change the `ports` mapping instead (e.g. `"3200:8080"`). |
| `TZ` | `UTC` | Container timezone: cron schedule and timestamps. The status page clock uses your browser's time. |

With the defaults the cleanup runs **every Sunday at 00:00**. Cron fields accept digits, `*`, `/`, `,` and `-`; anything else falls back to the default and is logged.

### CLI arguments

| Argument | Description |
| --- | --- |
| `--days N` | Retention for this run only; overrides `CLEAN_DAYS` and every `clean_days`. |
| `--send-digest` | Send the collected Telegram digest, clear it and exit. The digest cron calls this. |
| `--force` | With `--send-digest`: send even when nothing was collected (a "nothing to report" message). |

Inside the container: `docker exec email_cleaner python3 /app/clean_email.py --days 30`.

## Usage

### What gets deleted
For each mailbox the script opens the folder, searches for emails received **before** today minus the retention days (IMAP `SEARCH BEFORE`, by the server's received date, with day granularity), flags them `\Deleted` and expunges them. Deletion is **permanent**: nothing is moved to Trash.

With `CLEAN_DAYS=10`, a run on 20 November deletes everything received before 10 November.

### Web status page
`http://<host>:8080/` shows the configured mailboxes (server, folder, retention; never passwords), the schedule in plain words, the Telegram settings and the last run of each mailbox (status, deleted count, duration, errors). It refreshes every 60 seconds.

When Telegram is configured it also has two buttons:
- **Test**: sends a test Telegram message.
- **Send now** (digest mode): sends the collected digest immediately and clears it.

:::warning[No built-in authentication]
The status page has no login and its buttons work with plain links. Keep port 8080 on a trusted network or behind a reverse proxy with authentication.
:::

### Telegram notifications
- Disabled by default: set `SEND_TELEGRAM_NOTIFICATIONS=true`, `TELEGRAM_BOT_TOKEN` and a chat ID.
- **`always` mode**: one message per mailbox after each cleanup, with mailbox, folder, retention, deleted count and duration (and the error, on failure).
- **`digest` mode**: results are collected and sent together on the `DIGEST_SCHEDULE_*` cron, grouped per mailbox with totals and errors. Useful when cleanup runs daily and you want one weekly summary:

```yaml
- TELEGRAM_NOTIFY_MODE=digest
- DIGEST_SCHEDULE_DAY=0
- DIGEST_SCHEDULE_HOUR=8
- DIGEST_SCHEDULE_MIN=0
```

- `TELEGRAM_NOTIFY_ONLY_IF_DELETED=true` keeps quiet runs out of both modes.

### Logs
Everything goes to the container output: `docker logs -f email_cleaner`, or the container logs view in Portainer.

## Troubleshooting

### "Error searching for emails" for a mailbox
The folder in `MAILBOX` / `mailbox` probably doesn't exist or has a different name on the server (e.g. `INBOX.Archive` instead of `Archive`). Check the exact name in your mail client. Folder names with spaces may not be accepted.

### Connection errors
The connection always uses IMAP over SSL/TLS (port `993` by default). Servers that only offer plain IMAP or STARTTLS on port `143` are not supported.

### The status page shows no last run, or the digest lost its data
The last-run state and the collected digest are stored in `/tmp` inside the container, so they are lost when the container is recreated (for example after an image update). The next cleanup run fills the status page again; results collected for a digest before the restart are not sent.

### Nothing is deleted
- Retention counts from the received date on the server: emails moved or imported recently may have a recent received date even if they are old.
- With `--days` set, it overrides every per-mailbox `clean_days`.
- Check the logs for the number of emails found: `Mailbox ... : N emails to delete.`

### The schedule runs at the wrong time
Set `TZ` (e.g. `Europe/Rome`): without it cron uses UTC.

### Telegram messages don't arrive
Use **Test** on the status page. Check the bot token and the chat ID (`CLEAN_EMAIL_TELEGRAM_CHAT_ID` wins over `TELEGRAM_CHAT_ID`), and that the bot has been started in, or added to, that chat.
