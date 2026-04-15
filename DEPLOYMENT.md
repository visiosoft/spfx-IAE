# SPX-IAE Custom CSS — Deployment Guide

This extension injects custom CSS and UI tweaks into a **single target SharePoint site only**.  
It will silently do nothing on every other site, even if deployed tenant-wide.

---

## Prerequisites

| Requirement | Detail |
|---|---|
| Node.js | **18.x** (SPFx 1.18.2 rejects Node 19/20) |
| PnP PowerShell | `Install-Module PnP.PowerShell` |
| SharePoint Admin | Tenant admin or App Catalog owner |

> **Node version note:** The machine likely has Node 20 installed globally. All `gulp` commands below use a temporary Node 18 runtime via `npx -p node@18.19.1` — no global change needed.

---

## Step 1 — Configure Your Target Site URL

Before building, set `siteUrl` in two places:

### 1a. `sharepoint/assets/ClientSideInstance.xml`

```xml
Properties="{
  &quot;cssClass&quot;:&quot;w_k_FZA_-aI_E&quot;,
  &quot;marginTop&quot;:&quot;0px&quot;,
  &quot;siteUrl&quot;:&quot;https://yourtenant.sharepoint.com/sites/your-site&quot;
}"
```

Replace `https://yourtenant.sharepoint.com/sites/your-site` with your actual SharePoint site collection URL. No trailing slash.

### 1b. PowerShell deployment command (Step 5)

You will also pass the same URL in the `-ClientSideComponentProperties` parameter (see Step 5).

---

## Step 2 — Build the Production Bundle

```powershell
cd "D:\NKU Projects\SPX-IAE"

npx -p node@18.19.1 node .\node_modules\gulp\bin\gulp.js bundle --ship
```

Expected output:
```
Build target: SHIP
Finished 'bundle' ...
==================[ Finished ]==================
```

No errors should appear. Warnings about `includeClientSideAssets` are safe to ignore here.

---

## Step 3 — Package the Solution

```powershell
npx -p node@18.19.1 node .\node_modules\gulp\bin\gulp.js package-solution --ship
```

Expected output confirms assets are embedded:
```
Build target: SHIP
Found client-side build resource: custom-css-application-customizer_*.js
Found client-side build resource: CustomCssApplicationCustomizerStrings_en-us_*.js
Created file: sharepoint/solution/spx-iae-custom-css.sppkg
ALL DONE!
```

The output file is: **`sharepoint/solution/spx-iae-custom-css.sppkg`**

---

## Step 4 — Upload to the App Catalog

1. Go to **SharePoint Admin Center** → **More features** → **Apps** → **App Catalog**
2. Click **Apps for SharePoint** in the left nav
3. Click **Upload** and select `sharepoint/solution/spx-iae-custom-css.sppkg`
4. In the dialog that appears:
   - ✅ Check **"Make this solution available to all sites in the organization"**
   - Click **Deploy**

> Even though it says "all sites", the code's `siteUrl` guard means it will **only activate CSS on your configured site**. All other sites load the extension but it exits immediately.

---

## Step 5 — Register the Extension on Your Target Site (PowerShell)

This step activates the extension on the specific site only. Run this **once**.

```powershell
# Install PnP PowerShell if not already installed
Install-Module PnP.PowerShell -Scope CurrentUser -Force

# Connect to your target site (not admin center)
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/your-site" -Interactive

# Register the Application Customizer on this site only
Add-PnPCustomAction `
    -Title "CustomCssApplicationCustomizer" `
    -Name "CustomCssApplicationCustomizer" `
    -Location "ClientSideExtension.ApplicationCustomizer" `
    -ClientSideComponentId "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a" `
    -ClientSideComponentProperties '{"cssClass":"w_k_FZA_-aI_E","marginTop":"0px","siteUrl":"https://yourtenant.sharepoint.com/sites/your-site"}' `
    -Scope Site
```

**Replace both instances of the URL** with your actual site URL.

---

## Step 6 — Verify

1. Browse to your target site on a modern SharePoint page
2. Open browser DevTools → **Console** tab
3. Look for the log entry:
   ```
   CustomCssApplicationCustomizer Initialized Custom CSS Application Customizer
   ```
4. Check **Elements** tab — confirm the `<style>` tag is present in `<head>` with your CSS rules
5. Visually confirm web part headers are hidden and the topic header shows the welcome message

### Verify it does NOT affect other sites

1. Browse to any **other** SharePoint site on the tenant
2. Open browser DevTools → **Console** tab
3. You should see:
   ```
   CustomCssApplicationCustomizer Skipping — current site does not match configured siteUrl.
   ```
4. No CSS changes should be visible on that site

---

## Step 7 — Updating / Re-deploying

When code or CSS changes are made:

1. Bump the version in `config/package-solution.json`:
   ```json
   "version": "1.0.1.0"
   ```
2. Re-run Steps 2 and 3 (bundle + package)
3. Go to the App Catalog, find `spx-iae-custom-css`, click **...** → **Replace** → upload the new `.sppkg` → **Deploy**
4. No PowerShell re-registration needed unless the component ID changes

---

## Removing the Extension

```powershell
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/your-site" -Interactive

# Find the custom action
Get-PnPCustomAction -Scope Site | Where-Object { $_.Name -eq "CustomCssApplicationCustomizer" }

# Remove it
Remove-PnPCustomAction -Identity "<Id from above>" -Scope Site
```

Then retract the `.sppkg` from the App Catalog if no longer needed.

---

## Summary

```
Build  →  bundle --ship  →  package-solution --ship  →  upload .sppkg  →  Add-PnPCustomAction (Site scope)
```

| File | Purpose |
|---|---|
| `src/extensions/customCss/CustomCssApplicationCustomizer.ts` | Extension logic + site URL guard |
| `sharepoint/assets/ClientSideInstance.xml` | Feature provisioning properties |
| `config/package-solution.json` | Solution metadata and versioning |
| `sharepoint/solution/spx-iae-custom-css.sppkg` | Final deployable package |
