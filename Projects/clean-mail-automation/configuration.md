---
title: 'Clean Mail Automation configuration'
sidebar_label: 'Configuration'
description: 'Environment variables and CLI arguments.'
sidebar_position: 3
---

## Environment variables

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

## CLI arguments

| Argument | Description |
| --- | --- |
| `--days N` | Retention for this run only; overrides `CLEAN_DAYS` and every `clean_days`. |
| `--send-digest` | Send the collected Telegram digest, clear it and exit. The digest cron calls this. |
| `--force` | With `--send-digest`: send even when nothing was collected (a "nothing to report" message). |

Inside the container: `docker exec email_cleaner python3 /app/clean_email.py --days 30`.
