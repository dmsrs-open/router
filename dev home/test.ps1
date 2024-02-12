
# 检查远程仓库的 URL
function Test-GitUrl {
	param(
		[Parameter(Mandatory = $true)] # 表示这个参数是必须的
		[string]$RemoteUrl # 定义一个字符串类型的参数，表示远程仓库的 URL
	)
	# 尝试列出远程仓库的引用
	$Output = git ls-remote $RemoteUrl 2>&1

	# 判断远程仓库是否存在
	if ($Output -match "fatal: repository") {
		Write-Output "The remote repository $RemoteUrl does not exist."
	}
	elseif ($Output -match "fatal: unable to access") {
		Write-Output "The remote repository $RemoteUrl is inaccessible."
	}
	elseif ($Output -match "fatal: Authentication failed") {
		Write-Output "The remote repository $RemoteUrl requires authentication."
	}
	else {
		Write-Output "The remote repository $RemoteUrl exists and is accessible."
		return $true
	}
	return $false
}

function Test-RemoteGitRepo {
	param(
		[Parameter(Mandatory = $true)] # 表示这个参数是必须的
		[string]$RemoteUrl # 定义一个字符串类型的参数，表示远程仓库的 URL
	)
	# 尝试列出远程仓库的引用，如果成功，返回 $true，如果失败，返回 $false
	try {
		git ls-remote $RemoteUrl > $null # 将输出重定向到空，避免显示在控制台
		return $true
	}
 catch {
		return $false
	}
}
$RemoteUrl = "https://github.com/dahlbyk/posh-git2.git"

Test-RemoteGitRepo $RemoteUrl