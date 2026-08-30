$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot
if (-not $env:RADIOSHARE_KEYSTORE) { throw 'RADIOSHARE_KEYSTORE is required' }
foreach ($name in @('RADIOSHARE_KEYSTORE_PASSWORD','RADIOSHARE_KEY_ALIAS','RADIOSHARE_KEY_PASSWORD')) { if (-not (Get-Item "Env:$name" -ErrorAction SilentlyContinue)) { throw "$name is required" } }
Set-Location $Root
$gradle = if ($env:GRADLE_BIN) { $env:GRADLE_BIN } else { 'gradle' }
& $gradle --no-daemon clean assembleRelease
pnpm install
$env:CSC_IDENTITY_AUTO_DISCOVERY = 'false'
pnpm exec electron-builder --win portable
New-Item -ItemType Directory -Force release | Out-Null
Copy-Item app/build/outputs/apk/release/app-release.apk release/RadioShare-release.apk -Force
Get-ChildItem dist -Filter '*.exe' | Copy-Item -Destination release -Force
Get-ChildItem release -File | Get-FileHash -Algorithm SHA256 | Format-Table | Out-File release/SHA256SUMS.txt
Write-Host 'Release artifacts:'
Get-ChildItem release
