---
id: send-mail
title: Send-Mail
sidebar_position: 10
---

Invia email via SMTP con supporto ad allegati, CC/BCC e server/porta personalizzati.

```powershell
Send-Mail -SMTPServer "smtp.example.com" -From "ops@example.com" -To "user@example.com" -Subject "Report" -Body "Attachment included" -Attachments "C:\report.csv"
```
