---
id: installation
title: Installazione
sidebar_position: 2
---

## Requisiti
- **PowerShell 5.1+** o **PowerShell 7+**
- Connettività Internet per l’installazione da **PowerShell Gallery**

## Installazione

```powershell
Install-Module -Name Nebula.Automations -Scope CurrentUser
```

## Aggiornamento

```powershell
Update-Module -Name Nebula.Automations
```

## Pulizia installazioni precedenti (opzionale)

```powershell
Uninstall-Module -Name Nebula.Automations -AllVersions -Force
Install-Module -Name Nebula.Automations -Scope CurrentUser -Force
```
