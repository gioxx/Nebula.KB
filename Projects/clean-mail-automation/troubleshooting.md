---
title: 'Clean Mail Automation troubleshooting'
sidebar_label: 'Troubleshooting'
description: 'Common errors and how to fix them.'
sidebar_position: 5
---

## "Error searching for emails" for a mailbox
The folder in `MAILBOX` / `mailbox` probably doesn't exist or has a different name on the server (e.g. `INBOX.Archive` instead of `Archive`). Check the exact name in your mail client. Folder names with spaces may not be accepted.

## Connection errors
The connection always uses IMAP over SSL/TLS (port `993` by default). Servers that only offer plain IMAP or STARTTLS on port `143` are not supported.

## The status page shows no last run, or the digest lost its data
The last-run state and the collected digest are stored in `/tmp` inside the container, so they are lost when the container is recreated (for example after an image update). The next cleanup run fills the status page again; results collected for a digest before the restart are not sent.

## Nothing is deleted
- Retention counts from the received date on the server: emails moved or imported recently may have a recent received date even if they are old.
- With `--days` set, it overrides every per-mailbox `clean_days`.
- Check the logs for the number of emails found: `Mailbox ... : N emails to delete.`

## The schedule runs at the wrong time
Set `TZ` (e.g. `Europe/Rome`): without it cron uses UTC.

## Telegram messages don't arrive
Use **Test** on the status page. Check the bot token and the chat ID (`CLEAN_EMAIL_TELEGRAM_CHAT_ID` wins over `TELEGRAM_CHAT_ID`), and that the bot has been started in, or added to, that chat.
