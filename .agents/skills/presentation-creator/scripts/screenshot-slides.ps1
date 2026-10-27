<#
.SYNOPSIS
  Renders every slide of a tutorial deck to PNG with headless Edge/Chrome for visual QA.

.EXAMPLE
  powershell -ExecutionPolicy Bypass -File .agents/skills/presentation-creator/scripts/screenshot-slides.ps1 -Course agricover-presentation
  # -> writes tutorials/<course>/.screenshots/slide-01.png ... (gitignore-friendly folder)

.NOTES
  Uses the engine's hash navigation (index.html#3 opens slide 3).
  Each browser run is awaited (Start-Process -Wait); running them in parallel drops screenshots.
#>
param(
  [Parameter(Mandatory = $true)][string]$Course,
  [string]$OutDir,
  [int]$Width = 1600,
  [int]$Height = 900
)

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\..\..\..")).Path
$courseDir = Join-Path $repoRoot "tutorials\$Course"
$indexPath = Join-Path $courseDir "index.html"
if (-not (Test-Path $indexPath)) { throw "Course not found: $indexPath" }
if (-not $OutDir) { $OutDir = Join-Path $courseDir ".screenshots" }
New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

$browser = @(
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw "No Edge/Chrome found for headless screenshots." }

# Count slides through Node (same approach as generate_audio.py)
$slidesJs = (Join-Path $courseDir "slides.js") -replace '\\', '/'
$count = node -e "const fs=require('fs');const window={};eval(fs.readFileSync('$slidesJs','utf8'));console.log(window.PRESENTATION_DATA.slides.length)"
if (-not $count) { throw "Could not read slide count from slides.js" }

$url = "file:///" + ($indexPath -replace '\\', '/')
for ($i = 1; $i -le [int]$count; $i++) {
  $png = Join-Path $OutDir ("slide-{0:D2}.png" -f $i)
  Start-Process -Wait -FilePath $browser -ArgumentList @(
    "--headless=new", "--disable-gpu", "--hide-scrollbars", "--mute-audio",
    "--virtual-time-budget=4000", "--window-size=$Width,$Height",
    "--screenshot=$png", "$url#$i"
  )
  Write-Host "[OK] $png"
}
