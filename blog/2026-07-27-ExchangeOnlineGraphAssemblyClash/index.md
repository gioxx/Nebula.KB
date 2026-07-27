---
slug: exchange-online-graph-assembly-clash
title: Exchange Online and Microsoft Graph PowerShell assembly clash
date: 2026-07-27T12:00:00+02:00
authors: [gioxx]
tags: [microsoft, exchange, powershell, core]
---

Updating PowerShell and the Microsoft 365 administration modules should be a routine maintenance operation. Unfortunately, a currently open regression can make the latest Exchange Online and Microsoft Graph modules fail when they are used in the same PowerShell 7 session.

The failure has been confirmed with **PowerShell 7.6.4**, **ExchangeOnlineManagement 3.10.1**, and **Microsoft.Graph 2.38.1**. In Nebula, it appears while `Connect-Nebula` is establishing the Microsoft Graph session:

```text
Connect-MgGraph:
InteractiveBrowserCredential authentication failed:
Method not found: '!0
Microsoft.Identity.Client.BaseAbstractApplicationBuilder`1.WithLogging(
Microsoft.IdentityModel.Abstractions.IIdentityLogger, Boolean)'.
```

This is not a permissions, Conditional Access, consent, or token-cache error. It is an **in-process assembly dependency conflict** between Microsoft modules.

{/* truncate */}

:::danger[Current status — July 27, 2026]
The Microsoft Graph PowerShell issue tracking this problem is still open and no generally available vendor fix has been confirmed. Treat the workaround below as temporary and retest it whenever either module is updated.
:::

## Confirmed environment

The condition described in this article was reproduced with the following versions:

| Component | Version |
| --- | --- |
| PowerShell | 7.6.4 |
| ExchangeOnlineManagement | 3.10.1 |
| Microsoft.Graph | 2.38.1 |
| Microsoft.Graph.Authentication | 2.38.1 |

PowerShell 7.6 itself is not the regression. In fact, Microsoft documents PowerShell **7.6.0 or later** as a requirement for ExchangeOnlineManagement 3.10.0 and later because those releases use .NET 10 dependencies.

The same class of failure has existed with earlier module combinations. The current Microsoft Graph report was originally opened for Microsoft.Graph 2.30.0 and ExchangeOnlineManagement 3.9.0, and the exact `WithLogging` failure remains relevant to the newer versions above.

## What is happening

Both ExchangeOnlineManagement and Microsoft.Graph.Authentication ship their own copies of authentication libraries such as:

- `Microsoft.Identity.Client` (MSAL);
- `Microsoft.IdentityModel.Abstractions`;
- `Azure.Identity`;
- `Azure.Core`.

The confirmed module packages do not carry identical dependency versions:

| Module | Microsoft.Identity.Client | Microsoft.IdentityModel.Abstractions |
| --- | --- | --- |
| ExchangeOnlineManagement 3.10.1 | 4.83.1 | 8.19.2 |
| Microsoft.Graph.Authentication 2.38.1 | 4.82.1 | 8.18.0 |

PowerShell hosts binary modules in the same process. Once a dependency has been loaded, another module may resolve that already loaded assembly instead of the copy it was tested with. The result depends on module order and on which authentication code path runs first.

This is why the error reports a missing method even though all modules are installed and individually functional. The caller and the loaded dependency disagree about the method signature available at runtime.

Microsoft explains this general behavior in [Resolving PowerShell module assembly dependency conflicts](https://learn.microsoft.com/powershell/scripting/dev-cross-plat/resolving-dependency-conflicts).

## Why `Connect-Nebula` exposes the problem

`Connect-Nebula` currently follows this sequence:

1. verify or establish the Exchange Online session;
2. verify or establish the Microsoft Graph session.

That sequence is normally convenient, but it means ExchangeOnlineManagement gets the first opportunity to load its authentication stack. When `Connect-MgGraph` subsequently starts interactive authentication, Graph can encounter the incompatible assembly already present in the process and fail with `MissingMethodException`.

The Exchange Online connection shown before the error is therefore valid. Only the following Graph authentication attempt fails.

## Why retrying does not help

The following actions do not normally resolve this specific condition:

- running `Connect-Nebula` again in the same PowerShell window;
- calling `Disconnect-MgGraph` or `Disconnect-ExchangeOnline` and reconnecting;
- removing and importing the PowerShell modules again;
- deleting the Microsoft Graph token cache;
- switching Graph to device-code authentication.

Disconnecting a service session does not unload the .NET assemblies already loaded by the PowerShell process. A **new PowerShell process** is required before testing a different module order.

The upstream issue also documents the error with both delegated user authentication and certificate authentication, so it should not be treated as a problem limited to the browser prompt.

## Keep installed module versions clean

Connection order is not the only way to produce an assembly conflict. PowerShell supports installing multiple module versions side by side, and `Update-Module` does not necessarily remove the versions that were already present. This is useful for rollback, but it can become dangerous when different parts of a binary module family are loaded from different releases.

During verification of this regression, Microsoft Graph authentication succeeded with `Microsoft.Graph.Authentication` 2.36.1 already loaded. A later Nebula license command caused PowerShell to auto-load `Microsoft.Graph.Users` and `Microsoft.Graph.Identity.DirectoryManagement` 2.38.1. Both newer modules required the Authentication assembly from their own 2.38.1 release, producing a second and more explicit failure:

```text
Could not load file or assembly
'Microsoft.Graph.Authentication, Version=2.38.1.0'.
Assembly with same name is already loaded.
```

This is separate from the Exchange Online/Graph `WithLogging` regression described above, but it belongs to the same class of problem: incompatible assemblies have been selected inside one PowerShell process.

`Get-InstalledModule` can make the installation look cleaner than it is because, without `-AllVersions`, it reports only the latest installed version. Always include all versions when auditing Microsoft 365 administration modules:

```powershell
Get-InstalledModule -Name Microsoft.Graph -AllVersions |
    Select-Object Name, Version, InstalledLocation

