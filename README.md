# SPX-IAE Custom CSS Application Customizer

This SharePoint Framework (SPFx) Application Customizer injects custom CSS to modify SharePoint page layout by targeting the class `.w_k_FZA_-aI_E` and adding `margin-top: -50px`.

## Solution Overview

- **Type**: Application Customizer (SPFx Extension)
- **Target**: SharePoint Online
- **Purpose**: Apply custom CSS styling to SharePoint pages
- **SPFx Version**: 1.18.2

## What It Does

This extension automatically injects the following CSS rule into SharePoint pages:

```css
.w_k_FZA_-aI_E {
  margin-top: -50px !important;
}
```

## Prerequisites

- **Node.js v16.13.0 - v16.x OR v18.17.1 - v18.x** (NOT v19, v20, v21, v22+)
  - ⚠️ **Critical**: Node v22 will NOT work - you must downgrade
  - Recommended: Use **Node v18.20.5** or **Node v16.20.2**
- npm 7.x or higher (comes with Node.js)
- SharePoint Online tenant
- Global Administrator or SharePoint Administrator access

### Installing the Correct Node.js Version

If you have Node.js v22 or other incompatible version, use one of these methods:

**Option 1: Using nvm-windows (Recommended)**
```powershell
# Install nvm-windows from: https://github.com/coreybutler/nvm-windows/releases
# Then install Node 18:
nvm install 18.20.5
nvm use 18.20.5
node -v  # Should show v18.20.5
```

