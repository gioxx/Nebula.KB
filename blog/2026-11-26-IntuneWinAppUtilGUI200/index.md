---
slug: intunewinapputilgui-2-0-0
title: "IntuneWinAppUtil GUI 2.0: package and publish to Intune from the same window"
date: 2026-11-26T12:30:00+01:00
authors: [gioxx]
tags: [intune, intunewinapputilgui, powershell]
---

[IntuneWinAppUtil GUI](/Projects/intunewinapputilgui) 2.0.0 is out on the PowerShell Gallery. Until now the GUI stopped at the `.intunewin` file: you still had to open the Intune admin center, create the Win32 app and upload the package by hand. Version 2.0 takes care of that last step too, with a new **Publish to Intune** tab next to **Package**.

```powershell
Update-Module IntuneWinAppUtilGUI
```

{/* truncate */}

## Publish to Intune

Build a package as usual, then select **Upload to Intune...** in the *Package created* panel: the new tab opens with that package already loaded as a new app. Name, version and publisher come from the same PSAppDeployToolkit or MSI data the Package tab already reads, and for an MSI the install and uninstall commands and a product code detection rule are filled in for you. Any other `.intunewin` can be picked with **Browse**.

From the tab you can:

- **create a new Win32 app**: app information, install and uninstall commands, install and restart behavior, requirements (architectures and minimum Windows release) and detection rules, then **Upload**;
- **update an existing app**: search it by name, change what you need and upload new content, or only change its settings. The settings and the new content are applied together only after the upload has been committed, so if something fails the app in Intune stays as it was.

Detection rules cover MSI product codes, files and folders, registry keys and values, and PowerShell scripts. Version and string checks offer the same comparison operators as the portal, and a rule can be selected in the list and edited in place.

When the upload is done, **Open in Intune** takes you to the app in the admin center, and **Start over** clears both tabs for the next package.

The feature is a **preview**: assignments, the app icon, supersedence, dependencies and custom return codes are not handled yet, so set those in the portal. The [Publish to Intune](/Projects/intunewinapputilgui/publish-to-intune) page has every detail, including the network endpoints the PC needs to reach.

## Signing in

The tab signs in through Microsoft Graph with your Microsoft account, using Microsoft's *Microsoft Graph Command Line Tools* app. The first time, if the `Microsoft.Graph.Authentication` module is missing, **Install now** installs it for the current user. The account needs permission to manage Intune apps, and the app needs consent for `DeviceManagementApps.ReadWrite.All` in your tenant.

If your tenant requires its own app registration, the arrow next to **Sign in** lets you use one with your Client ID and Tenant ID. This is an **alpha** feature: the Microsoft account stays the recommended way.

## Check for updates of IntuneWinAppUtil.exe

Under the tool path, **Check for updates** compares the version of your `IntuneWinAppUtil.exe` with the latest release and downloads it only when yours is older. **Version history** opens the [list of IntuneWinAppUtil.exe releases](/Projects/intunewinapputilgui/tool-versions) kept in this KB.

## A new look

The header now has two tabs and a new color, and `Ctrl+Tab` switches between them. Help, the update check, the tool download and the exit confirmation open as panels inside the window instead of separate message boxes.

## Fixes

- A path pasted with quotes, as Explorer's **Copy as path** does, now has them removed, so the setup file is found in the source folder again.
- Updating an app keeps the version of the package being uploaded, keeps the "no architecture check" setting and keeps rules Intune returns without their content.
- A failed create no longer leads to a second app, and uploads retry only temporary errors.

The full list of changes is in the [release notes](https://github.com/gioxx/IntuneWinAppUtilGUI/releases/tag/v2.0.0).
