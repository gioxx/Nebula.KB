---
sidebar_position: 1
title: "Connections"
description: Establish and tear down Exchange Online and Microsoft Graph sessions with one call.
hide_title: true
id: connect-nebula
tags:
  - Connect-Nebula
  - Connect-EOL
  - Disconnect-Nebula
---

# Authentication to Microsoft 365

For full, always-up-to-date details and examples, use `Get-Help <FunctionName> -Detailed` or `-Examples`.

## Connect-EOL
Connect to Exchange Online (EXO V3), auto-importing the module and auto-detecting the current user when `-UserPrincipalName` is not supplied.

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `UserPrincipalName` | UPN/e-mail for the EXO auth prompt. | No | Current user (`Find-UserConnected`) |
| `DelegatedOrganization` | Target customer tenant (delegated admin). | No | - |
| `PassThru` | Return the `Connect-ExchangeOnline` session object. | No | `False` |

**Example**
```powershell
Connect-EOL -UserPrincipalName 'admin@tenant.onmicrosoft.com'
```

## Connect-Nebula
One-shot helper that ensures EXO is connected, then (optionally) connects Microsoft Graph.

| Parameter | Description | Required | Default |
| --- | --- | :---: | --- |
| `UserPrincipalName` | UPN for EXO auth. | No | Auto-detected |
| `GraphScopes` | Graph delegated scopes to request. | No | `User.Read.All` |
| `GraphTenantId` | Tenant ID/domain for Graph. | No | - |
| `GraphDeviceCode` | Use device code instead of browser for Graph. | No | `False` |
| `AutoInstall` | Auto-install missing modules. | No | `False` |
| `ForceReconnect` | Skip health checks and reconnect both services. | No | `False` |
| `SkipGraph` | Connect only EXO, skip Graph entirely. | No | `False` |

**Example**
```powershell
Connect-Nebula -GraphScopes 'User.Read.All','Directory.Read.All' -AutoInstall
```

## Disconnect-Nebula
Disconnect EXO and/or Graph.

| Parameter | Description | Default |
| --- | --- | --- |
| `ExchangeOnly` | Disconnect only EXO. | `False` |
| `GraphOnly` | Disconnect only Graph. | `False` |

**Example**
```powershell
Disconnect-Nebula -GraphOnly   # keep EXO session alive
```
