# origin\tgit@github.com:cnjimbo/cnjimbo.github.io.git (push)
# 定义输出文件路径
$outputFile = "./GithubUrls.json" #_$(Get-Date -Format "yyyyMMddHHmm")

$regex = [Regex]"(\w+)([ \s]+|[(\\t)]+)([@\w:\/\.-]+)[ \s]+\((\w+)\)"
$repositories = @{}
function Test-GitUrl {
	param(
		[Parameter(Mandatory = $true)] # 表示这个参数是必须的
		[string]$RemoteUrl # 定义一个字符串类型的参数，表示远程仓库的 URL
	)
	# 尝试列出远程仓库的引用，如果成功，返回 $true，如果失败，返回 $false
	git ls-remote $RemoteUrl > $null # 将输出重定向到空，避免显示在控制台
	return $LASTEXITCODE -eq 0
}
# | Where-Object { $_.Name -eq ".git" }
# 遍历目录并查找.git目录
Get-ChildItem -Path "G:\" -Depth 5 -Directory -Force -Filter ".git"  |
ForEach-Object {

	# 获取当前.git所在目录的父目录（即项目根目录）
	$projectRoot = $_.Parent.FullName

	#$rep.local = $projectRoot
	#$rep.remotes =@{}

	# 切换到项目根目录并获取远程URL
	Push-Location $projectRoot
	try {
		# git remote show会列出远程仓库详细信息，我们提取URL部分
		$remotes = git remote -v
		$rep = @{}
		if (-not $remotes -or $remotes.Count -eq 0) {
			Write-Host "not valid git repo. $projectRoot"
			$repo["desc"] = "not valid git repo."
		}
		else {
			# 遍历每个 remote
			foreach ($remote in $remotes) {
				$match = $regex.Matches($remote)
				if ($match.Groups.Count -ge 4) {
					$remoteName = $match.Groups[1].Value
					$action = $match.Groups[4].Value
					$url = $match.Groups[3].Value
					if (Test-GitUrl -RemoteUrl $url) {
						if ($rep[$remoteName]) {
							$rep[$remoteName][$action] = $url
						}
						else {
							$rep[$remoteName] = @{$action = $url }
						}
					}
					else {
						Write-Output "Remote Url '$url' can't access, it can't be restored. $projectRoot"
						$rep["desc"] = "Remote Url '$url' can't access, it can't be restored."
					}
				}
				else {
					$index = 0
					$key = "remote"
					while ($rep -contains $key) {
						$key = "remote" + $index++
					}
					$rep[$key] = $remote
					$repo["desc"] = "can't read remote infomation"
				}
			}
		}
		$repositories[$projectRoot] = $rep
	}
	finally {
		# 确保不管是否成功都返回上一级目录
		Pop-Location
	}
}
$repositories | ConvertTo-Json -depth 5 | Set-Content -Path $outputFile
#Get-Content -Path $outputFile | Write-Output $_
#Write-Output "Git remote URLs have been written to $outputFile."