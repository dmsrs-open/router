# 定义输出文件路径
$outputFile = "GithubUrls_$(Get-Date -Format 'yyyyMMddHHmm').json"

$regex = [Regex]"(\w+)([\s]+|[(\t)]+)([@\w:\/.-]+)[\s]+\((\w+)\)"
function Test-GitUrl {
	param(
		[Parameter(Mandatory = $true)] # 表示这个参数是必须的
		[string]$RemoteUrl # 定义一个字符串类型的参数，表示远程仓库的 URL
	)
	# 尝试列出远程仓库的引用，如果成功，返回 $true，如果失败，返回 $false
	git ls-remote $RemoteUrl > $null # 将输出重定向到空，避免显示在控制台
	return $LASTEXITCODE -eq 0
}
# 遍历目录并查找.git目录，同时处理远程仓库信息
Get-ChildItem -Path "G:\" -Depth 5 -Directory -Force -Filter ".git" |
ForEach-Object {
	# 获取当前.git所在目录的父目录（即项目根目录）
	$projectRoot = $_.Parent.FullName

	Push-Location $projectRoot
	try {
		$remotes = git remote -v
		if ($remotes) {
			foreach ($remote in $remotes) {
				if ($match = $regex.Match($_)) {
					if ($match.Groups.Count -ge 4) {
						$remoteName = $match.Groups[1].Value
						$action = $match.Groups[4].Value
						$url = $match.Groups[3].Value

						# 这里假设Test-GitUrl函数可以直接在管道中调用，并返回布尔值
						# 注：实际上在管道中直接进行网络访问可能会导致性能问题和异步问题，这里仅作示例
						if (Test-GitUrl -RemoteUrl $url) {
							if (-not ($repositories[$projectRoot])) {
								$repositories[$projectRoot] = @{}
							}
							if (-not($repositories[$projectRoot][$remoteName])) {
								$repositories[$projectRoot][$remoteName] = @{}
							}
							$repositories[$projectRoot][$remoteName][$action] = $url
						}
						else {
							Write-Output "Remote Url '$url' can't access, it can't be restored. $projectRoot"
						}
					}
				}
				else {
					# 此处无法通过管道实现，因为需要根据已有键动态生成新的键名
					# 可以考虑将这部分逻辑放入单独的函数或脚本块内
				}
			}
		}
		else {
			Write-Host "not valid git repo. $projectRoot"
		}
	}
	finally {
		Pop-Location
	}
} | Out-Null # 忽略这段处理的输出结果，因为我们关注的是最终的$repositories变量

# 将处理后的结果转为JSON并写入文件
$repositories | ConvertTo-Json -Depth 5 | Set-Content -Path $outputFile

Write-Output "Git remote URLs have been written to $outputFile."