# Debug SPFx ApplicationCustomizer Extension

This guide helps you debug and fix issues with the Custom CSS ApplicationCustomizer extension not appearing on your SharePoint site.
✔ App deployed
✔ Tenant-wide checkbox enabled
✔ Added in TenantWideExtensions list
✔ Correct ComponentId
✔ Correct Location
✔ Hard refresh done
## Prerequisites

```powershell
# Install PnP PowerShell if you haven't already
Install-Module PnP.PowerShell -Scope CurrentUser
```

---

## Step 1: Connect to Your SharePoint Site

```powershell
# Replace with your actual site URL
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive
```

---

## Step 2: Check if App is Installed

```powershell
# List all installed apps on the site
Get-PnPApp

# Check specifically for your app (look for "spx-iae-custom-css")
Get-PnPApp | Where-Object { $_.Title -like "*custom*css*" }
```

### If App is Not Installed:

```powershell
# First, deploy to tenant app catalog
Connect-PnPOnline -Url "https://yourtenant-admin.sharepoint.com" -Interactive
Add-PnPApp -Path "d:\NKU Projects\SPX-IAE\sharepoint\solution\spx-iae-custom-css.sppkg" -Scope Tenant -Publish -Overwrite

# Then connect back to your site and install the app
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive
Install-PnPApp -Identity "a4c5e2f8-9b7d-4e3a-8f6c-1d2e3f4a5b6c"
```

---

## Step 3: Check Feature Activation

```powershell
# List all site-scoped features
Get-PnPFeature -Scope Site

# Check for your specific feature
Get-PnPFeature -Scope Site -Identity "b5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f"
```

### If Feature is Not Active:

```powershell
# Activate the feature
Enable-PnPFeature -Identity "b5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f" -Scope Site -Force
```

---

## Step 4: Check CustomAction Registration (MOST IMPORTANT!)

```powershell
# List all custom actions
Get-PnPCustomAction -Scope Site | Format-Table Name, Title, Location, ClientSideComponentId

# Check specifically for your ApplicationCustomizer
$customAction = Get-PnPCustomAction -Scope Site | Where-Object { $_.ClientSideComponentId -eq "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a" }

if ($customAction) {
    Write-Host "✓ CustomAction found!" -ForegroundColor Green
    $customAction | Format-List *
} else {
    Write-Host "✗ CustomAction NOT found - this is the problem!" -ForegroundColor Red
}
```

---

## Step 5: Manually Add CustomAction (If Not Found)

```powershell
# Add the ApplicationCustomizer to the site
Add-PnPCustomAction `
    -Name "CustomCssApplicationCustomizer" `
    -Title "Custom CSS Application Customizer" `
    -Location "ClientSideExtension.ApplicationCustomizer" `
    -ClientSideComponentId "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a" `
    -ClientSideComponentProperties '{"cssClass":"w_k_FZA_-aI_E","marginTop":"0px"}' `
    -Scope Site

Write-Host "✓ CustomAction added successfully!" -ForegroundColor Green
```

---

## Step 6: Verify It's Working

```powershell
# Verify the CustomAction is registered
Get-PnPCustomAction -Scope Site | Where-Object { $_.ClientSideComponentId -eq "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a" } | Format-List *
```

After running this, **refresh your browser** with `Ctrl + F5` (hard refresh) and check if the extension appears.

---

## Complete Diagnostic Script

Run this script to check all components at once:

