# 🛠️ Project Maintenance Guide

This document describes the **recommended maintenance operations** for the project (Docusaurus / Node), with the goal of:

* keeping dependencies up to date and secure
* avoiding build warnings and issues
* having a repeatable, low-stress maintenance process

---

## 📆 When to perform maintenance

Run these steps when:

* GitHub reports **security vulnerabilities** (Dependabot / Security alerts)
* you upgrade Node or npm
* the build starts showing unusual warnings
* every **2–3 months** as routine maintenance

---

## 1️⃣ Dependency alignment

From the project root:

```bash
npm install
```

This is used to:

* realign the dependency tree
* apply any configured `overrides`
* update the `package-lock.json`

---

## 2️⃣ Security audit

Check for known vulnerabilities:

```bash
npm audit
```

If issues are reported:

```bash
npm audit fix
```

### ⚠️ Important note

* Always prefer **`npm audit fix`**
* Avoid `npm audit fix --force` unless absolutely necessary (it may introduce breaking changes)

---

## 3️⃣ Identify problematic dependencies

When a vulnerability affects a **transitive dependency**, identify which package pulls it in:

```bash
npm ls <package-name>
```

Examples:

```bash
npm ls qs
npm ls node-forge
npm ls lodash
```

This helps decide whether to:

* upgrade the parent package
* use `overrides`

---

## 4️⃣ Manual fix with `overrides` (when Dependabot fails)

If Dependabot cannot open a PR:

1. add to `package.json`:

```json
"overrides": {
  "<package>": "<secure-version>"
}
```

2. then run:

```bash
npm install
npm audit
npm run build
```

3. commit **only**:

* `package.json`
* `package-lock.json`

---

## 5️⃣ Build verification (mandatory)

Every maintenance change must be verified with a build:

```bash
npm run build
```

### Clean logs (optional)

If deprecation warnings clutter CI logs:

```bash
NODE_OPTIONS=--no-deprecation npm run build
```

---

## 6️⃣ Docusaurus cache cleanup (when things look wrong)

If Docusaurus:

* reports missing files that no longer exist
* shows outdated or ghost sidebars
* keeps stale content

run:

```bash
npm run clear
npm run build
```

---

## 7️⃣ Browser baseline data update

If the build shows a `baseline-browser-mapping` warning:

```bash
npm i baseline-browser-mapping@latest -D
```

Then verify with a new build.

---

## 8️⃣ What to commit (and what not)

### ✅ Commit

* `package.json`
* `package-lock.json`

### ❌ Do NOT commit

* `node_modules/`
* local caches
* generated build artifacts (unless part of your workflow)

---

## 🧠 Quick checklist (TL;DR)

```bash
npm install
npm audit
npm audit fix
npm run build
```

If something feels off:

```bash
npm run clear
```
