$ErrorActionPreference = 'Stop'

$Root = Split-Path -Parent $PSScriptRoot
$WrapperDir = Join-Path $Root 'apps/android/gradle/wrapper'
$WrapperJar = Join-Path $WrapperDir 'gradle-wrapper.jar'
$WrapperUrl = 'https://raw.githubusercontent.com/gradle/gradle/v8.11.1/gradle/wrapper/gradle-wrapper.jar'
$Expected = '2db75c40782f5e8ba1fc278a5574bab070adccb2d21ca5a6e5ed840888448046'

New-Item -ItemType Directory -Force -Path $WrapperDir | Out-Null

function Test-WrapperChecksum([string]$Path) {
    if (-not (Test-Path $Path)) { return $false }
    return ((Get-FileHash $Path -Algorithm SHA256).Hash.ToLowerInvariant() -eq $Expected)
}

if (Test-WrapperChecksum $WrapperJar) {
    Write-Host 'Gradle 8.11.1 wrapper JAR already present and verified.'
    exit 0
}

$Temp = "$WrapperJar.tmp"
Remove-Item $Temp -Force -ErrorAction SilentlyContinue
Invoke-WebRequest -Uri $WrapperUrl -OutFile $Temp

if (-not (Test-WrapperChecksum $Temp)) {
    Remove-Item $Temp -Force -ErrorAction SilentlyContinue
    throw 'Gradle wrapper JAR checksum verification failed.'
}

Move-Item $Temp $WrapperJar -Force
Write-Host 'Downloaded and verified Gradle 8.11.1 wrapper JAR from the official Gradle source tag.'