**Option 2: Direct Download**
- Download Node.js v18.20.5 from [nodejs.org](https://nodejs.org/dist/v18.20.5/)
- Uninstall current Node.js first
- Install the downloaded version
- Verify: `node -v` should show v18.20.5

## Installation

### 1. Install Dependencies

```powershell
npm install
```

**Note**: If you encounter issues with the global Gulp CLI, install it:
```powershell
npm install -g gulp-cli
```

### 2. Trust the Development Certificate (First Time Only)

```powershell
gulp trust-dev-cert
```

## Development & Testing

### Local Testing

1. Update the `pageUrl` in `config/serve.json` to point to your SharePoint site:
   ```json
   "pageUrl": "https://yourtenant.sharepoint.com/sites/yoursite"
   ```

2. Start the local development server:
   ```powershell
   npm run serve
   ```

3. When prompted in the browser, click **Load debug scripts** to test the extension

### Modify CSS Target (Optional)

You can modify the CSS class and margin value in the `config/serve.json` file:

```json
"properties": {
  "cssClass": "w_k_FZA_-aI_E",
  "marginTop": "-50px"
}
```

## Deployment to SharePoint

### 1. Build the Solution for Production

```powershell
npm run package
```

This creates a `.sppkg` file in the `sharepoint/solution` folder.

### 2. Deploy to App Catalog

**Important**: The App Catalog is at the **tenant level**, not within your site.

1. **Find your App Catalog URL**:
   - **Tenant App Catalog**: `https://innovationae.sharepoint.com/sites/appcatalog`
   - **If you get 404**: You may need to create the app catalog first (see below)

2. Go to **Apps for SharePoint** in the App Catalog

3. Drag and drop the `spx-iae-custom-css.sppkg` file from `solution/` folder

4. When prompted, check **Make this solution available to all sites in the organization**

5. Click **Deploy**

#### If App Catalog Doesn't Exist (404 Error):

1. Go to **SharePoint Admin Center**: `https://innovationae-admin.sharepoint.com`
2. Navigate to **More features** > **Apps** > **Open**
3. Click **App Catalog**
4. If no app catalog exists, click **Create a new app catalog site**
5. Fill in the details and create it
6. Wait 10-15 minutes for provisioning, then return to step 1 above

### 3. Add the Extension to Your Site

**IMPORTANT**: After uploading to App Catalog, you still need to activate it on your site.

#### Method A: Using PnP PowerShell (Recommended - Works Without App Catalog Access)

This method directly activates the extension without needing App Catalog UI access:

```powershell
# Install PnP PowerShell (if not already installed)
Install-Module -Name PnP.PowerShell -Scope CurrentUser

# Connect to your site
Connect-PnPOnline -Url "https://innovationae.sharepoint.com/sites/InnovationArtsEntertainment" -Interactive

# Add the Application Customizer to the site
Add-PnPCustomAction -Name "CustomCSSInjector" `
  -Title "Custom CSS Injector" `
  -Location "ClientSideExtension.ApplicationCustomizer" `
  -ClientSideComponentId "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a" `
  -ClientSideComponentProperties '{"cssClass":"w_k_FZA_-aI_E","marginTop":"-50px"}' `
  -Scope Site
```

#### Method B: Using SharePoint UI

If you deployed tenant-wide and have permissions:

1. The extension may auto-activate if tenant-wide deployment was selected
2. OR go to **Site Contents** > **New** > **App** > Add **spx-iae-custom-css-client-side-solution**

**Note**: If you don't have App Catalog access, use Method A (PnP PowerShell) instead.

### 4. Verify the Deployment

1. Navigate to any page on your SharePoint site
2. Open browser Developer Tools (F12)
3. Inspect the element with class `.w_k_FZA_-aI_E`
4. Verify that `margin-top: -50px !important` is applied

## Configuration

The extension accepts the following properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | string | `w_k_FZA_-aI_E` | The CSS class to target |
| `marginTop` | string | `-50px` | The margin-top value to apply |

### Changing Configuration After Deployment

Using PnP PowerShell:

```powershell
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive

# Get the custom action
$customAction = Get-PnPCustomAction -Scope Site | Where-Object { $_.Title -eq "Custom CSS Injector" }

# Update properties
Set-PnPCustomAction -Identity $customAction.Id `
  -ClientSideComponentProperties '{"cssClass":"your-custom-class","marginTop":"-75px"}' `
  -Scope Site
```

## Removing the Extension

Using PnP PowerShell:

```powershell
Connect-PnPOnline -Url "https://yourtenant.sharepoint.com/sites/yoursite" -Interactive

# Remove the custom action
Remove-PnPCustomAction -Identity "CustomCSSInjector" -Scope Site -Force
```

## Project Structure

```
SPX-IAE/
├── config/                          # Build and deployment configuration
│   ├── config.json                  # Bundle configuration
│   ├── package-solution.json        # Solution metadata
│   └── serve.json                   # Local development settings
├── src/
│   └── extensions/
│       └── customCss/
│           ├── CustomCssApplicationCustomizer.ts        # Main extension code
│           ├── CustomCssApplicationCustomizer.manifest.json
│           └── loc/                 # Localization resources
├── package.json                     # NPM dependencies
├── tsconfig.json                    # TypeScript configuration
└── gulpfile.js                      # Build tasks
```

## Troubleshooting

### Node.js Version Error

If you see: `Your dev environment is running NodeJS version v22.x.x which does not meet the requirements...`

**Solution**: You must use Node.js 16.x or 18.x (NOT v22):

1. **Using nvm-windows**:
   ```powershell
   nvm install 18.20.5
   nvm use 18.20.5
   node -v  # Verify it shows v18.20.5
   ```

2. **Or download directly**: [Node.js v18.20.5](https://nodejs.org/dist/v18.20.5/)

3. After switching Node versions:
   ```powershell
   # Clean install
   Remove-Item node_modules -Recurse -Force
   Remove-Item package-lock.json -Force
   npm install
   ```

### CSS Not Applying

1. **Clear browser cache**: Hard refresh with Ctrl+F5
2. **Check if extension is loaded**: Open Developer Tools > Console > Look for log message
3. **Verify class name**: The SharePoint class name might have changed. Inspect the element to get the current class name.

### Build Errors

- **Node version**: Ensure you're using Node.js 16.x or 18.x
- **Dependencies**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Extension Not Showing

- Verify the extension is activated using:
  ```powershell
  Get-PnPCustomAction -Scope Site
  ```

## Additional Resources

- [SharePoint Framework Documentation](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Application Customizers Overview](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/extensions/get-started/using-page-placeholder-with-extensions)
- [PnP PowerShell Documentation](https://pnp.github.io/powershell/)

## License

MIT

## Support

For issues or questions, please contact your SharePoint administrator.
