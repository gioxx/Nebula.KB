---
title: Microsoft 365 Tenant Checker
description: Quickly verify whether a domain belongs to a Microsoft 365 tenant, via API and minimal web UI.
tags:
  - Projects
  - Microsoft 365
  - Tenant Checker
slug: /m365-tenant-checker
sidebar_position: 1
---

# Microsoft 365 Tenant Checker

Small Flask-based utility that queries Microsoft's Autodiscover endpoint to determine if a domain is tied to a Microsoft 365 tenant (Exchange Online, Teams, etc.). It exposes a JSON API and a lightweight HTML page, ready for Docker or Render.com deployment.

## Demo and repository
- Live demo: **https://m365-tenant-checker.onrender.com**
- Source code: [github.com/gioxx/m365-tenant-checker](https://github.com/gioxx/m365-tenant-checker)

## Key features
- 🔎 Instant domain check against Autodiscover.
-, REST API: `GET /check?domain=example.com` returning JSON.
- 🌐 Minimal web interface with Light/Dark toggle.
- 🐳 Public Docker image (`ghcr.io/gioxx/m365-tenant-checker:latest`).
- ☁️ Render.com-ready via `gunicorn`.

## Architecture at a glance
- **Backend** (`backend/app.py`): Flask serves `/check` and the static page. It issues a `GET` to `https://autodiscover-s.outlook.com/autodiscover/autodiscover.json?Email=test@<domain>&Protocol=Autodiscoverv1` with a 5s timeout.
- **Frontend** (`frontend/index.html`): Single input form, fetches `/check`, shows textual feedback, includes a theme toggle.
- **Container** (`Dockerfile`): Python slim image, installs `Flask`, `requests`, `flask-cors`, `gunicorn`; exposes `:5000` and starts `gunicorn backend.app:app`.
- **Procfile**: `web: gunicorn backend.app:app` for Render.com.

## In this section

- [API](./api.md): Endpoints, parameters and responses.
- [Deployment](./deployment.md): Run it with Docker, Docker Compose, locally or on Render.com.

## Repository structure
```
m365-tenant-checker/
├── backend/
│   ├── app.py              # /check endpoint and static serving
│   └── requirements.txt
├── frontend/
│   └── index.html          # Minimal UI with theme toggle
├── Dockerfile              # Image published to ghcr.io
├── Procfile                # Render.com startup
├── README.md / README-IT.md
└── LICENSE
```

## Operational notes
- No authentication or rate limiting: place behind a reverse proxy if exposed publicly.
- Backend uses `requests` with a 5s timeout; network issues return `500`.
- HTML is served directly by Flask (`/`), so no separate static server is required.
- Dockerfile currently uses Python **3.15 slim**; pin to an LTS version if needed for production.

## License
MIT License. See `LICENSE` in the repo. The favicon uses [Twemoji](https://twemoji.twitter.com/) graphics (© 2020 Twitter, Inc and contributors), licensed under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).
