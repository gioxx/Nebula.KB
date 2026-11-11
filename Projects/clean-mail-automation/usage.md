---
title: 'Clean Mail Automation usage'
sidebar_label: 'Usage'
description: 'What gets deleted, the web status page, Telegram notifications and logs.'
sidebar_position: 4
---

## What gets deleted
For each mailbox the script opens the folder, searches for emails received **before** today minus the retention days (IMAP `SEARCH BEFORE`, by the server's received date, with day granularity), flags them `\Deleted` and expunges them. Deletion is **permanent**: nothing is moved to Trash.

With `CLEAN_DAYS=10`, a run on 20 November deletes everything received before 10 November.

## Web status page
`http://<host>:8080/` shows the configured mailboxes (server, folder, retention; never passwords), the schedule in plain words, the Telegram settings and the last run of each mailbox (status, deleted count, duration, errors). It refreshes every 60 seconds.

The **Active configuration** panel lists the environment variables set for the container, with their values (`EMAIL_PASS` and `TELEGRAM_BOT_TOKEN` shown as `set (hidden)`); anything not listed uses its default. At startup the container log shows the configuration in use as `[config]` lines.

When Telegram is configured it also has two buttons:
- **Test**: sends a test Telegram message.
- **Send now** (digest mode): sends the collected digest immediately and clears it.

:::warning[No built-in authentication]
The status page has no login and its buttons work with plain links. Keep port 8080 on a trusted network or behind a reverse proxy with authentication.
:::

## Telegram notifications
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

## Logs
Everything goes to the container output: `docker logs -f email_cleaner`, or the container logs view in Portainer.
