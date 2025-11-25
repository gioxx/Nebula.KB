---
id: send-mail
title: Send-Mail
sidebar_position: 2
---

Send emails via SMTP with support for attachments, CC/BCC, and custom servers/ports.

```powershell
Send-Mail -SMTPServer "smtp.example.com" -From "ops@example.com" -To "user@example.com" -Subject "Report" -Body "Attachment included" -Attachments "C:\report.csv"
```
