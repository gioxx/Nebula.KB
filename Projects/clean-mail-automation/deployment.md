---
title: 'Clean Mail Automation deployment'
sidebar_label: 'Deployment'
description: 'Run it with Docker Compose (single or multi-mailbox), docker run or locally.'
sidebar_position: 2
---

## Docker Compose: single mailbox

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

## Docker Compose: multi-mailbox

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

## docker run

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

## Local run (no Docker)

Python 3.8+, standard library only:

```bash
export IMAP_SERVER="imap.example.com"
export EMAIL_USER="you@example.com"
export EMAIL_PASS="your-password"
export CLEAN_DAYS="10"
python3 clean_email.py
```

Scheduling is up to you (`cron`, systemd timer, Task Scheduler), and the status page is not started.
