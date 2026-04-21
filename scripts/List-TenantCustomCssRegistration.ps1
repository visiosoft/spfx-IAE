param(
    [Parameter(Mandatory = $true)]
    [string]$TenantName,

    [string]$ComponentId = "a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a",

    [string]$CustomActionName = "CustomCssApplicationCustomizer",

    [string]$OutputPath = ".\\tenant-custom-css-registrations.csv"
)

$adminUrl = "https://$TenantName-admin.sharepoint.com"

Write-Host "Connecting to admin center: $adminUrl" -ForegroundColor Cyan
Connect-PnPOnline -Url $adminUrl -Interactive

Write-Host "Loading tenant sites..." -ForegroundColor Cyan
$sites = Get-PnPTenantSite -Detailed

$results = foreach ($site in $sites) {
    try {
        Write-Host "Checking $($site.Url)" -ForegroundColor Yellow
        Connect-PnPOnline -Url $site.Url -Interactive

        $customActions = Get-PnPCustomAction -Scope Site -ErrorAction Stop |
        Where-Object {
            $_.ClientSideComponentId -eq $ComponentId -or
            $_.Name -eq $CustomActionName -or
            $_.Title -eq $CustomActionName
        }

        if (-not $customActions) {
            continue
        }

        foreach ($customAction in $customActions) {
            [PSCustomObject]@{
                SiteUrl                       = $site.Url
                SiteTitle                     = $site.Title
                CustomActionId                = $customAction.Id
                Name                          = $customAction.Name
                Title                         = $customAction.Title
                Location                      = $customAction.Location
                ClientSideComponentId         = $customAction.ClientSideComponentId
                ClientSideComponentProperties = $customAction.ClientSideComponentProperties
            }
        }
    }
    catch {
        [PSCustomObject]@{
            SiteUrl                       = $site.Url
            SiteTitle                     = $site.Title
            CustomActionId                = "ERROR"
            Name                          = "ERROR"
            Title                         = "ERROR"
            Location                      = "ERROR"
            ClientSideComponentId         = "ERROR"
            ClientSideComponentProperties = $_.Exception.Message
        }
    }
}

$results | Export-Csv -Path $OutputPath -NoTypeInformation

Write-Host "Registration list written to $OutputPath" -ForegroundColor Green
$results | Format-Table -AutoSize