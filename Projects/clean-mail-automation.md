---
id: clean-mail-automation
title: Clean Mail Automation
description: Python IMAP mailbox cleanup automation, runnable with Docker or as a standalone script.
sidebar_position: 2
tags:
  - Projects
  - Python
  - IMAP
  - Docker
---

# Clean Mail Automation

Python utility that connects to an IMAP mailbox and deletes emails older than a configurable retention period. It can run in Docker (startup run + cron schedule) or directly as a standalone Python script.

## Repository and images
- Source code: `https://github.com/gioxx/clean-mail-automation`
- Docker Hub image: `gfsolone/clean-mail-automation`
- GHCR image: `ghcr.io/gioxx/clean-mail-automation`

## Runtime options
- Dockerized execution (recommended for scheduling with embedded cron).
- Standalone script execution with Python (useful for manual or external scheduler runs).

## Core behavior
- Connects to IMAP over SSL (`imaplib.IMAP4_SSL`) using environment variables.
- Deletes all messages in `INBOX` older than `N` days (`BEFORE <date>` query).
- Executes `expunge()` after flagging matches with `\Deleted`.
- Runs once immediately when container starts, then follows cron schedule.
- Logs to stdout/stderr (including cron output redirection to PID 1 fd).
- Sends optional Telegram summary for success/failure.

## Required environment variables
| Variable | Required | Default | Description |
| --- | :---: | --- | --- |
| `IMAP_SERVER` | Yes | - | IMAP hostname or IP. |
| `EMAIL_USER` | Yes | - | Mailbox username. |
| `EMAIL_PASS` | Yes | - | Mailbox password/app password. |
| `IMAP_PORT` | No | `993` | IMAP SSL port. |
| `EMAIL_ADDRESS` | No | `EMAIL_USER` | Friendly mailbox identifier for logs/notifications. |
| `CLEAN_DAYS` | No | `10` | Retention in days. |
| `TELEGRAM_BOT_TOKEN` | No | - | Telegram bot token for post-run messages. |
| `TELEGRAM_CHAT_ID` | No | - | Telegram destination chat id. |
| `TELEGRAM_TIMEOUT` | No | `10` | Telegram HTTP timeout (seconds). |
| `SCHEDULE_DAY` | No | `0` | Cron day-of-week (`0`/`7` Sunday, `1` Monday, ..., `6` Saturday). |
| `SCHEDULE_HOUR` | No | `0` | Cron hour (`0-23`). |
| `SCHEDULE_MIN` | No | `0` | Cron minute (`0-59`). |

## Run with Docker
```bash
docker run -d \
  --name clean-mail-automation \
  -e IMAP_SERVER="imap.server.com" \
  -e IMAP_PORT=993 \
  -e EMAIL_USER="your_username" \
  -e EMAIL_PASS="your_password" \
  -e EMAIL_ADDRESS="mailbox@example.com" \
  -e CLEAN_DAYS=10 \
  -e SCHEDULE_DAY=1 \
  -e SCHEDULE_HOUR=1 \
  -e SCHEDULE_MIN=30 \
  ghcr.io/gioxx/clean-mail-automation:latest
```

To use Docker Hub instead of GHCR:
```bash
docker run -d --name clean-mail-automation gfsolone/clean-mail-automation:latest
```

## Docker Compose example
`compose.yaml`
```yaml
services:
  clean-mail-automation:
    image: ghcr.io/gioxx/clean-mail-automation:latest
    container_name: clean-mail-automation
    restart: unless-stopped
    environment:
      IMAP_SERVER: "imap.server.com"
      IMAP_PORT: "993"
      EMAIL_USER: "your_username"
      EMAIL_PASS: "your_password"
      EMAIL_ADDRESS: "mailbox@example.com"
      CLEAN_DAYS: "10"
      SCHEDULE_DAY: "1"
      SCHEDULE_HOUR: "1"
      SCHEDULE_MIN: "30"
      # Optional Telegram notifications:
      # TELEGRAM_BOT_TOKEN: "123456:ABCDEF"
      # TELEGRAM_CHAT_ID: "123456789"
```

## Run without Docker (Python)
Prerequisites:
- Python 3.x
- Network access to your IMAP server

Export variables and run:
```bash
export IMAP_SERVER="imap.server.com"
export IMAP_PORT="993"
export EMAIL_USER="your_username"
export EMAIL_PASS="your_password"
export EMAIL_ADDRESS="mailbox@example.com"
export CLEAN_DAYS="10"

python3 clean_email.py
```

Optional retention override via CLI:
```bash
python3 clean_email.py --days 30
```

For recurring runs without Docker, schedule `python3 clean_email.py` via your platform scheduler (`cron`, `systemd timer`, Windows Task Scheduler).

## Scheduling and retention precedence
- At container startup, `entrypoint.sh` writes a cron entry and runs `clean_email.py` immediately.
- Weekly schedule is controlled by `SCHEDULE_DAY`, `SCHEDULE_HOUR`, `SCHEDULE_MIN`.
- Retention defaults to 10 days.
- CLI override exists in script mode: `python3 clean_email.py --days 30`.
- If both are set, `--days` has priority over `CLEAN_DAYS`.

## Monitoring
- Container logs:
```bash
docker logs clean-mail-automation
```
- Telegram notifications are sent only when both `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` are configured.

## Operational notes
- Use mailbox-specific app passwords when available instead of primary user passwords.
- Test with a larger retention window first to validate query behavior in your mailbox.
- Current Dockerfile uses Python `3.14-slim`; pin to a stable supported runtime if your platform policy requires it.

## License
MIT License. See `LICENSE` in the repository.
