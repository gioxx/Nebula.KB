---
title: 'IntuneWinAppUtil GUI troubleshooting'
sidebar_label: 'Troubleshooting'
description: 'Common errors and how to fix them.'
sidebar_position: 6
---

| Symptom | What to check |
| --- | --- |
| `Setup file not found.` | The setup file must exist as a full path or relative to the source folder. Clear the field and browse to it again. |
| Path length warning before packaging | A file inside the source folder (shown as "Longest path") or one of the folders is longer than 260 characters. Move the source closer to the drive root or shorten folder names; `IntuneWinAppUtil.exe` can fail with long paths. |
| `IntuneWinAppUtil exited with code -2147024891 (0x80070005)` (access denied) | Update to 1.1.3 or later. Earlier versions started the tool in its own console window, and on some machines it then failed while replacing its temporary package. The output folder (Dropbox, OneDrive or local) is not the cause. |
| `IntuneWinAppUtil exited with code N` | The message includes the Windows error text and the last lines of the tool output. Common causes: files in the source folder locked by other programs and paths that are too long. For the full output, run `Show-IntuneWinAppUtilGUI -Diag` and open the log in `%APPDATA%\IntuneWinAppUtilGUI\logs`. |
| `IntuneWinAppUtil finished, but the expected package was not created` | The tool exited without errors but `<setup file name>.intunewin` did not appear within 10 seconds. Repeat the run with `-Diag` and check the tool output in the log. |
| `Moving the package failed` | The package was created but could not be copied to the output folder, usually because the folder is not writable or another program holds the file. The message shows where the package was kept: copy it by hand. |
| `Download failed` or `IntuneWinAppUtil.exe not found and could not be initialized.` | GitHub is not reachable (proxy, firewall). Download the tool manually and set its path in **IntuneWinAppUtil Path**. |
| No update banner | The update check may be disabled in `config.json` or the Gallery may be unreachable. Run `Show-IntuneWinAppUtilGUI -ShowVersion` to see the result. |
