# refresh_leads.ps1 - LDL lead monitor wrapper
# Run by scheduled task "LDLLeadMonitorDaily".
# 1. Loads optional secrets from .env.local (SAM_API_KEY, SMTP_USER, SMTP_PASS, EMAIL_TO, EMAIL_CC)
# 2. Runs run.py to fetch + score + rewrite index.html
# 3. If index.html changed, auto-commits + pushes to origin/main so the live
#    GitHub Pages site updates without manual deploy.
# Output appended to lead_monitor.log alongside this script.

$ErrorActionPreference = 'Continue'
$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $RepoRoot

$LogFile = Join-Path $RepoRoot 'lead_monitor.log'

function Log($msg) {
    $stamp = [DateTime]::UtcNow.ToString('yyyy-MM-ddTHH:mm:ssZ')
    Add-Content -Path $LogFile -Value "[$stamp] $msg" -Encoding utf8
}

Log "=== START refresh_leads ==="

# Optional secrets from .env.local (KEY=VALUE per line). File is gitignored.
$envFile = Join-Path $RepoRoot '.env.local'
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.+?)\s*$') {
            Set-Item -Path "env:$($matches[1])" -Value $matches[2]
        }
    }
    Log "loaded env from .env.local"
} else {
    Log "no .env.local present (SAM.gov + email skipped)"
}

# Run the monitor under python.exe (NOT pythonw) so stdout/stderr work.
$python = 'C:\Users\denni\AppData\Local\Python\pythoncore-3.14-64\python.exe'
if (-not (Test-Path $python)) { $python = 'python' }
try {
    $runOutput = & $python (Join-Path $RepoRoot 'run.py') 2>&1
    $runOutput | ForEach-Object { Log "  $_" }
} catch {
    Log "ERROR running run.py: $_"
    Log "=== END refresh_leads (with error) ==="
    exit 1
}

# Auto-commit + push only if index.html actually changed
$status = & git status --porcelain index.html 2>&1
if ($status) {
    $stamp = [DateTime]::UtcNow.ToString('yyyy-MM-dd HH:mm') + ' UTC'
    & git add index.html 2>&1 | ForEach-Object { Log "  git: $_" }
    & git commit -m "Refresh leads dashboard $stamp" 2>&1 | ForEach-Object { Log "  git: $_" }
    & git push origin main 2>&1 | ForEach-Object { Log "  git: $_" }
    Log "pushed refresh to origin/main"
} else {
    Log "no changes to index.html - nothing to push"
}

Log "=== END refresh_leads ==="
