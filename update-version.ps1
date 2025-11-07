# PowerShell script to update version for Windows users
# This script increments the version number for cache busting

$versionFile = "version.txt"
$htmlFile = "index.html"

# Read current version
if (Test-Path $versionFile) {
    $currentVersion = (Get-Content $versionFile).Trim()
} else {
    $currentVersion = "1.0.0"
}

# Parse and increment version
$versionParts = $currentVersion -split '\.'
$major = [int]$versionParts[0]
$minor = [int]$versionParts[1]
$patch = [int]$versionParts[2]
$patch++

$newVersion = "$major.$minor.$patch"

# Update version.txt
Set-Content -Path $versionFile -Value $newVersion

# Update version in index.html
if (Test-Path $htmlFile) {
    $htmlContent = Get-Content $htmlFile -Raw
    $htmlContent = $htmlContent -replace 'content="[0-9]+\.[0-9]+\.[0-9]+"', "content=`"$newVersion`""
    Set-Content -Path $htmlFile -Value $htmlContent -NoNewline
}

Write-Host "Version updated to $newVersion" -ForegroundColor Green

