# 1. Proxmox VE Awesome

- [1. Proxmox VE Awesome](#1-proxmox-ve-awesome)
  - [1.1. pve 升级内核程序](#11-pve-升级内核程序)
  - [1.2. pve 安装微码](#12-pve-安装微码)
  - [1.3. pve 安装 openwrt](#13-pve-安装-openwrt)


## 1.1. pve 升级内核程序

PVE是Proxmox Virtual Environment的缩写，是一种基于Debian的虚拟化平台，可以让您在物理机上运行多个虚拟机或容器。PVE的内核程序是控制虚拟化功能和硬件兼容性的核心组件，升级内核程序可以提高PVE的性能和稳定性，以及修复一些安全漏洞和错误。

根据我搜索的结果，您可以通过以下几个步骤在PVE上升级内核程序：

- 首先，您需要登录PVE的管理界面，点击左侧菜单栏的"PVE"节点，点击"更新"菜单，点击"刷新"按钮，这样可以更新软件源的索引，也就是执行`apt update`命令¹。
- 然后，您需要在PVE的命令行界面上输入以下命令，查看可以安装的内核程序的版本，也就是执行`apt search pve-kernel|grep pve-kernel-`命令²。

```bash
apt search pve-kernel|grep pve-kernel-
```

- 接下来，您需要选择一个内核程序的版本，然后在PVE的命令行界面上输入以下命令，安装该版本的内核程序，也就是执行`apt install pve-kernel-版本号`命令²。例如，如果您想安装6.1.0版本的内核程序，您可以输入以下命令：

```bash
apt install pve-kernel-6.1.0
```

- 最后，您需要重启PVE，让新的内核程序生效，也就是执行`reboot`命令²。

```bash
reboot
```

这就是在PVE上升级内核程序的方法。😊

(1) PVE详细安装op、ikuai教程，含修改国内源、直通、更新内核-软路由,x86系统,openwrt(x86),Router OS 等-恩山无线论坛. https://www.right.com.cn/forum/thread-8106799-1-1.html.
(2) PVE版本升级及内核升级方法 - dirgo - 博客园. https://www.cnblogs.com/dirgo/p/17173858.html.
(3) PVE版本升级及内核升级方法 - dirgo - 博客园. https://bing.com/search?q=pve+%e5%8d%87%e7%ba%a7%e5%86%85%e6%a0%b8%e7%a8%8b%e5%ba%8f.
(4) pve下j6413,N5105等直通核显给windows - 知乎 - 知乎专栏. https://zhuanlan.zhihu.com/p/636283122.
(5) undefined. https://pan.baidu.com/s/1g0ZrI5M89TG3YAGfP47a-Q.

## 1.2. pve 安装微码

微码是一种用于修复和优化CPU的固件，它可以提高CPU的性能和稳定性，以及修复一些安全漏洞。在PVE上安装微码，可以让您的虚拟机运行得更顺畅和安全。根据我搜索的结果，您可以通过以下几个步骤在PVE上安装微码：

- 首先，您需要确定您的CPU的类型和型号，以及您的PVE的内核版本。您可以在PVE的命令行界面上输入以下命令，查看这些信息：

```bash
cat /proc/cpuinfo | grep 'model name'
uname -r
```

- 然后，您需要添加Debian unstable的软件源，以便从中安装最新的微码。您可以在PVE的命令行界面上输入以下命令，编辑sources.list文件：

```bash
nano /etc/apt/sources.list
```

- 接下来，您需要在文件的末尾添加以下内容，保存并退出：

```bash
deb http://ftp.debian.org/debian/ unstable main contrib non-free
```

- 然后，您需要更新软件源，并安装相应的微码。如果您的CPU是Intel的，您可以输入以下命令：

```bash
apt update
apt install -t unstable intel-microcode
```

- 如果您的CPU是AMD的，您可以输入以下命令：

```bash
apt update
apt install -t unstable amd64-microcode
```

- 最后，您需要重启PVE，让微码生效。您可以输入以下命令：

```bash
reboot
```

这就是在PVE上安装微码的方法。😊

(1) 在 Proxmox VE（PVE）安装最新微码（microcode），改善 N5105 虚拟机死机问题 - 叶寻的博客. https://bing.com/search?q=pve+%e5%ae%89%e8%a3%85%e5%be%ae%e7%a0%81.
(2) PVE下intel-microcode英特尔微码更新修复处理器漏洞错误增强稳定 - 西瓜视频. https://www.ixigua.com/7221328137244803617.
(3) PVE详细安装op、ikuai教程，含修改国内源、直通、更新内核-软路由,x86系统,openwrt(x86),Router OS 等-恩山无线论坛. https://www.right.com.cn/forum/thread-8106799-1-1.html.
(4) [ Proxmox 折腾手记 ] PVE系统安装 - 哔哩哔哩. https://www.bilibili.com/read/cv17648783/.
(5) PVE下intel-microcode英特尔微码更新 Linux通用 用于修复处理器漏洞和错误 增强稳定性 - YouTube. https://www.youtube.com/watch?v=L4PwbLPU-kc.
(6) undefined. https://pan.baidu.com/s/1g0ZrI5M89TG3YAGfP47a-Q.

## 1.3. pve 安装 openwrt

OpenWRT是一种基于Linux的开源固件，可以让您的路由器或其他设备拥有更多的功能和自定义选项。PVE是Proxmox Virtual Environment的缩写，是一种基于Debian的虚拟化平台，可以让您在物理机上运行多个虚拟机或容器。

要在PVE上安装OpenWRT，您需要以下几个步骤：

- 首先，您需要下载一个适合PVE的OpenWRT镜像文件，例如[这个](^1^)或[这个](^2^)。您可以解压缩文件并重命名为openwrt.img，方便后续操作。
- 然后，您需要在PVE的管理界面上创建一个新的虚拟机，给它一个名称，选择不使用任何介质，保持默认的硬件配置，删除不需要的硬盘和光驱，设置CPU和内存的数量，添加两个或更多的网络接口，设置启动顺序为硬盘，禁用平板指针，不要启动虚拟机。您可以参考[这篇文章](^3^)或[这篇文章](^4^)的详细步骤。
- 接下来，您需要将OpenWRT镜像文件上传到PVE的服务器上，您可以使用WinSCP或其他工具，将文件放在/var/lib/vz/template/iso/目录下。然后，您需要在PVE的命令行界面上输入以下命令，将镜像文件导入到虚拟机的磁盘中，其中100是虚拟机的ID，local-lvm是存储的名称，您可以根据实际情况进行修改。

```bash
qm importdisk 100 /var/lib/vz/template/iso/openwrt.img local-lvm
```

- 最后，您需要在PVE的管理界面上为虚拟机添加一个硬盘，选择刚刚导入的磁盘，调整磁盘的大小，启动虚拟机，进入控制台，按回车键，修改root密码和LAN IP地址，重启网络服务，然后您就可以通过浏览器访问OpenWRT的管理界面了。您可以参考[这篇文章](^5^)的详细步骤。

这就是在PVE上安装OpenWRT的方法。😊

 
(1) 超详细,多图 PVE 安装 OpenWRT 教程(个人记录) - 什么值得买. https://post.smzdm.com/p/apze0rw2/.
(2) 软路由 篇二：折腾软路由之PVE安装Openwrt - 什么值得买. https://post.smzdm.com/p/a7nqp3r9/.
(3) 在 PVE 上安装 OpenWRT | openwrt学习笔记. https://skyao.io/learning-openwrt/docs/installation/pve/.
(4) OpenWrt | PVE环境下纯净版安装 - 知乎 - 知乎专栏. https://zhuanlan.zhihu.com/p/546723711.
(5) 个人数字基建（3）：物理机安装 PVE，并新建 OpenWrt 虚拟机 - 知乎. https://zhuanlan.zhihu.com/p/662654164.