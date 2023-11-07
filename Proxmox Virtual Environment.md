<h1> Proxmox Ve Awesome </h1>

- [1. pve 升级内核程序](#1-pve-升级内核程序)
- [2. pve 安装微码](#2-pve-安装微码)
  - [2.1. 方法1](#21-方法1)
  - [2.2. 方法2](#22-方法2)
- [3. pve 安装 openwrt](#3-pve-安装-openwrt)
- [4. 更换软件源](#4-更换软件源)
  - [4.1. 更改ceph更新源](#41-更改ceph更新源)
  - [4.2. 清华云](#42-清华云)
  - [4.3. 阿里云](#43-阿里云)
  - [4.4. 华为云](#44-华为云)
  - [4.5. 中科大云](#45-中科大云)
- [5. 获取pve源密钥并写入/etc/apt/trusted.gpg.d/proxmox-release-bullseye.gpg](#5-获取pve源密钥并写入etcapttrustedgpgdproxmox-release-bullseyegpg)
- [6. 更改PVE源并写入/etc/apt/sources.list.d/pve-install-repo.list](#6-更改pve源并写入etcaptsourceslistdpve-install-repolist)
- [7. 更改环境变量](#7-更改环境变量)
- [8. 删除企业源](#8-删除企业源)
- [9. 直通网卡 下面是可选选项，需要直通网卡请选择下面的步骤](#9-直通网卡-下面是可选选项需要直通网卡请选择下面的步骤)
  - [9.1. Intel处理器](#91-intel处理器)
  - [9.2. AMD处理器](#92-amd处理器)
- [10. 针对5105/5095/6005的CPU微码更新](#10-针对510550956005的cpu微码更新)
  - [10.1. 更新519内核](#101-更新519内核)
- [11. 安装pve tools工具](#11-安装pve-tools工具)

# 1. pve 升级内核程序

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

(1) PVE详细安装op、ikuai教程，含修改国内源、直通、更新内核-软路由,x86系统,openwrt(x86),Router OS 等-恩山无线论坛. <https://www.right.com.cn/forum/thread-8106799-1-1.html>.
(2) PVE版本升级及内核升级方法 - dirgo - 博客园. <https://www.cnblogs.com/dirgo/p/17173858.html>.
(3) PVE版本升级及内核升级方法 - dirgo - 博客园. <https://bing.com/search?q=pve+%e5%8d%87%e7%ba%a7%e5%86%85%e6%a0%b8%e7%a8%8b%e5%ba%8f>.
(4) pve下j6413,N5105等直通核显给windows - 知乎 - 知乎专栏. <https://zhuanlan.zhihu.com/p/636283122>.
(5) undefined. <https://pan.baidu.com/s/1g0ZrI5M89TG3YAGfP47a-Q>.

# 2. pve 安装微码

(1) 在 Proxmox VE（PVE）安装最新微码（microcode），改善 N5105 虚拟机死机问题 - 叶寻的博客. <https://bing.com/search?q=pve+%e5%ae%89%e8%a3%85%e5%be%ae%e7%a0%81>.
(2) PVE下intel-microcode英特尔微码更新修复处理器漏洞错误增强稳定 - 西瓜视频. <https://www.ixigua.com/7221328137244803617>.
(3) PVE详细安装op、ikuai教程，含修改国内源、直通、更新内核-软路由,x86系统,openwrt(x86),Router OS 等-恩山无线论坛. <https://www.right.com.cn/forum/thread-8106799-1-1.html>.
(4) [ Proxmox 折腾手记 ] PVE系统安装 - 哔哩哔哩. <https://www.bilibili.com/read/cv17648783/>.
(5) PVE下intel-microcode英特尔微码更新 Linux通用 用于修复处理器漏洞和错误 增强稳定性 - YouTube. <https://www.youtube.com/watch?v=L4PwbLPU-kc>.
(6) undefined. <https://pan.baidu.com/s/1g0ZrI5M89TG3YAGfP47a-Q>.

## 2.1. 方法1

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

## 2.2. 方法2

```bash
wget http://http.us.debian.org/debian/pool/non-free/i/intel-microcode/intel-microcode_3.20230808.1~deb11u1_amd64.deb
dpkg -i intel-microcode_3.20230808.1~deb11u1_amd64.deb
update-initramfs -u -k all
```

也许会遇到如下问题

```bash
dpkg: dependency problems prevent configuration of intel-microcode:
 intel-microcode depends on iucode-tool (>= 1.0); however:
  Package iucode-tool is not installed.
```

那么就首先安装指定包

```bash
apt-get install iucode-tool 
```

之后执行上述命令

# 3. pve 安装 openwrt

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

# 4. 更换软件源

## 4.1. 更改ceph更新源

```bash
sed -i.bak "s#http://download.proxmox.com/debian#https://mirrors.ustc.edu.cn/proxmox/debian#g" /usr/share/perl5/PVE/CLI/pveceph.pm
echo "deb https://mirrors.ustc.edu.cn/proxmox/debian/ceph-pacific bullseye main" > /etc/apt/sources.list.d/ceph.list 
```

```bash
sed -i.bak "s/^/#/" /etc/apt/sources.list.d/pve-enterprise.list
echo "deb https://mirrors.ustc.edu.cn/proxmox/debian/pve bullseye pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list 
```

```bash

sed -i.bak "s#http://ftp.debian.org/debian#https://mirrors.163.com/debian/#g" /etc/apt/sources.list
sed -i "s#http://security.debian.org#https://mirrors.163.com/debian-security#g" /etc/apt/sources.list
```

阿里云/清华/华为云/中科大四选一，如果想换源，执行 ```cat /dev/null > /etc/apt/sources.list``` 后再自行加源，#后面的为每步注释，表示这步是做了什么，不需要复制进命令行。

## 4.2. 清华云

```bash
cat > /etc/apt/sources.list <<EOF
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
EOF
```

## 4.3. 阿里云

```bash
cat > /etc/apt/sources.list <<EOF
deb http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye-updates main non-free contrib
deb-src http://mirrors.aliyun.com/debian/ bullseye-backports main non-free contrib
deb http://mirrors.aliyun.com/debian-security/ bullseye-security main non-free contrib
deb-src http://mirrors.aliyun.com/debian-security/ bullseye-security main non-free contrib
EOF
```

## 4.4. 华为云

```bash
cat > /etc/apt/sources.list <<EOF
deb https://mirrors.huaweicloud.com/debian/ buster main contrib non-free
deb https://mirrors.huaweicloud.com/debian/ buster-updates main contrib non-free
deb https://mirrors.huaweicloud.com/debian/ buster-backports main contrib non-free
deb https://mirrors.huaweicloud.com/debian-security/ buster/updates main contrib non-free
deb-src https://mirrors.huaweicloud.com/debian/ buster main contrib non-free
deb-src https://mirrors.huaweicloud.com/debian/ buster-updates main contrib non-free
deb-src https://mirrors.huaweicloud.com/debian/ buster-backports main contrib non-free 
EOF
```

## 4.5. 中科大云

```bash
cat > /etc/apt/sources.list <<EOF
deb https://mirrors.ustc.edu.cn/debian/ buster main contrib non-free
deb https://mirrors.ustc.edu.cn/debian/ buster-updates main contrib non-free
deb https://mirrors.ustc.edu.cn/debian/ buster-backports main contrib non-free
deb https://mirrors.ustc.edu.cn/debian-security/ buster/updates main contrib non-free
deb-src https://mirrors.ustc.edu.cn/debian/ buster main contrib non-free
deb-src https://mirrors.ustc.edu.cn/debian/ buster-updates main contrib non-free
deb-src https://mirrors.ustc.edu.cn/debian/ buster-backports main contrib non-free
deb-src https://mirrors.ustc.edu.cn/debian-security/ buster/updates main contrib non-free
EOF
```

# 5. 获取pve源密钥并写入/etc/apt/trusted.gpg.d/proxmox-release-bullseye.gpg

```bash
wget http://mirrors.ustc.edu.cn/proxmox/debian/proxmox-release-bullseye.gpg -O /etc/apt/trusted.gpg.d/proxmox-release-bullseye.gpg
```

# 6. 更改PVE源并写入/etc/apt/sources.list.d/pve-install-repo.list

```bash
echo "deb http://mirrors.ustc.edu.cn/proxmox/debian/pve bullseye pve-no-subscription" >/etc/apt/sources.list.d/pve-install-repo.list
```

# 7. 更改环境变量

```bash
export LC_ALL=en_US.UTF-8
```

# 8. 删除企业源

```bash
rm -rf /etc/apt/sources.list.d/pve-enterprise.list
```

# 9. 直通网卡 下面是可选选项，需要直通网卡请选择下面的步骤

## 9.1. Intel处理器

输入

```bash
nano /etc/default/grub
```

找到  GRUB_CMDLINE_LINUX_DEFAULT="quiet"
修改为 GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"
ctrl+X保存退出（输入Y确定）

使用update-grub更新

```bash
sed -i.bak 's#GRUB_CMDLINE_LINUX_DEFAULT="quiet"#GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"/#g' /etc/default/grub 

update-grub
#验证其有效性，从命令行运行```bash dmesg | grep -e DMAR -e IOMMU```。如果没有输出，则出现问题。极有可能是bios设置的问题，需要启动cpu的vt-x（AMD的叫SVM）支持。
dmesg | grep -e DMAR -e IOMMU
#添加模块
cat > /etc/modules <<EOF
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
EOF
#更新initramfs 
update-initramfs -u -k all
#重启
reboot
```

## 9.2. AMD处理器

步骤同Intel，只是将quiet intel_iommu=on修改为quiet amd_iommu=on

# 10. 针对5105/5095/6005的CPU微码更新

## 10.1. 更新519内核

```bash
apt update && apt install pve-kernel-5.19
 
#  安装内核更新工具 
apt-get install iucode-tool
 
#  下载内核（下面两行一起复制粘贴运行） 
wget http://http.us.debian.org/debian/pool/non-free/i/intel-microcode/intel-microcode_3.20220809.1_amd64.deb
dpkg -i intel-microcode_3.20220809.1_amd64.deb
 
#  更新initramfs 
update-initramfs -u -k all
 
##  重启 
reboot
```

# 11. 安装pve tools工具

<https://gitee.com/codeshelter/pvetools.git>

```bash
echo "nameserver  8.8.8.8" >> /etc/resolv.conf && rm -rf pvetools && rm -rf /etc/apt/sources.list.d/pve-enterprise.list && export LC_ALL=en_US.UTF-8 && apt update && apt -y install git && git clone https://gitee.com/codeshelter/pvetools.git && echo "cd /root/pvetools && ./pvetools.sh" > pvetools/pvetools && chmod +x pvetools/pvetools* && ln -s /root/pvetools/pvetools /usr/local/bin/pvetools && pvetools
```
