

# origin  https://github.com/VitePressAwesome/vitepress-theme-vuetom.git (fetch)
# origin  https://github.com/VitePressAwesome/vitepress-theme-vuetom.git (push)
# upstream        https://github.com/lauset/vitepress-theme-vuetom.git (fetch)
# upstream        https://github.com/lauset/vitepress-theme-vuetom.git (push)

Push-Location "G:\vPress\vitepress-theme-vuetom"

# 获取 Git 仓库的所有 remote 的 name 和 path
$remotes = git remote -v

#$remotes.GetEnumerator() | Format-Table -AutoSize
# 创建一个空的哈希表，用于存储不重复的 path
$paths = @{}

# 遍历每个 remote
foreach ($remote in $remotes) {

	echo "remote =====>" $remote
	# 用空格分割 remote 的 name 和 path
	$parts = $remote.Split(" ")

	# 获取 remote 的 name
	$name = $parts[0]
	# 获取 remote 的 path，并去掉括号
	$path = $parts[1].Trim("()")

	echo "          $name ====> $path"
	# 如果哈希表中没有该 path，就添加到哈希表中，并将 name 作为值
	#if (-not $paths.ContainsKey($path)) {
		$paths[$path] = $name
	#}
}

# 输出哈希表中的每个键值对，即不重复的 path 和对应的 name
" "
" "
"out>>>> "
$paths.GetEnumerator() | Format-Table -AutoSize
