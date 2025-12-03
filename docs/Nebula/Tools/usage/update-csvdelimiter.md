---
sidebar_position: 4
title: "Update-CSVDelimiter"
description: Switch CSV files between comma and semicolon separators while preserving encoding.
hide_title: true
id: update-csvdelimiter
tags:
  - CSV
  - Tools
  - Nebula.Tools
---

# Update-CSVDelimiter

`Update-CSVDelimiter` switches CSV files between comma and semicolon separators while preserving encoding.

## Syntax

```powershell
Update-CSVDelimiter -FilePath <String> [-Encoding <String>] [-ToComma] [-ToSemicolon]
```

## Convert semicolons to commas

```powershell
Update-CSVDelimiter -FilePath 'C:\path\to\file.csv' -ToComma
```

## Convert commas to semicolons with a custom encoding

```powershell
Update-CSVDelimiter -FilePath 'C:\path\to\file.csv' -Encoding 'UTF8' -ToSemicolon
```

### Notes

- Default encoding is `ISO-8859-15`.
- The cmdlet overwrites the target file with the updated delimiter.

## Questions and answers

### What are the default delimiter/encoding values for Update-CSVDelimiter?

Semicolon with `ISO-8859-15` encoding by default. Pass `-Encoding 'UTF8'` if you want UTF-8/UTF-8-BOM.

### Can I convert both ways?

Yes: `-ToComma` converts `;` to `,`, `-ToSemicolon` does the opposite.