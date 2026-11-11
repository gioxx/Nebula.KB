---
title: 'Spam-Digest deployment'
sidebar_label: 'Deployment'
description: 'Run it with Docker Compose (single or multi-mailbox) or build the image locally.'
sidebar_position: 2
---

## Docker Compose: single mailbox

```yaml
services:
  spam-digest:
    image: ghcr.io/gioxx/spam-digest:latest
    container_name: spam-digest
    restart: unless-stopped
    ports:
      - "8080:8080"
    volumes:
      - spam_digest_data:/data
    environment:
      TZ: Europe/Rome
      IMAP_SERVER: imap.example.com
      EMAIL_USER: you@example.com
      EMAIL_PASS: your-imap-password
      SPAM_FOLDER: Junk
      SMTP_HOST: smtp.example.com
      SMTP_PORT: "587"
      SMTP_USER: you@example.com
      SMTP_PASS: your-smtp-password
      # Optional: AI triage
      AI_PROVIDER: anthropic
      AI_API_KEY: sk-ant-...
      # Optional: review, filters and delete links in the digest
      WEB_BASE_URL: https://spamdigest.example.com
      SCHEDULE_HOUR: "8"
      SCHEDULE_MIN: "0"

volumes:
  spam_digest_data:
```

```bash
docker compose up -d
```

The digest runs every day at 08:00 (`TZ` timezone). It does **not** run at container start unless `RUN_ON_START=true`. The dashboard is at `http://localhost:8080`.

The repository also ships a [`docker-compose.yml`](https://github.com/gioxx/spam-digest/blob/main/docker-compose.yml) and an [`.env.example`](https://github.com/gioxx/spam-digest/blob/main/.env.example) to start from.

## Docker Compose: multi-mailbox

Set `MAILBOX_CONFIGS` to a JSON array. It replaces the single-mailbox IMAP variables; delivery, AI and schedule variables stay global.

```yaml
    environment:
      MAILBOX_CONFIGS: |
        [
          {"imap_server":"imap.contoso.com","email_user":"alex@contoso.com","email_pass":"app-password","spam_folder":"Junk"},
          {"imap_server":"imap.example.com","email_user":"team@example.com","email_pass":"secret","spam_folder":"Spam","digest_to":"it@example.com"},
          {"imap_server":"mail.example.org","email_user":"info@example.org","email_pass":"secret","imap_use_ssl":false,"imap_port":143}
        ]
      SMTP_HOST: smtp.example.com
      SMTP_USER: alerts@example.com
      SMTP_PASS: your-smtp-password
```

Fields of each entry:

| Field | Default | Description |
| --- | --- | --- |
| `imap_server` | none | IMAP hostname. **Required.** |
| `imap_port` | `993` | IMAP port. |
| `imap_use_ssl` | `true` | `false` for a plain connection (e.g. port `143`). |
| `email_user` | none | IMAP username. **Required.** |
| `email_pass` | none | IMAP password. **Required.** |
| `email_address` | `email_user` | Mailbox identifier used in the digest, the dashboard and the links. |
| `spam_folder` | `Junk` | Spam folder name. |
| `max_emails` | `100` | Newest emails read per run. |
| `digest_to` | `email_address` | Digest recipient for this mailbox. |

## Building locally

```bash
git clone https://github.com/gioxx/spam-digest.git
cd spam-digest
cp .env.example .env    # then edit .env
docker build -t spam-digest .
docker run -d --env-file .env -p 8080:8080 -v spam_digest_data:/data spam-digest
```
