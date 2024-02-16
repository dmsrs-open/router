
function Test-RemoteGitRepo {
	param(
		[Parameter(Mandatory = $true)] # 表示这个参数是必须的
		[string]$RemoteUrl # 定义一个字符串类型的参数，表示远程仓库的 URL
	)

	# 尝试列出远程仓库的引用，如果成功，返回 $true，如果失败，返回 $false

	git ls-remote $RemoteUrl > $null # 将输出重定向到空，避免显示在控制台
	return $LASTEXITCODE -eq 0
}
$RemoteUrl = "https://github.com/dahlbyk/posh-git.git"

Test-RemoteGitRepo $RemoteUrl