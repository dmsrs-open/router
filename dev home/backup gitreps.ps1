# 定义输出文件路径
$outputFile = "G:\RemoteUrls.json"


# 定义正则表达式
$regex = [Regex]"(\w+)\s+([\w:\/\.-]+)\s+\((\w+)\)"

# 遍历目录并查找.git目录，获取远程URL，转换为JSON，追加到输出文件
Get-ChildItem -Path "G:\" -Depth 5 -Directory -Force -Filter ".git"  |
ForEach-Object {
	# 获取当前.git所在目录的父目录（即项目根目录）
	$projectRoot = $_.Parent.FullName
	$rep = @{}
	$rep.local = $projectRoot
	#$rep.remotes =@{}
	#Write-Output $projectRoot
	# 切换到项目根目录并获取远程URL
	try {
		$remotes = git remote -v
		foreach ($remote in $remotes) {
			$r = $regex.Matches($remote)
			if ($r.Groups.Count -ge 3) {
				$rep[$r.Groups[1].value] = $r.Groups[2].value
			}else{

			}
		}
		##$rep | Add-Member -MemberType NoteProperty -Name local -Value $projectRoot
		$rep
	}
	finally {
		Pop-Location
	}
} |
ConvertTo-Json -depth 5 > $outputFile

# 输出结果
Write-Output "Git remote URLs have been written to $outputFile."
