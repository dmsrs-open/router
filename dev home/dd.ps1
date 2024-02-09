# 定义一个函数，接受一个字符串作为参数，返回一个布尔值，表示是否匹配 github url
function Test-GitHubUrl {
	param (
		[Parameter(Mandatory)]
		[string]$Url
	)

	# 定义一个正则表达式，匹配 http 或者 ssh 协议，以及 github 的域名和用户名
	$pattern = '^(https?|ssh)://github\.com/[\w-]+/'

	# 使用 -match 运算符，尝试在字符串中匹配正则表达式
	return $Url -match $pattern
}

# 测试一些示例
$examples = @(
	'https://github.com/microsoft/copilot',
	'ssh://github.com/microsoft/copilot',
	'http://github.com/microsoft/copilot',
	'ftp://github.com/microsoft/copilot',
	'https://github.com/microsoft',
	'https://github.com/microsoft/copilot.git',
	'origin  https://github.com/niubilitywindows/Symlinker.git (fetch)',
	'origin  https://github.com/niubilitywindows/Symlinker.git (push)',
	'origin  git@github.com:ATQQ/sugar-blog.git'

)

# 遍历示例，打印结果
foreach ($example in $examples) {
	"$example $(Test-GitHubUrl $example)"
}
