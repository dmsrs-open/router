# 1. Openwrt

- [1. Openwrt](#1-openwrt)
  - [1.1. Build and Download](#11-build-and-download)
  - [1.2. pve 安装 openwrt](#12-pve-安装-openwrt)

## 1.1. Build and Download

这个地址可以自定义组件，执行编译，之后下载固件

<https://openwrt.ai/?target=x86%2F64&id=generic#downloads1>

## 1.2. pve 安装 openwrt

OpenWRT是一种基于Linux的开源固件，可以让您的路由器或其他设备拥有更多的功能和自定义选项。PVE是Proxmox Virtual Environment的缩写，是一种基于Debian的虚拟化平台，可以让您在物理机上运行多个虚拟机或容器。

要在PVE上安装OpenWRT，您需要以下几个步骤：

- 首先，您需要下载一个适合PVE的OpenWRT镜像文件，例如[这个](^1^)或[这个](^2^)。您可以解压缩文件并重命名为openwrt.img，方便后续操作。
- 然后，您需要在PVE的管理界面上创建一个新的虚拟机，给它一个名称，选择不使用任何介质，保持默认的硬件配置，删除不需要的硬盘和光驱，设置CPU和内存的数量，添加两个或更多的网络接口，设置启动顺序为硬盘，禁用平板指针，不要启动虚拟机。您可以参考[这篇文章](^3^)或[这篇文章](^4^)的详细步骤。
- 接下来，您需要将OpenWRT镜像文件上传到PVE的服务器上，您可以使用WinSCP或其他工具，将文件放在/var/lib/vz/template/iso/目录下。然后，您需要在PVE的命令行界面上输入以下命令，将镜像文件导入到虚拟机的磁盘中，其中100是虚拟机的ID，local-lvm是存储的名称，您可以根据实际情况进行修改。

```bash
qm importdisk 100 /var/lib/vz/template/iso/openwrt.img local-lvm
```

- 最后，您需要在PVE的管理界面上为虚拟机添加一个硬盘，选择刚刚导入的磁盘，调整磁盘的大小，启动虚拟机，进入控制台，按回车键，修改root密码和LAN IP地址，重启网络服务，然后您就可以通过浏览器访问OpenWRT的管理界面了。您可以参考[这篇文章](^5^)的详细步骤。

(3) 在 PVE 上安装 OpenWRT | openwrt学习笔记. <https://skyao.io/learning-openwrt/docs/installation/pve/>.
(4) OpenWrt | PVE环境下纯净版安装 - 知乎 - 知乎专栏. <https://zhuanlan.zhihu.com/p/546723711>.
(5) 个人数字基建（3）：物理机安装 PVE，并新建 OpenWrt 虚拟机 - 知乎. <https://zhuanlan.zhihu.com/p/662654164>.
