---
sidebar_position: 2
title: "Rewrite CSV delimiters"
description: Switch CSV files between comma and semicolon separators while preserving encoding.
hide_title: true
id: csv-delimiter
tags:
  - CSV
  - Tools
  - Nebula.Tools
---

# Rewrite CSV delimiters

`Update-CSVDelimiter` switches CSV files between comma and semicolon separators while preserving encoding.

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
