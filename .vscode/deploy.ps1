Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

$workspaceRoot = Split-Path -Parent $PSScriptRoot
$configPath = Join-Path $workspaceRoot '.vscode\sftp.json'
$config = Get-Content -Raw -Path $configPath | ConvertFrom-Json

$winscpPath = Join-Path $env:LOCALAPPDATA 'Programs\WinSCP\WinSCP.com'
if (-not (Test-Path $winscpPath)) {
  throw "WinSCP.com not found at $winscpPath"
}

$hostKey = 'ssh-ed25519 255 axTHJMNRuc0BaDSmzL2KiEyLlYiGTMoofFi2v7tpS8U'
$encodedPassword = [uri]::EscapeDataString($config.password)

$remotePath = $config.remotePath
$script = @"
option batch abort
option confirm off
open sftp://$($config.username):$encodedPassword@$($config.host)/ -hostkey=`"$hostKey`"
cd $remotePath
synchronize remote -delete -filemask=`"|.git/;.vscode/;node_modules/;scripts/`" `"$workspaceRoot`" `"$remotePath`"
exit
"@

$scriptPath = Join-Path $env:TEMP 'garantistad-deploy.txt'
Set-Content -Path $scriptPath -Value $script -Encoding ASCII

& $winscpPath /script=$scriptPath