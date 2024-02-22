# 修改开发缓存目录到开发人员驱动器

## 修改nuget缓存目录

在 NuGet 中，当您安装、更新或还原包时，NuGet 会在项目结构之外的几个文件夹中管理包和包信息。以下是这些文件夹的详细说明：

1. **global-packages** 文件夹：NuGet 在此文件夹中安装下载的每个包。每个包都会完全展开到与包标识符和版本号匹配的子文件夹中。使用 PackageReference 格式的项目始终直接使用此文件夹中的包。使用 packages.config 时，包会先安装到 global-packages 文件夹，然后复制到项目的 packages 文件夹中。在 Windows 上，路径为 `%userprofile%\\.nuget\\packages`；在 Mac 和 Linux 上，路径为 `~/.nuget/packages`。您可以通过设置环境变量 `NUGET_PACKAGES`、配置设置 `globalPackagesFolder` 或 `repositoryPath`（分别用于 PackageReference 和 packages.config），或者使用 RestorePackagesPath MSBuild 属性（仅限于 MSBuild）来覆盖默认位置。环境变量优先于配置设置。

2. **http-cache** 文件夹：Visual Studio 包管理器（NuGet 3.x+）和 dotnet 工具会在此缓存中保存已下载的包的副本（保存为 .dat 文件），并按照每个包源的子文件夹进行组织。这些包不会展开，缓存的过期时间为 30 分钟。在 Windows 上，路径为 `%localappdata%\\NuGet\\v3-cache`；在 Mac 和 Linux 上，路径为 `~/.local/share/NuGet/v3-cache`。您可以通过设置环境变量 `NUGET_HTTP_CACHE_PATH` 来覆盖默认位置。

3. **temp** 文件夹：NuGet 在此文件夹中存储各种操作期间的临时文件。在 Windows 上，路径为 `%temp%\\NuGetScratch`；在 Mac 上，路径为 `/tmp/NuGetScratch`；在 Linux 上，路径为 `/tmp/NuGetScratch<username>`。您可以通过设置环境变量 `NUGET_SCRATCH` 来覆盖默认位置。

4. **plugins-cache** 文件夹（仅适用于 NuGet 4.8+）：NuGet 在此文件夹中存储操作声明请求的结果。在 Windows 上，路径为 `%localappdata%\\NuGet\\plugins-cache`；在 Mac 和 Linux 上，路径为 `~/.local/share/NuGet/plugins-cache`。您可以通过设置环境变量 `NUGET_PLUGINS_CACHE_PATH` 来覆盖默认位置。

请注意，通过使用缓存和 global-packages 文件夹，NuGet 通常会避免下载已经存在于计算机上的包，从而提高安装、更新和还原操作的性能。使用 PackageReference 时，global-packages 文件夹还避免将下载的包保存在项目文件夹内，从而避免将其意外添加到源代码控制中，并减少 NuGet 对计算机存储的总体影响。当需要检索包时，NuGet 首先查找 global-packages 文件夹。如果该版本的包不在其中，NuGet 将检查所有非 HTTP 包源。如果仍然找不到包，NuGet 将在 http-cache 中查找包，除非您在 dotnet.exe 命令中指定了 `--no-http-cache`，或者在 nuget.exe 命令中指定了 `-NoHttpCache`。

Source: Conversation with Bing, 2/8/2024
(1) How to manage the global packages, cache, temp folders in NuGet. https://learn.microsoft.com/en-us/nuget/consume-packages/managing-the-global-packages-and-cache-folders.
(2) 如何管理 NuGet 中的全局包、缓存、临时文件夹 | Microsoft Learn. https://learn.microsoft.com/zh-cn/nuget/consume-packages/managing-the-global-packages-and-cache-folders.
(3) Managing the global packages, cache, and temp folders. https://github.com/nuget/docs.microsoft.com-nuget/blob/main/docs/consume-packages/managing-the-global-packages-and-cache-folders.md.

```bat

C:\Users\admin\Downloads> nuget locals all -List
http-cache: C:\Users\admin\AppData\Local\NuGet\v3-cache
global-packages: C:\Users\admin\.nuget\packages\
temp: C:\Users\admin\AppData\Local\Temp\NuGetScratch
plugins-cache: C:\Users\admin\AppData\Local\NuGet\plugins-cache

C:\Users\admin\Downloads>dotnet nuget locals all --list
http-cache: C:\Users\admin\AppData\Local\NuGet\v3-cache
global-packages: C:\Users\admin\.nuget\packages\
temp: C:\Users\admin\AppData\Local\Temp\NuGetScratch
plugins-cache: C:\Users\admin\AppData\Local\NuGet\plugins-cache


```

1.neget 清理

.netget 缓存位置

C:\Users\Administrator\.nuget

cmd dos 界面输入：dotnet nuget locals all --list


global-packages 对应的就是你的.neget的存储位置，需要修改，占用很大 起步5个G

打开：C:\Users\当前用户的用户名\AppData\Roaming\NuGet\NuGet.Config

在这个配置里，添加以下配置：

<config>

<add key="globalPackagesFolder" value="E:\Users\.nuget\packages" />

</config>

再次执行时 cmd dos 里面输入的命令，只要global-packages的路径已经变更，你就可以删掉C盘中的.neget了。

2. yarn cache清理

CMD 中执行：yarn config set global-folder "D:\AdminCache\.yarnCache"

设置缓存位置

CMD中执行yarn config set cache-folder "D:\AdminCache\.yarnCache"

3. npm cache清理

CMD 中执行：npm config set cache "D:\AdminCache\.npmCache"

CMD 中执行：npm config set prefix "D:\AdminCache\.npmPrefix"


配置完成后，记得要删除以下文件夹中的文件，这样才能给C盘腾位置

C:\Users\Administrator\AppData\Local\Yarn

C:\Users\Administrator\AppData\Local\Npm