```powershell
# Connect to your site
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  SPFx Extension Diagnostic Report" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check App Installation
Write-Host "=== 1. Checking App Installation ===" -ForegroundColor Yellow
$app = Get-PnPApp | Where-Object { $_.Id -eq "a4c5e2f8-9b7d-4e3a-8f6c-1d2e3f4a5b6c" }
if ($app) {
    Write-Host "✓ App is installed" -ForegroundColor Green
    $app | Format-List Title, AppCatalogVersion, InstalledVersion, IsEnabled
} else {
    Write-Host "✗ App is NOT installed" -ForegroundColor Red
    Write-Host "  Run Step 2 commands to install" -ForegroundColor Yellow
}

# Check Feature Activation
Write-Host "`n=== 2. Checking Feature Activation ===" -ForegroundColor Yellow
$feature = Get-PnPFeature -Scope Site -Identity "b5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f" -ErrorAction SilentlyContinue
if ($feature) {
    Write-Host "✓ Feature is active" -ForegroundColor Green
    $feature | Format-List DisplayName, DefinitionId
} else {
    Write-Host "✗ Feature is NOT active" -ForegroundColor Red
    Write-Host "  Run Step 3 commands to activate" -ForegroundColor Yellow
}

# Check CustomAction Registration
Write-Host "`n=== 3. Checking CustomAction Registration ===" -ForegroundColor Yellow
$ca = Get-PnPCustomAction -Scope Site | Where-Object { $_.ClientSideComponentId -eq "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a" }
if ($ca) {
    Write-Host "✓ CustomAction is registered" -ForegroundColor Green
    $ca | Format-List Name, Title, Location, ClientSideComponentId, ClientSideComponentProperties
} else {
    Write-Host "✗ CustomAction is NOT registered - THIS IS THE MOST COMMON ISSUE!" -ForegroundColor Red
    Write-Host "  Run Step 5 commands to add it manually" -ForegroundColor Yellow
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Diagnostic Complete" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan
```

---

## Optional: Remove CustomAction (Start Over)

If you need to remove and re-add the CustomAction:

```powershell
# List all custom actions with their IDs
Get-PnPCustomAction -Scope Site | Format-Table Id, Name, Title

# Remove the CustomAction by ID (replace <guid> with actual ID from list above)
Remove-PnPCustomAction -Identity <guid> -Scope Site -Force

# Then re-add it using Step 5 commands
```

---

## Browser Debugging

After running the PowerShell commands, check in your browser:

### Open Browser DevTools (F12):

**Console Tab:**
- Look for: `"Initialized Custom CSS Application Customizer"`
- Check for any errors in red

**Network Tab:**
- Filter by "custom-css"
- Verify `custom-css-application-customizer.js` loads (status 200)

**Hard Refresh:**
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| CustomAction not found | Run **Step 5** to manually add it |
| Feature not active | Run **Step 3** to activate feature |
| App not installed | Run **Step 2** to install app |
| Changes not appearing | Clear browser cache / hard refresh (Ctrl+F5) |
| Permission denied | Ensure you're Site Collection Admin |
| skipFeatureDeployment not working | Set to `false` in package-solution.json, rebuild, redeploy |

---

## Quick Fix Command

If diagnostics show CustomAction is missing, run this:

```powershell
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive

Add-PnPCustomAction `
    -Name "CustomCssApplicationCustomizer" `
    -Title "Custom CSS Application Customizer" `
    -Location "ClientSideExtension.ApplicationCustomizer" `
    -ClientSideComponentId "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a" `
    -ClientSideComponentProperties '{"cssClass":"w_k_FZA_-aI_E","marginTop":"0px"}' `
    -Scope Site

Write-Host "`n✓ Done! Refresh your browser with Ctrl+F5" -ForegroundColor Green
```

---

## Extension IDs Reference

For your reference, these are the IDs used in your extension:

- **Solution ID:** `a4c5e2f8-9b7d-4e3a-8f6c-1d2e3f4a5b6c`
- **Feature ID:** `b5d6e7f8-a9b0-4c1d-8e2f-3a4b5c6d7e8f`
- **Component ID:** `a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a`
- **Properties:** `{"cssClass":"w_k_FZA_-aI_E","marginTop":"0px"}`

---

## Need More Help?

If the extension still doesn't appear after following all steps:

1. Check SharePoint tenant settings (custom scripts must be allowed)
2. Verify you have Site Collection Administrator permissions
3. Try deploying to a different site to isolate the issue
4. Check if there are any Content Security Policy restrictions
5. Review SharePoint ULS logs for detailed errors
