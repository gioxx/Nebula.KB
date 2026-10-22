<img src="static/img/Nebula-Icon-Text.png" alt="Nebula Knowledge Base" height="80" />

# Nebula Knowledge Base
Official documentation for Nebula, available at **[kb.gioxx.org](https://kb.gioxx.org)**

## What's inside
- [Docusaurus](https://docusaurus.io/) with the entire documentation of the Nebula modules and scripts.
- Managed by GitHub and GitHub Actions, the 'compiled' website is located in the `gh-pages` branch.
- Each module (`modules/<Module>`) has two documentation versions: the stable one (PowerShell Gallery) and `Next` (in development). After a Gallery release, promote `Next` with `.\Publish-ModuleDocs.ps1 -Module Core -Version 1.3.1`.

## Extra
- [Maintenance](MAINTENANCE.md)
