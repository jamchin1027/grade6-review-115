$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$appRoot = Join-Path $root 'desktop-app'
$depsRoot = Join-Path $appRoot 'deps'
$extractRoot = Join-Path $depsRoot 'webview2-sdk'
$packagePath = Join-Path $depsRoot 'webview2.nupkg'
$stage = Join-Path $root 'downloads\windows-app'
$content = Join-Path $stage 'AppContent'
$zipPath = Join-Path $root 'grade6-final-app.zip'
$version = '1.0.4370.26'
$packageUrl = "https://www.nuget.org/api/v2/package/Microsoft.Web.WebView2/$version"

if (!(Test-Path $packagePath)) {
    New-Item -ItemType Directory -Force $depsRoot | Out-Null
    Invoke-WebRequest -Uri $packageUrl -OutFile $packagePath
}
if (!(Test-Path (Join-Path $extractRoot 'lib\net462\Microsoft.Web.WebView2.Core.dll'))) {
    New-Item -ItemType Directory -Force $extractRoot | Out-Null
    tar.exe -xf $packagePath -C $extractRoot
    if ($LASTEXITCODE -ne 0) { throw 'Unable to extract the WebView2 SDK package.' }
}

node (Join-Path $root 'tools\build-offline.mjs')
if ($LASTEXITCODE -ne 0) { throw 'Unable to build the offline HTML content.' }

if (Test-Path $stage) {
    $resolvedStage = (Resolve-Path $stage).Path
    if (!$resolvedStage.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
        throw "Refusing to replace output outside project: $resolvedStage"
    }
    Remove-Item -LiteralPath $resolvedStage -Recurse -Force
}
New-Item -ItemType Directory -Force $content | Out-Null

$lib = Join-Path $extractRoot 'lib\net462'
$native = Join-Path $extractRoot 'runtimes\win-x64\native'
$compiler = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
$exe = Join-Path $stage 'Grade6Review.exe'
& $compiler /nologo /target:winexe /platform:x64 /out:$exe `
    /reference:"$env:WINDIR\Microsoft.NET\Framework64\v4.0.30319\System.dll" `
    /reference:"$env:WINDIR\Microsoft.NET\Framework64\v4.0.30319\System.Core.dll" `
    /reference:"$env:WINDIR\Microsoft.NET\Framework64\v4.0.30319\System.Drawing.dll" `
    /reference:"$env:WINDIR\Microsoft.NET\Framework64\v4.0.30319\System.Windows.Forms.dll" `
    /reference:"$(Join-Path $lib 'Microsoft.Web.WebView2.Core.dll')" `
    /reference:"$(Join-Path $lib 'Microsoft.Web.WebView2.WinForms.dll')" `
    (Join-Path $appRoot 'Program.cs')
if ($LASTEXITCODE -ne 0) { throw 'C# application compilation failed.' }
Copy-Item (Join-Path $appRoot 'App.config') "$exe.config"

Copy-Item (Join-Path $lib 'Microsoft.Web.WebView2.Core.dll') $stage
Copy-Item (Join-Path $lib 'Microsoft.Web.WebView2.WinForms.dll') $stage
Copy-Item (Join-Path $native 'WebView2Loader.dll') $stage
Copy-Item (Join-Path $extractRoot 'LICENSE.txt') $stage
Copy-Item (Join-Path $extractRoot 'NOTICE.txt') $stage
Copy-Item (Join-Path $root 'downloads\grade6-final-offline.html') (Join-Path $content 'grade6-final-offline.html')
@'
複習小島｜六上期末冒險 Windows APP

使用方式：解壓縮整個 ZIP 資料夾，雙擊「Grade6Review.exe」。不要只搬動 EXE，旁邊的 DLL 和 AppContent 資料夾也是 APP 的一部分。

這是 Windows 桌面程式，不會開啟一般瀏覽器或網址列。內容完整內建，可離線使用。進度保存在目前 Windows 使用者的本機 APP 資料，不會上傳。

需要 Microsoft Edge WebView2 Runtime。Windows 11 通常已包含；若 APP 提示缺少，請先安裝 Microsoft 官方 WebView2 Runtime，再開啟 APP。

若要備份或轉移進度，請在 APP 的「學習紀錄備份」匯出 JSON，並在另一台電腦匯入。
'@ | Set-Content -LiteralPath (Join-Path $stage 'README.txt') -Encoding utf8

if (Test-Path $zipPath) { Remove-Item -LiteralPath $zipPath -Force }
tar.exe -a -c -f $zipPath -C $stage 'Grade6Review.exe' 'Grade6Review.exe.config' 'Microsoft.Web.WebView2.Core.dll' 'Microsoft.Web.WebView2.WinForms.dll' 'WebView2Loader.dll' 'LICENSE.txt' 'NOTICE.txt' 'AppContent' 'README.txt'
if ($LASTEXITCODE -ne 0) { throw 'Unable to package the Windows APP.' }
Remove-Item -LiteralPath $stage -Recurse -Force
Write-Output "Built $zipPath ($((Get-Item $zipPath).Length) bytes)"
