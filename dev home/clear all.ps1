# Clear the 3.x+ cache (use either command) 清除3.x+缓存（使用任一命令）
dotnet nuget locals http-cache --clear


# Clear the global packages folder (use either command) 清除全局程序包文件夹（使用任一命令）
dotnet nuget locals global-packages --clear

# Clear the temporary cache (use either command) 清除临时缓存（使用任一命令）
dotnet nuget locals temp --clear

# Clear the plugins cache (use either command) 清除插件缓存（使用任一命令）
dotnet nuget locals plugins-cache --clear

# Clear all caches (use either command) 清除所有缓存（使用任一命令）
dotnet nuget locals all --clear


# 这条命令将会清理 pnmp 全局缓存中的所有不再被任何项目引用的包。这意味着它会删除那些不在任何项目 node_modules 中作为直接或间接依赖存在的包。

# 如果你想完全清理所有缓存，包括所有已安装依赖的缓存，即使它们仍被项目引用，也可以使用上述命令，但请注意，这可能导致之后重新安装项目依赖时需要从远程源重新下载。

# 另外，如果你只想清理特定依赖的缓存，则可以指定依赖名称，但 pnpm 直接针对单个包清理缓存的功能并不明显，通常情况下，它通过 store prune 命令整体维护缓存的健康状况。
pnpm store prune


#在 npm 7.x 以及更高版本中，npm cache clean 命令已被弃用，并且建议使用 npm cache clean --force 替代，但实际上，npm cache clean --force 在这些新版本中仍然可能不提供完整的缓存清理功能。
npm cache clean --force

#更彻底地清理缓存，尤其是当遇到问题时，可以考虑直接删除缓存目录，其位置可以通过 npm cache dir 命令获得：
