---
title: 'Microsoft 365 Tenant Checker deployment'
sidebar_label: 'Deployment'
description: 'Run it with Docker, Docker Compose, locally or on Render.com.'
sidebar_position: 3
---

## Docker (recommended)
```bash
docker pull ghcr.io/gioxx/m365-tenant-checker:latest
docker run -p 5000:5000 ghcr.io/gioxx/m365-tenant-checker:latest
```
Open `http://localhost:5000` for the UI, or call `/check`.

## Docker Compose (single service)
`compose.yaml`
```yaml
services:
  m365-tenant-checker:
    image: ghcr.io/gioxx/m365-tenant-checker:latest
    ports:
      - "5000:5000"
    restart: unless-stopped
```
Run it:
```bash
docker compose up -d
```
Browse `http://localhost:5000`.

## Local run (no Docker)
```bash
python -m venv .venv
source .venv/bin/activate  # on Windows: .venv\Scripts\activate
pip install -r backend/requirements.txt
gunicorn backend.app:app --bind 0.0.0.0:5000
# dev alternative: flask --app backend.app run --host 0.0.0.0 --port 5000
```

## Render.com
1. Create a **Web Service**.
2. Connect the GitHub repo.
3. Set: Build Command empty; Start Command `gunicorn backend.app:app`; Runtime Python 3; Instance Type *Free*.
4. Deploy.
