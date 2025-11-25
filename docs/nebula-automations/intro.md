---
sidebar_position: 1
title: 'Getting started'
description: Get up and running with Nebula.Automations in minutes.
hide_title: true
id: intro
tags:
  - Getting started
  - Nebula.Automations
---

# Getting started

**Nebula.Automations** is a PowerShell module that provides reusable functions for scripting, automation, and integration with cloud services.
It is the natural evolution of *Nebula.Tools* and was created with a specific focus on automation.

> **Main features currently available:**
> - `Send-Mail` — sending emails via SMTP (attachments, CC/BCC, custom servers/ports).
> - `CheckMGGraphConnection` — connection to Microsoft Graph with application credentials, module installation management, and status logging.

# How to download Nebula.Automations

Nebula.Automations is available on the PowerShell Gallery.  
Its GitHub repository is available at [github.com/gioxx/Nebula.Automations](https://github.com/gioxx/Nebula.Automations).

## Installation from PowerShell Gallery

This is definitely the recommended option and is currently the simplest, provided your machine has internet connectivity and the ability to download files from Microsoft's PowerShell Gallery ([powershellgallery.com](https://www.powershellgallery.com/)).

The CurrentUser installs modules in a location that's accessible only to the current user of the computer (for example: ```$HOME\Documents\PowerShell\Modules```):

```powershell
Install-Module -Name Nebula.Automations -Scope CurrentUser
```

The `AllUsers` scope installs modules in a location that's accessible to all users of the computer (```$env:ProgramFiles\PowerShell\Modules```):

```powershell
Install-Module -Name Nebula.Automations -Scope AllUsers
```

When no Scope is defined, the default is set based on the PowerShellGet version.
:::info
In PowerShellGet 1.x versions, the default is AllUsers, which requires elevation for install.  
For PowerShellGet versions 2.0.0 and above in PowerShell 6 or higher:
 - The default is CurrentUser, which doesn't require elevation for install.
 - If you are running in an elevated session, the default is AllUsers.
:::

## Update module

The same rules mentioned in the previous paragraph apply. You can therefore also associate the `Scope` parameter with the Update command.

```powershell
Update-Module -Name Nebula.Automations
```

## Cleaning of previous installations (optional)

The most up-to-date version of the module installed on your system will always be the one that PowerShell will prefer when you launch an `Import-Module` or call one of the Nebula.Automations functions.  
In any case, if you want, you can always perform a complete cleanup of the installed versions and get the latest one (from PowerShell Gallery).

```powershell
Uninstall-Module -Name Nebula.Automations -AllVersions -Force
Install-Module -Name Nebula.Automations -Scope CurrentUser -Force
```
