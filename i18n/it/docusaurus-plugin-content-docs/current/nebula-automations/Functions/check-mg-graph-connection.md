---
id: check-mg-graph-connection
title: CheckMGGraphConnection
sidebar_position: 11
---

Connessione a **Microsoft Graph** con credenziali applicative.

```powershell
$Graph = CheckMGGraphConnection -tenantId "00000000-0000-0000-0000-000000000000" -clientId "11111111-1111-1111-1111-111111111111" -clientSecret (Get-Content "$env:APPDATA\nebula\.graph_secret.txt" -Raw)
```
