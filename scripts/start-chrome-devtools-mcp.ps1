param(
    [int]$RemoteDebuggingPort = 9222,
    [string]$UserDataDir = "$env:TEMP\cdp-user-data",
    [string]$LogFile = "$PSScriptRoot\..\logs\chrome-devtools-mcp.log",
    [int]$StartupTimeoutSec = 30
)

function Get-EdgePath {
    $keys = @(
        "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe",
        "HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe"
    )
    foreach ($k in $keys) {
        try {
            $p = (Get-ItemProperty $k -ErrorAction SilentlyContinue)."(default)"
            if ($p -and (Test-Path $p)) { return $p }
        } catch {}
    }

    $candidates = @(
        "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
        "$env:ProgramFiles(x86)\Microsoft\Edge\Application\msedge.exe",
        "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
        "$env:ProgramFiles(x86)\Google\Chrome\Application\chrome.exe"
    )
    foreach ($c in $candidates) {
        if (Test-Path $c) { return $c }
    }
    return $null
}

function Wait-ForPort($port, $timeoutSec) {
    $deadline = [DateTime]::Now.AddSeconds($timeoutSec)
    while ([DateTime]::Now -lt $deadline) {
        $ok = (Test-NetConnection -ComputerName 127.0.0.1 -Port $port -WarningAction SilentlyContinue).TcpTestSucceeded
        if ($ok) { return $true }
        Start-Sleep -Seconds 1
    }
    return $false
}

$edge = Get-EdgePath
if (-not $edge) {
    Write-Error "Edge/Chrome not found. Install Chrome/Edge or set executable path. See AGENTS.md -> Chrome DevTools MCP troubleshooting"
    exit 1
}

# Ensure logs dir exists
$resolvedLogFile = Resolve-Path -LiteralPath $LogFile -ErrorAction SilentlyContinue
if (-not $resolvedLogFile) {
    $logdir = Join-Path $PSScriptRoot "..\logs"
    if (-not (Test-Path $logdir)) { New-Item -ItemType Directory -Force -Path $logdir | Out-Null }
    $resolvedLogFile = (Join-Path $logdir "chrome-devtools-mcp.log")
}

# Ensure user data dir
if (-not (Test-Path $UserDataDir)) { New-Item -ItemType Directory -Force -Path $UserDataDir | Out-Null }

# Try to start browser only if remote debugging port not already open
if (-not (Wait-ForPort $RemoteDebuggingPort 2)) {
    Write-Output "Starting browser ($edge) with remote debugging on port $RemoteDebuggingPort..."
    Start-Process -FilePath $edge -ArgumentList "--remote-debugging-port=$RemoteDebuggingPort","--user-data-dir=$UserDataDir","--no-first-run" -PassThru | Out-Null
    if (-not (Wait-ForPort $RemoteDebuggingPort $StartupTimeoutSec)) {
        Write-Error "Browser did not open remote debugging port $RemoteDebuggingPort within timeout. Check that the browser can be launched with remote debugging."
        exit 1
    } else { Write-Output "Remote debugging port $RemoteDebuggingPort is listening." }
} else {
    Write-Output "Remote debugging port $RemoteDebuggingPort already open. Skipping launching browser."
}

# Start MCP server using bunx (Bun runtime)
Write-Output "Starting chrome-devtools-mcp and attaching to browser..."
$executable = $edge
$bunxArgs = @("chrome-devtools-mcp", "--autoConnect", "--executablePath", "$executable", "--userDataDir", "$UserDataDir", "--logFile", "$resolvedLogFile")

try {
    Start-Process -FilePath "bunx" -ArgumentList $bunxArgs -NoNewWindow -WindowStyle Hidden -PassThru | Out-Null
    Write-Output "Chrome DevTools MCP server started. Logs: $resolvedLogFile"
    Write-Output "If you still see 'MCP error -32000: Connection closed' in the UI, check the logs and make sure the browser didn't close the debugging port or that the WebSocket is accessible (http://127.0.0.1:$RemoteDebuggingPort/json/version)."
} catch {
    Write-Error "Failed to start chrome-devtools-mcp via 'bunx'. Ensure Bun is installed and 'bunx' is on PATH. Error: $_"
    exit 1
}
