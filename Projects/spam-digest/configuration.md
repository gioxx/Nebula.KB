---
title: 'Spam-Digest configuration'
sidebar_label: 'Configuration'
description: 'Environment variables and email delivery (SMTP or Resend).'
sidebar_position: 3
---

## Environment variables

### Mailbox (single-mailbox mode)

| Variable | Default | Description |
| --- | --- | --- |
| `IMAP_SERVER` | none | IMAP hostname. **Required** unless `MAILBOX_CONFIGS` is set. |
| `IMAP_PORT` | `993` | IMAP port. |
| `IMAP_USE_SSL` | `true` | `false` to connect without SSL/TLS. |
| `EMAIL_USER` | none | IMAP username. **Required.** |
| `EMAIL_PASS` | none | IMAP password. **Required.** |
| `EMAIL_ADDRESS` | `EMAIL_USER` | Mailbox identifier in the digest, dashboard and links. |
| `SPAM_FOLDER` | `Junk` | Spam folder name. Common aliases are tried if it doesn't exist. |
| `MAX_EMAILS` | `100` | Newest emails read per run. |
| `DIGEST_TO` | `EMAIL_ADDRESS` | Digest recipient. |
| `MAILBOX_CONFIGS` | none | JSON array for multi-mailbox mode (see [Deployment](./deployment.md#docker-compose-multi-mailbox)). |

### Email delivery

| Variable | Default | Description |
| --- | --- | --- |
| `EMAIL_PROVIDER` | `smtp` | `smtp` or `resend`. |
| `SMTP_HOST` | none | SMTP hostname. **Required** with `smtp`. |
| `SMTP_PORT` | `587` | `465` uses implicit SSL, any other port uses STARTTLS. |
| `SMTP_USER` / `SMTP_PASS` | none | SMTP credentials (login is skipped if either is empty). |
| `RESEND_API_KEY` | none | Resend API key (`re_...`). **Required** with `resend`. |
| `DIGEST_FROM` | `SMTP_USER` | Sender: a bare address or `Name <address>`. **Required** with Resend, on a verified domain (or `onboarding@resend.dev` for tests). |
| `SEND_IF_EMPTY` | `false` | Send a digest even when the spam folder is empty. |

### AI

| Variable | Default | Description |
| --- | --- | --- |
| `AI_PROVIDER` | `none` | `anthropic` to enable AI triage. |
| `AI_API_KEY` | none | Anthropic API key. **Required** with `anthropic`. |
| `AI_MODEL` | `claude-haiku-5-5` | Claude model used for classification. |
| `AI_MAX_EMAILS` | `50` | Maximum emails sent to the AI per run, across all mailboxes. The rest appear as *Not classified*. |

### Schedule and web

| Variable | Default | Description |
| --- | --- | --- |
| `SCHEDULE_MIN` | `0` | Cron minute. |
| `SCHEDULE_HOUR` | `8` | Cron hour. |
| `SCHEDULE_DAY` | `*` | Cron weekday: `*` every day, `0` Sunday … `6` Saturday. Ranges and lists (`1-5`, `1,3`) work too. |
| `RUN_ON_START` | `false` | Also run a digest when the container starts. |
| `TZ` | `UTC` | Container timezone, used by the schedule and timestamps. |
| `WEB_PORT` | `8080` | Port of the dashboard inside the container. Must be 1024 or higher (the web server doesn't run as root); change the host port with the `ports` mapping instead. |
| `WEB_BASE_URL` | none | Public address of the dashboard, e.g. `https://spamdigest.example.com`. Without it the digest has no review, filters or delete links. |
| `DASHBOARD_PASS` | none | Turns on an HTTP Basic login for the dashboard and its buttons. The review, filters and delete pages keep working from the digest links without it. |
| `DASHBOARD_USER` | `admin` | Username for the dashboard login (used only with `DASHBOARD_PASS`). |

## Email delivery

### SMTP (default)

```env
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=you@example.com
SMTP_PASS=your-smtp-password
DIGEST_FROM=Spam Digest <spam-digest@example.com>
```

### Resend

[Resend](https://resend.com) sends over HTTPS with just an API key, no SMTP server needed. Resend sees the envelope and content of the digest.

```env
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
DIGEST_FROM=Spam Digest <digest@yourdomain.com>
```

`DIGEST_FROM` must be on a domain verified in Resend (SPF and DKIM records). The free tier is plenty for a personal digest.