Get-InstalledModule -Name ExchangeOnlineManagement -AllVersions |
    Select-Object Name, Version, InstalledLocation
```

Microsoft Graph is a metapackage composed of many `Microsoft.Graph.*` modules. Inspect the complete family as well as the module already loaded in memory:

```powershell
Get-Module Microsoft.Graph* -ListAvailable |
    Sort-Object Name, Version |
    Select-Object Name, Version, Path

Get-Module Microsoft.Graph.Authentication |
    Select-Object Name, Version, Path
```

All Graph submodules used in a session should come from one coherent release. For example, Authentication 2.36.1 must not be mixed with Users or Identity.DirectoryManagement 2.38.1.

Before removing obsolete versions, close **every** PowerShell process so that no module DLL remains locked. Keep an older version only when it is part of an intentionally pinned and fully consistent module set. If no rollback set is required, remove the obsolete version from every module path, including both CurrentUser and AllUsers locations.

Cleaning ExchangeOnlineManagement is relatively direct because its releases live under one module name:

```powershell
Uninstall-Module ExchangeOnlineManagement -RequiredVersion 3.8.0 -Force
Uninstall-Module ExchangeOnlineManagement -RequiredVersion 3.9.2 -Force
```

Adjust the versions to match the obsolete releases found on the computer. Microsoft Graph requires more care: uninstalling only the `Microsoft.Graph` metapackage may leave its separately installed `Microsoft.Graph.*` dependencies behind. Inventory the whole family, remove the unwanted release consistently, and follow Microsoft's [Graph module removal guidance](https://learn.microsoft.com/en-us/services-hub/unified/health/remove-graph-module) when a manual cleanup is required.

### Deep-clean Graph before reinstalling the latest release

If the metapackage has already been uninstalled but old `Microsoft.Graph.*` modules remain, or if CurrentUser and AllUsers installations have become mixed, the most deterministic recovery is to remove the entire Graph module family and reinstall one release into one scope.

This is a destructive procedure. Close every PowerShell process, then open a fresh **elevated** PowerShell window. First discover all module roots and preview the exact Graph directories that will be removed:

```powershell
$moduleRoots = $env:PSModulePath -split [IO.Path]::PathSeparator |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) } |
    ForEach-Object { [IO.Path]::GetFullPath($_) } |
    Select-Object -Unique

$graphTargets = foreach ($moduleRoot in $moduleRoots) {
    if (Test-Path -LiteralPath $moduleRoot) {
        Get-ChildItem -LiteralPath $moduleRoot -Directory |
            Where-Object Name -Match '^Microsoft\.Graph(?:\.|$)'
    }
}

$graphTargets | Select-Object FullName
```

Review that list before continuing. The safety checks below refuse to remove a directory unless its parent is one of the discovered module roots and its name belongs to the `Microsoft.Graph` family:

```powershell
foreach ($target in $graphTargets) {
    $targetPath = [IO.Path]::GetFullPath($target.FullName)
    $parentPath = [IO.Path]::GetFullPath($target.Parent.FullName)

    if (
        $moduleRoots -notcontains $parentPath -or
        $target.Name -notmatch '^Microsoft\.Graph(?:\.|$)'
    ) {
        throw "Unexpected path, cleanup stopped: $targetPath"
    }

    Remove-Item -LiteralPath $targetPath -Recurse -Force
}
```

Confirm that no Graph module directory remains in any active module path:

```powershell
foreach ($moduleRoot in $moduleRoots) {
    Get-ChildItem -LiteralPath $moduleRoot -Directory -ErrorAction SilentlyContinue |
        Where-Object Name -Match '^Microsoft\.Graph(?:\.|$)'
}
```

The command must return no results. Reinstall the selected release into a single scope; the verified recovery used Microsoft.Graph 2.38.1 in AllUsers:

```powershell
$graphVersion = '2.38.1'

Install-Module Microsoft.Graph `
    -RequiredVersion $graphVersion `
    -Scope AllUsers `
    -Repository PSGallery `
    -AllowClobber `
    -Force
```

Finally, make sure that every available Graph module belongs to the selected release:

