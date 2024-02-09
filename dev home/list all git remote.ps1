
# 定义输出文件路径
$outputFile = "G:\code\RemoteUrls.txt"

# 清空或创建新的输出文件

if ( Test-Path -Path $outputFile -Type Leaf) {
    Clear-Content -Path $outputFile -Force
}
else {
    Out-File -FilePath $outputFile utf8
}
# | Where-Object { $_.Name -eq ".git" }
# 遍历目录并查找.git目录
Get-ChildItem -Path "G:\" -Depth 5 -Recurse -Directory -Force -Filter ".git"  |  ForEach-Object {

    # 获取当前.git所在目录的父目录（即项目根目录）
    $projectRoot = $_.Parent.FullName
    Write-Output $projectRoot
    # 切换到项目根目录并获取远程URL
    Push-Location $projectRoot
    try {
        # git remote show会列出远程仓库详细信息，我们提取URL部分
        $remoteInfo = git remote -v
        Write-Output $remoteInfo
        foreach ($line in $remoteInfo) {
            if ($line -match '^\s*(fetch|push)\s+(\S+)\s+(https?://.+)$') {
                $url = $matches[3]
                Write-Output $url
                Add-Content -Path $outputFile -Value "$projectRoot`t$url"
            }
        }
    }
    finally {
        # 确保不管是否成功都返回上一级目录
        Pop-Location
    }
}
#Get-Content -Path $outputFile | Write-Output $_
Write-Output "Git remote URLs have been written to $outputFile."