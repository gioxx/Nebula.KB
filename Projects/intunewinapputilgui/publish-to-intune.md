---
title: 'Publish to Intune'
sidebar_label: 'Publish to Intune'
description: 'Create or update a Win32 app in Intune from IntuneWinAppUtil GUI: sign-in, new and existing apps, detection rules and upload.'
sidebar_position: 3.5
---

From version 2.0.0, IntuneWinAppUtil GUI can create a Win32 app in Intune, or update an existing one, without opening the Intune admin center. It works through Microsoft Graph and is still a **preview**: the tab lists what it does not handle yet.

## Opening the tab
**Publish to Intune** is the second tab of the main window, next to **Package**. `Ctrl+Tab` switches between them.

- After packaging, **Upload to Intune...** in the *Package created* panel opens the tab with the package you just built, already loaded as a new app. Name, version and publisher come from the same PSAppDeployToolkit or MSI data the Package tab uses.
- Any other `.intunewin` can be picked with **Browse** in the tab.

Switching tab by hand never changes what you filled in.

## Network access
Behind a proxy or a firewall that filters outbound traffic, the PC that publishes needs HTTPS (port 443) access to:

| Endpoint | Used for |
| --- | --- |
| `login.microsoftonline.com` | Signing in. |
| `graph.microsoft.com` | Creating, reading and updating the app in Intune. |
| `*.blob.core.windows.net` | Uploading the package content to the Azure Storage location Intune hands out for each upload. |
| `www.powershellgallery.com`, `cdn.powershellgallery.com`, `cdn.oneget.org` | Installing `Microsoft.Graph.Authentication` with **Install now**, only the first time. |

Microsoft keeps the full, current lists in [Network endpoints for Microsoft Intune](https://learn.microsoft.com/intune/intune-service/fundamentals/intune-endpoints) and [Network access to the PowerShell Gallery](https://learn.microsoft.com/powershell/gallery/getting-started#network-access-to-the-powershell-gallery).

## Signing in
The block at the top right of the tab shows who is signed in, with which app, and the **Sign in** / **Sign out** button.

- **Sign in** uses your **Microsoft account**, through Microsoft's own *Microsoft Graph Command Line Tools* app. This is the recommended way. The blue chip under the account says so.
- The arrow next to the button opens the sign-in method: **Microsoft account** or **App registration** (alpha), plus **App registration settings...**.

The first time, the tab checks for the `Microsoft.Graph.Authentication` module. If it is missing, **Install now** installs it for the current user (`Install-Module Microsoft.Graph.Authentication -Scope CurrentUser`).

The account needs permission to manage Intune apps, and the app it signs in with needs consent for `DeviceManagementApps.ReadWrite.All` in your tenant. If the sign-in asks for admin consent, a tenant administrator has to grant it once.

:::note
Start the GUI from a PowerShell console window (Windows Terminal or the PowerShell console). The Windows sign-in prompt needs a console window to attach to.
:::

### App registration (alpha)
If your tenant blocks the *Microsoft Graph Command Line Tools* app, or requires its own app registration, choose **App registration** from the arrow and fill in **App registration settings...**:

| Field | Value |
| --- | --- |
| Client ID | The app registration's **Application (client) ID**, a GUID. |
| Tenant ID | The **Directory (tenant) ID**, a GUID, or the tenant domain, for example `contoso.onmicrosoft.com`. |

**Save and use** saves them and switches to the app registration. The chip turns orange and shows an **ALPHA** badge. Switching back to the Microsoft account keeps the Client ID and Tenant ID for later. Changing app signs you out, so the next sign-in uses the new one.

In Entra ID, the app registration needs:
- the delegated Microsoft Graph permission `DeviceManagementApps.ReadWrite.All`, with admin consent;
- **Authentication** > **Allow public client flows** set to **Yes**;
- under **Mobile and desktop applications**, two redirect URIs: `ms-appx-web://Microsoft.AAD.BrokerPlugin/<Client ID>` (the Windows sign-in broker) and `http://localhost`.

:::warning[Alpha]
Signing in with your own app registration is still being worked on and has not been tried with every tenant setup. Use the Microsoft account unless your tenant requires an app registration.
:::

## New app
With **New app** selected, the form is prefilled from the package:

- **Name**, **Publisher**, **Version** and **Description**: from PSAppDeployToolkit (`AppName`, `AppVendor`, `AppVersion`) or from the MSI.
- **Install** and **Uninstall command**: `msiexec /i` and `msiexec /x {ProductCode}` for MSI packages; for anything else the install command is the setup file and the uninstall command is up to you.
- **Install behavior** (System or User), **Device restart behavior**, **Max run time**.
- **Requirements**: architectures (x64, x86, arm64) and the minimum Windows release.
- **Detection rules**: an MSI product code rule is added for MSI packages.

**Upload** creates the app, uploads the package content and commits it. Intune shows the package with the `.intunewin` name chosen when packaging. New apps get the same default return codes as the Intune portal (0, 1707, 3010, 1641, 1618).

## Update an existing app
1. Choose **Update existing**.
2. Search the app by name (leave the box empty to list every Win32 app) and select it. Its settings are loaded into the form.
3. Change what you need. Leave **Upload the package content** checked to replace the content with the selected package, or uncheck it to change the settings only.
4. Select **Upload**.

When you upload new content, the **Version** becomes the one of the package being uploaded. The other fields stay as they are in Intune.

The settings and the new content are applied together, only after the upload has been committed. If anything fails, the app in Intune stays as it was.

A few things are kept exactly as Intune has them:
- **Requirement rules** set in the portal.
- **Detection rules**, as long as you do not change them in the tab. This also covers script rules that Graph returns without their content.
- An app with **Check operating system architecture: No**. Leave every architecture unchecked to keep it so; checking one turns the check on.

## Detection rules
| Rule | What it checks |
| --- | --- |
| MSI product code | The MSI product code is installed. |
| File or folder | A file or folder exists, optionally with a minimum version. |
| Registry | A key or value exists, optionally with a string or a minimum version. |
| PowerShell script | A `.ps1` detection script (up to 200 KB), optionally run as 32-bit and with signature check. |

For the version used by file rules, see [Get-IntuneFileVersion](./detection-helpers.md#get-intunefileversion).

## After the upload
The *App created in Intune* (or *App updated*) panel offers **Open in Intune**, which opens the app in the Intune admin center, and **Start over**, which clears both tabs and goes back to Package for the next app. **Clear**, on either tab, does the same without leaving the tab. You stay signed in. After a new app is created, the tab switches to that app, so further changes update it instead of creating a second one.

If a create fails after the app was made in Intune, the tab switches to that app and offers **Retry upload** to send the package to it.

## Not handled yet
Assignments, the app icon, supersedence, dependencies and custom return codes (Intune defaults are used). Set them in the portal through **Open in Intune**.