```powershell
Get-Module Microsoft.Graph* -ListAvailable |
    Group-Object Version |
    Select-Object Name, Count

Get-Module Microsoft.Graph* -ListAvailable |
    Where-Object Version -ne $graphVersion |
    Select-Object Name, Version, Path
```

In the verified 2.38.1 installation, the first command returned 40 modules at version 2.38.1 and the second command returned nothing. The module count can change in later Graph releases; the important result is that no other version remains.

Close the cleanup window and open another new PowerShell process before testing authentication or Nebula commands. This guarantees that the test does not reuse an assembly loaded before or during maintenance.

After either a selective cleanup or a full reinstall, confirm the final Exchange Online inventory as well:

```powershell
Get-Module ExchangeOnlineManagement -ListAvailable |
    Sort-Object Version -Descending |
    Select-Object Name, Version, Path
```

:::warning
Do not treat the presence of an older folder as proof that it caused a specific failure: side-by-side versions are supported. The dangerous condition is loading incompatible releases into the same process. A clean module inventory removes that ambiguity and makes regressions much easier to reproduce and support.
:::

## Temporary workaround for Nebula

After confirming that the installed Graph modules form one coherent release, start from a completely new PowerShell 7 window. Import `Nebula.Core` using its public module name, connect to Microsoft Graph first, and then connect to Exchange Online with WAM disabled:

```powershell
Import-Module Nebula.Core

Connect-MgGraph -Scopes 'User.Read.All' -NoWelcome
Connect-EOL -DisableWAM
```

If your task requires additional Graph delegated permissions, request the complete scope set in the first command, before Exchange Online is connected:

```powershell
$scopes = @(
    'User.Read.All'
    'LicenseAssignment.Read.All'
    'Group.ReadWrite.All'
)

Connect-MgGraph -Scopes $scopes -NoWelcome
Connect-EOL -DisableWAM
```

You can verify both contexts without forcing another authentication:

```powershell
Get-MgContext
Get-ConnectionInformation
```

Once both sessions exist, Nebula commands can use them normally. Running `Connect-Nebula` at that point is unnecessary; if invoked without `-ForceReconnect`, it should only validate the sessions that are already active.

`-DisableWAM` does not reintroduce legacy username/password authentication and is unrelated to the deprecated `-Credential` parameter. It tells ExchangeOnlineManagement not to use the Windows Web Account Manager broker for this interactive connection.

:::warning
The exact outcome can vary with module patch versions and other Microsoft modules loaded in the same process. Always begin with a clean PowerShell process and validate the sequence in your environment before adopting it in an operational runbook.
:::

## Other operational options

If the temporary sequence is not suitable, consider one of these alternatives:

- **Process isolation:** run Exchange Online and Microsoft Graph work in separate PowerShell processes. This is the most reliable way to prevent their private dependencies from sharing an assembly load context.
- **Version pinning:** keep a module combination that has been validated in your environment instead of automatically installing the newest release. Record the complete PowerShell, ExchangeOnlineManagement, and Microsoft.Graph version matrix.
- **Wait for a vendor correction:** if the workflow is not urgent, avoid redesigning authentication around an upstream regression and retest after new module releases.

Do not blindly downgrade production modules. Older combinations may have their own defects or support limitations, and a version pair that works on Windows PowerShell 5.1 may behave differently on PowerShell 7.

## This is not MC1248389

[MC1248389](/news/MC1248389) concerns the future removal of the `-Credential` parameter from `Connect-ExchangeOnline` and `Connect-IppsSession`. Microsoft postponed that client-side removal to ExchangeOnlineManagement releases starting in **December 2026**.

Nebula's current interactive connection path does not pass `-Credential`. The assembly clash described here is a separate regression caused by incompatible authentication dependencies and can occur even when using supported modern authentication.

## How to follow the investigation

Use the following sources to track the problem and decide when to remove the workaround:

1. Follow [microsoftgraph/msgraph-sdk-powershell issue #3394](https://github.com/microsoftgraph/msgraph-sdk-powershell/issues/3394). The issue contains reproduction details, affected combinations, and the current workaround.
2. Review [Microsoft Graph PowerShell releases](https://github.com/microsoftgraph/msgraph-sdk-powershell/releases) for authentication dependency updates and references to the issue.
3. Check the [Microsoft.Graph.Authentication version history](https://www.powershellgallery.com/packages/Microsoft.Graph.Authentication) before upgrading.
4. Check the [ExchangeOnlineManagement version history](https://www.powershellgallery.com/packages/ExchangeOnlineManagement) and the [official module requirements](https://learn.microsoft.com/powershell/exchange/exchange-online-powershell-v2).
5. After either module changes, open a fresh PowerShell process and test both connection orders before removing the workaround from scripts or documentation.

For additional field evidence covering the ExchangeOnlineManagement 3.10 and Microsoft.Graph 2.38 generation, see [The Grief and Joys of New PowerShell Releases](https://office365itpros.com/2026/06/22/powershell-woes-and-cmdlets/).

This article will be updated when Microsoft publishes a confirmed fix or a module combination that removes the need for connection ordering and WAM mitigation.
