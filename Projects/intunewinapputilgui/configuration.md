---
title: 'IntuneWinAppUtil GUI configuration'
sidebar_label: 'Configuration'
description: 'IntuneWinAppUtil.exe download and cache, config.json, update check and keyboard shortcuts.'
sidebar_position: 4
---

## IntuneWinAppUtil.exe: download and cache
When packaging, the tool is taken from:
1. the **IntuneWinAppUtil Path** field, if it points to an existing file;
2. otherwise the cached copy in `%APPDATA%\IntuneWinAppUtilGUI\bin\IntuneWinAppUtil.exe`;
3. otherwise a fresh download, saved to the cache.

The download takes [microsoft/Microsoft-Win32-Content-Prep-Tool](https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool) as a ZIP archive over TLS 1.2, extracts `IntuneWinAppUtil.exe` and removes the temporary files. The cached copy is replaced only after the new one has been downloaded.

- **Check for updates** (2.0.0 and later), next to the tool version, compares the FileVersion of the selected tool with the latest release and offers the download only when yours is older. It downloads that exact release.
- **Force download** downloads the tool again in any case, from the repository's `master` branch.

The FileVersion shown under the field tells you which release you have; [IntuneWinAppUtil.exe versions](./tool-versions.mdx) maps FileVersions to Microsoft's releases (**Version history** in the window opens it).

## Configuration file
Settings are stored in `%APPDATA%\IntuneWinAppUtilGUI\config.json`. The file is written when the window closes, after each successful package, when you click **Clear recent** and when you change the Intune sign-in method:

```json
{
  "ToolPath": "C:\\Users\\alice\\AppData\\Roaming\\IntuneWinAppUtilGUI\\bin\\IntuneWinAppUtil.exe",
  "UpdateCheckEnabled": true,
  "RecentOutputFolders": [
    "D:\\Packages\\Contoso",
    "D:\\Packages"
  ],
  "IntuneSignInMethod": "Microsoft",
  "IntuneClientId": "",
  "IntuneTenantId": ""
}
```

| Key | Meaning |
| --- | --- |
| `ToolPath` | Path loaded into the IntuneWinAppUtil Path field at startup, if the file still exists. |
| `UpdateCheckEnabled` | `true` (default) checks the PowerShell Gallery for a newer module version at startup. Set it to `false` to turn the check off, for example on machines without internet access. |
| `RecentOutputFolders` | The last 10 output folders used for a successful package, most recent first (1.1.4 and later). They fill the Output Folder drop-down. |
| `IntuneSignInMethod` | Publish to Intune sign-in (2.0.0 and later): `Microsoft` (your Microsoft account, the default) or `AppRegistration` (alpha). Set from the arrow next to **Sign in**. |
| `IntuneClientId`, `IntuneTenantId` | The app registration used with `AppRegistration`: Client ID (GUID) and Tenant ID (GUID or domain). They stay saved when you switch back to the Microsoft account. Invalid values are ignored, with a warning in the tab. |

Other field values are not saved.

## Update check
At startup the GUI asks the PowerShell Gallery for the latest version of the module, in the background and with a 10-second timeout, so the window opens straight away. It uses `Find-Module` and falls back to the Gallery API if needed. When a newer version exists, a banner suggests running:

```powershell
Update-Module IntuneWinAppUtilGUI
```

If the Gallery cannot be reached, nothing is shown. Use `-ShowVersion` to see both versions and the error, if any.

## Keyboard shortcuts
| Key | Action |
| --- | --- |
| `Enter` | Run packaging (Package tab only). |
| `Esc` | Close the open panel, or close the window after confirmation. During an upload to Intune it asks whether to stop it. |
| `Ctrl+Tab` | Switch between the Package and Publish to Intune tabs. |
