---
title: 'Spam-Digest troubleshooting'
sidebar_label: 'Troubleshooting'
description: 'Common errors and how to fix them.'
sidebar_position: 6
---

## "Could not open any spam folder"
The configured `SPAM_FOLDER` and all the common names failed. Check the folder's exact name in your mail client (Gmail: `[Gmail]/Spam`, some servers: `INBOX.Junk`) and set it explicitly. The folder actually used is shown in the dashboard and the digest.

## SSL errors when connecting to IMAP
The server doesn't offer SSL/TLS on that port. Use `IMAP_USE_SSL=false` (or `"imap_use_ssl": false` in `MAILBOX_CONFIGS`) together with the right port, usually `143`.

## The digest is not sent
- Check the container logs: `docker logs spam-digest`. At startup the `[config]` lines show the configuration actually in use (mailboxes, email provider, AI model, digest links, dashboard login), and `[entrypoint]` says whether `/data` had to be migrated.
- With an empty spam folder, no digest is sent unless `SEND_IF_EMPTY=true` (or you use **Run** on the dashboard).
- SMTP: port `465` uses implicit SSL, any other port STARTTLS; check `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`.
- Resend: `DIGEST_FROM` must be on a verified domain.

## The digest has no Review / Delete / Filters buttons
Set `WEB_BASE_URL` to the address where you reach the dashboard. Buttons only appear for sections that have emails, and Review / Delete need AI triage.

## "Invalid or revoked link" or "This link belongs to an older digest"
Links rotate with every digest. Use the most recent digest email, or rotate the filters link from the dashboard.

## Links stopped working after an update
The signing secret and the link nonces live in `/data`. Without a volume they are recreated at every container update, which invalidates old links. Mount `/data` as a volume.

## "The mailbox changed since the last digest"
The spam folder's `UIDVALIDITY` changed (folder recreated, server migration) or the digest was made by a version before 0.8.0, so the stored email IDs could point to other messages. Nothing was changed. Wait for the next digest and use its links.

## Permission errors on `/data` after upgrading
Since 0.8.0 the app runs as the `app` user. At start, the container hands `/data` over to it (`chown`), including volumes created by older images. If you bind-mount a host folder on a filesystem that doesn't support `chown` (some NAS or network shares), give uid/gid `10001` write access to it.

## A run failed and the review list is empty
When a mailbox can't be read (IMAP error), its review and delete lists are cleared on purpose: the previous email IDs can't be verified against the mailbox. The next successful run fills them again.
