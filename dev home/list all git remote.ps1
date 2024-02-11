# origin\tgit@github.com:cnjimbo/cnjimbo.github.io.git (push)
# 定义输出文件路径
$outputFile = "E:\RemoteUrls.json"

# 清空或创建新的输出文件

$regex = [Regex]"(\w+)[ \s]+(\\t)*([\w:\/\.-]+)[ \s]+\((\w+)\)"
$regex = [Regex]"(\w+)([ \s]+|[(\\t)]+)([@\w:\/\.-]+)[ \s]+\((\w+)\)"
$repositories = @{}
# | Where-Object { $_.Name -eq ".git" }
# 遍历目录并查找.git目录
Get-ChildItem -Path "G:\" -Depth 5 -Directory -Force -Filter ".git"  |
ForEach-Object {

	# 获取当前.git所在目录的父目录（即项目根目录）
	$projectRoot = $_.Parent.FullName
	$rep = @{}
	#$rep.local = $projectRoot
	#$rep.remotes =@{}
	Write-Output $projectRoot
	# 切换到项目根目录并获取远程URL
	Push-Location $projectRoot
	try {
		# git remote show会列出远程仓库详细信息，我们提取URL部分
		$remotes = git remote -v
		# 遍历每个 remote
		foreach ($remote in $remotes) {
			$r = $regex.Matches($remote)
			if ($r.Groups.Count -ge 4) {
				if ($rep[$r.Groups[1].value] ) {
					$rep[$r.Groups[1].value][$r.Groups[4].value] = $r.Groups[3].value
				}
				else {
					$rep[$r.Groups[1].value] = @{$r.Groups[4].value = $r.Groups[3].value }
				}

			}
			else {
				$index = 0
				$key = "remote"
				while ($rep -contains $key) {
					$key = "remote" + $index++
				}
				$rep[$key] = $remote
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