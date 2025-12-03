---
sidebar_position: 2
title: 'Configuration'
description: Inspect or reload Nebula.Core configuration without re-importing the module.
hide_title: true
id: configuration
tags:
  - Get-NebulaConfig
  - Sync-NebulaConfig
  - Nebula.Core
---

# Configuration helpers

## Get-NebulaConfig
Shows effective configuration, including machine/user config files and license catalog sources.

- No parameters.
- Outputs summary plus tables (active config and license sources).
- For more details or examples, run `Get-Help Get-NebulaConfig -Detailed`.

**Output example**
```powershell
PS C:\Users\john.doe\Downloads> Get-NebulaConfig

ModuleRoot          : C:\Users\john.doe\Documents\GitHub\Nebula.Core
UserConfigPath      : C:\Users\john.doe\.NebulaCore\settings.psd1
UserConfigExists    : True
UserConfigLoaded    : True
MachineConfigPath   : C:\ProgramData\Nebula.Core\settings.psd1
MachineConfigExists : False
MachineConfigLoaded : False

Key                   Value
---                   -----
CSV_DefaultLimiter    ;
CSV_Encoding          ISO-8859-15
DateTimeString_CSV    yyyyMMdd
DateTimeString_Full   dd/MM/yyyy HH:mm:ss
LicenseCacheDays      7
LicenseCacheDirectory C:\Users\john.doe\.NebulaCore\Cache
MaxFieldLength        35
UserConfigRoot        C:\Users\john.doe\.NebulaCore

Source  CacheFile                 FileUrl
------  ---------                 -------
Custom  M365_licenses_custom.json https://raw.githubusercontent.com/gioxx/Nebula.Core/main/JSON/M365_licenses_custom.json
Primary M365_licenses.json        https://raw.githubusercontent.com/gioxx/Nebula.Core/main/JSON/M365_licenses.json

Key                 DefaultValue       CurrentValue
---                 ------------       ------------
CSV_DefaultLimiter  ;                  ;
CSV_Encoding        UTF-8              ISO-8859-15
DateTimeString_Full yyy-MM-dd HH:mm:ss dd/MM/yyyy HH:mm:ss
```

## Sync-NebulaConfig
Reload Nebula.Core configuration in the current session (machine/user PSD1 and environment overrides).

- No parameters.
- For more details or examples, run `Get-Help Sync-NebulaConfig -Detailed`.

**Example**
```powershell
Sync-NebulaConfig
```
