---
sidebar_position: 1
title: 'Send-Mail'
description: Send emails via SMTP with support for attachments, CC/BCC, and custom servers/ports.
hide_title: true
id: send-mail
tags:
  - Send-Mail
  - Nebula.Automations
---

# Send-Mail

Send emails via SMTP with support for attachments, CC/BCC, and custom servers/ports.

## Parameters

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `SMTPServer` | Hostname or IP of the SMTP relay to use. | Yes | — |
| `SMTPPort` | TCP port of the SMTP relay. | No | `25` |
| `From` | Sender email address. | Yes | - |
| `To` | Recipient list (supports multiple values). | Yes | - |
| `Cc` | CC recipient list. | No | Empty |
| `Bcc` | BCC recipient list. | No | Empty |
| `Subject` | Email subject. | Yes | - |
| `Body` | Email body (HTML is enabled by default). | Yes | - |
| `AttachmentPath` | One or more file paths to attach. | No | Empty |
| `PlainText` | Send the body as plain text (HTML is default). | No | `False` |
| `Credential` | PSCredential used for authenticated SMTP. | No | - |
| `UseSsl` | Enable SSL/TLS when connecting to SMTP. | No | `False` |

:::note
The function relies on .NET `System.Net.Mail.SmtpClient`. Auth/TLS are supported via `-Credential` and `-UseSsl`; ensure your relay accepts the chosen method.
:::

## Examples

- **Send a simple HTML email**

```powershell
Send-Mail `
  -SMTPServer "smtp.internal.local" `
  -From "automation@contoso.com" `
  -To "team@contoso.com" `
  -Subject "Job completed" `
  -Body "<p>The overnight job finished successfully.</p>"
```

- **Add CC/BCC recipients and an attachment**

```powershell
Send-Mail `
  -SMTPServer "smtp.internal.local" `
  -SMTPPort 2525 `
  -From "automation@contoso.com" `
  -UseSsl `
  -Credential (Get-Credential) `
  -To "user1@contoso.com","user2@contoso.com" `
  -Cc "lead@contoso.com" `
  -Bcc "audit@contoso.com" `
  -Subject "Weekly metrics" `
  -Body "<p>Attached you will find the weekly metrics.</p>" `
  -AttachmentPath "C:\Exports\metrics.xlsx","C:\Exports\trend.pdf"
```

- **Reusable helper inside a script**

```powershell
function Send-JobAlert {
  param(
    [string]$ReportPath,
    [string]$Status
  )

  $subject = "Nightly job status: $Status"
  $body = "<h2>Status: $Status</h2><p>See attached log.</p>"

  Send-Mail -SMTPServer "smtp.example.com" -From "jobs@example.com" -To "ops@example.com" `
    -Subject $subject -Body $body -AttachmentPath $ReportPath
}
```

## Tips

- Multiple attachments are supported; paths must exist or the function throws.
- HTML is enabled by default. Add `-PlainText` if your relay/policy requires plain text bodies.
- Use `-UseSsl` and `-Credential` when relaying through authenticated/TLS SMTP servers.
