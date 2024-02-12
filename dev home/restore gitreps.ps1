# 从JSON文件中读取数据并转换为对象
$json = Get-Content -Raw -Path 'E:\RemoteUrls.json' | ConvertFrom-Json
$root = "E:\testgithub"
# 遍历对象中的每个项目路径和存储库信息
foreach ($item in $json.PSObject.Properties) {
	# 获取项目路径
	$projectPath = $item.Name.replace("G:" , $root)
	$projectParentFolder = Split-Path -Parent $projectPath
	$projectName = Split-Path -Leaf $projectPath
	# 获取存储库信息
	$repoInfo = $item.Value
	# 遍历存储库信息中的每个远程地址
	foreach ($remote in $repoInfo.PSObject.Properties) {
		try {
			# 获取远程地址的名称
			$remoteName = $remote.Name
			# 获取远程地址的值
			$remoteUrl = $remote.Value.fetch
			# 切换到项目路径
			if (-not (Test-Path $projectParentFolder)) {
				New-Item -ItemType Directory -Path $projectParentFolder
				Write-Output ' Folder is not exist and created it '

			}
			Set-Location -Path $projectParentFolder
			if (Test-Path $projectPath) {
				Set-Location -Path $projectPath
				git remote set-url $remoteName $remoteUrl
			}
			else {
				#echo "	$remoteName -- $remoteUrl "
				#添加远程地址
				#git remote add $remoteName $remoteUrl
				#克隆远程代码库
				git clone $remoteUrl
			}
		}
		catch {
			echo $projectPath
		}


	}
}

# $path = "C:\Users\Alice\Documents\test.txt"
# $parent = Split-Path -Parent $path
# echo $parent
# $leaf = Split-Path -Leaf $path
# echo $leaf
# $new_parent = Join-Path -Path $parent -ChildPath "Pictures"
# echo $new_parent
# $new_path = Join-Path -Path $new_parent -ChildPath $leaf
# echo $new_path
