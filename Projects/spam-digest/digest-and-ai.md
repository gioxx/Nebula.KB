---
title: 'Spam-Digest digest and AI classification'
sidebar_label: 'Digest and AI classification'
description: 'How the AI labels each email and what the digest contains.'
sidebar_position: 4
---

## AI classification

With `AI_PROVIDER=anthropic`, Spam-Digest sends Claude **only the sender and subject** of each email (never the body) and gets back a label and a short reason:

| Label | Digest section | Meaning |
| --- | --- | --- |
| `safe` | 🟢 Probably legitimate | Likely real email wrongly flagged as spam. |
| `uncertain` | 🟡 Uncertain | Can't tell; needs a human look. |
| `spam` | 🔴 Confirmed spam | Clearly unwanted, commercial or malicious. |

Emails beyond `AI_MAX_EMAILS`, or left out of a malformed answer, go to *Not classified*. If the AI call fails, the digest is still sent, with every email under *Not classified*.

Cost is very low: one request per run with a short prompt. With Claude Haiku and 100 emails, expect a fraction of a cent per run.

## The digest email

![Spam-Digest digest email](https://raw.githubusercontent.com/gioxx/spam-digest/main/docs/img/digest.webp)

Each mailbox gets its own digest with:
- A summary of totals per label.
- **Auto-deleted** and **Auto-moved to INBOX** sections, listing what your blocklist and allowlist handled in this run.
- The emails grouped by AI label, with date, sender, subject and reason.
- Buttons, when `WEB_BASE_URL` is set: **Review** under the probably legitimate and uncertain sections, **Delete N confirmed spam email(s)** under confirmed spam, and **Manage filters & allowlist**.
