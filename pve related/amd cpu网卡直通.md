
# ProxmoxVE NAS/AIO实战- PCIe直通(Ryzen/A卡独显直通+SATA控制器直通)

## 本文要素

ProxmoxVE, NAS, AIO, PCIe Passthrough, IOMMU, VFIO, Ryzen, AMD, iGPU, SATA controller

## 目标

把淘汰下来的老电脑改造成放在客厅的NAS/HTPC/AIO。

### 物理机硬件配置

- CPU: AMD Ryzen 1600
- 主板: Asus PRIME B350M-PLUS
- 内存：Klevv 24G DDR4 2933mhz
- 显卡: AMD RX460 2G
- SSD: 240G nvme
- HDD: 若干3.5寸盘
- 显示器： SONY TV KD-65X8500
- 其他外设：罗技无线键鼠

### PVE资源架构

以ProxmoxVE 为裸机的hypervisor，开2个虚拟机:

1. vm100：安装openmediavault，需直通sata控制器，这样可以对sata硬盘进行高级电源管理(可自动休眠）,并可监控S.M.A.R.T信息。
2. vm101: 安装win10, 需直通GPU,和键鼠。这样可以在客厅的TV上当一台电脑用。

![No Txt](https://pic2.zhimg.com/v2-68987d32d5214bf35467672affe477fd_b.jpg)

![No Txt](https://pic2.zhimg.com/80/v2-68987d32d5214bf35467672affe477fd_720w.webp)

My PVE-based Hypervisor Architecture

## 开始行动

### PVE简单配置

裸机安装完PVE后，稍微配置下PVE。

```bash
apt install apt-transport-https ca-certificates
apt install git vim screenfetch
```

编辑/etc/apt/sources.list改为：

```text
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye main contrib non-free 
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-updates main contrib non-free 
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ bullseye-backports main contrib non-free 
deb https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free 
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian-security bullseye-security main contrib non-free
```

### 开启IOMMU，ACS，VFIO

网上关于PVE PCI直通的文章中，intel 核显比较多。ryzen和A卡独显比较少。

刚开始时，我准备直通板载SATA控制器(on-board SATA controller passthrough)，但AMD全系主板的默认IOMMU分组太粗糙了，sata controller 和usb controller还有其他一大堆模块都打包在同一个分组里，要是一股脑直通给vm，hypervisor直接会死机，GG。

这时候我并不知道啥是PCIe ACS覆盖补丁<sup data-text="" data-url="http://liujunming.top/2019/11/24/Introduction-to-PCIe-Access-Control-Services/" data-numero="1" data-draft-node="inline" data-draft-type="reference" data-tooltip="http://liujunming.top/2019/11/24/Introduction-to-PCIe-Access-Control-Services/" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_1_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_1" data-reference-link="true" aria-labelledby="ref_1">[1]</a></sup>，看了CHH老哥<sup data-text="AMD1700X搞ESXI和PVE两天后无奈弃坑" data-url="https://www.chiphell.com/forum.php?mod=viewthread&amp;tid=2167989&amp;mobile=1" data-numero="2" data-draft-node="inline" data-draft-type="reference" data-tooltip="AMD1700X搞ESXI和PVE两天后无奈弃坑 https://www.chiphell.com/forum.php?mod=viewthread&amp;tid=2167989&amp;mobile=1" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_2_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_2" data-reference-link="true" aria-labelledby="ref_2">[2]</a></sup>和贴吧的一个帖子，以为没办法了，都准备淘宝上买个PCIe转SATA扩展卡HBA卡了。后面发现还居然真有办法。

据官方文档<sup data-text="PVE wiki: PCI Passthrough" data-url="https://pve.proxmox.com/wiki/Pci_passthrough" data-numero="3" data-draft-node="inline" data-draft-type="reference" data-tooltip="PVE wiki: PCI Passthrough https://pve.proxmox.com/wiki/Pci_passthrough" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_3_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_3" data-reference-link="true" aria-labelledby="ref_3">[3]</a></sup>，ryzen平台直接支持PCIe ACS overridden，不需要像intel j3455之类平台得自己编译PVE kernel了，也不行另外加HBA卡，只需在grub加些启动命令行参数。

ACS补丁的作用是细化IOMMU分组。

需注意，据国内外网友<sup data-text="解决proxmox Ryzen CPU IOMMU分组问题" data-url="https://cosmiccat.net/2021/04/495/" data-numero="4" data-draft-node="inline" data-draft-type="reference" data-tooltip="解决proxmox Ryzen CPU IOMMU分组问题 https://cosmiccat.net/2021/04/495/" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_4_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_4" data-reference-link="true" aria-labelledby="ref_4">[4]</a></sup><sup data-text="" data-url="https://www.reddit.com/r/Proxmox/comments/cagusq/current_state_of_pci_passthrough_acs_patch/" data-numero="5" data-draft-node="inline" data-draft-type="reference" data-tooltip="https://www.reddit.com/r/Proxmox/comments/cagusq/current_state_of_pci_passthrough_acs_patch/" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_5_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_5" data-reference-link="true" aria-labelledby="ref_5">[5]</a></sup>所说，pcie\_acs\_override=后面的的multifunction需要加上。

```bash
#编辑 /etc/default/grub
vim /etc/default/grub
#找到
GRUB_CMDLINE_LINUX_DEFAULT="quiet"

#AMD用户修改为
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on pcie_acs_override=downstream,multifunction video=vesafb:off video=efifb:off"

#注：
#efifb:off 禁用efi启动的显示设备
#vesafb:off 禁用vesa启动的显示设备

update-grub

#编辑 /etc/modules
vim /etc/modules

#修改为
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd

#最后重启
reboot 
```

根据archwiki<sup data-text="arch wiki: PCI_passthrough_via_OVMF" data-url="https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF#Ensuring_that_the_groups_are_valid" data-numero="6" data-draft-node="inline" data-draft-type="reference" data-tooltip="arch wiki: PCI_passthrough_via_OVMF https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF#Ensuring_that_the_groups_are_valid" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_6_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_6" data-reference-link="true" aria-labelledby="ref_6">[6]</a></sup>，重启后记下自己的IOMMU分组明细。

```bash
#!/bin/bash
shopt -s nullglob
for g in `find /sys/kernel/iommu_groups/* -maxdepth 0 -type d | sort -V`; do
    echo "IOMMU Group ${g##*/}:"
    for d in $g/devices/*; do
        echo -e "\t$(lspci -nns ${d##*/})"
    done;
done;
```

执行后输出一大堆，有几个后面用得到的，如下：Group 15用于sata控制器直通，Group 22,23用于显卡直通：

```text
...
IOMMU Group 15:
        02:00.1 SATA controller [0106]: Advanced Micro Devices, Inc. [AMD] 300 Series Chipset SATA Controller [1022:43b7] (rev 02)

...

IOMMU Group 22:
        08:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin [Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X] [1002:67ef] (rev cf)
IOMMU Group 23:
        08:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin HDMI/DP Audio [Radeon RX 550 640SP / RX 560/560X] [1002:aae0]
...
```

### 开启显卡直通(适用于A卡，独显)

官网文档<sup data-text="PVE wiki: GPU Passthrough" data-url="https://pve.proxmox.com/wiki/Pci_passthrough#GPU_Passthrough" data-numero="7" data-draft-node="inline" data-draft-type="reference" data-tooltip="PVE wiki: GPU Passthrough https://pve.proxmox.com/wiki/Pci_passthrough#GPU_Passthrough" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_7_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_7" data-reference-link="true" aria-labelledby="ref_7">[7]</a></sup>有点误导，_lspci -n -s 01:00_ 是什么鬼。我的01:00是一个nvme controller。

经研究，可以使用_lspci -nn |grep Radeon_ 查找或者直接参考上面记录下的IOMMU分组明细：

```bash
# 查找自己的显卡及其HDMI音频模块的device id
lspci -nn | grep Radeon

# 输出示例(视具体情况而定)
08:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin [Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X] [1002:67ef] (rev cf)
08:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin HDMI/DP Audio [Radeon RX 550 640SP / RX 560/560X] [1002:aae0]

#从而获知是1002:67ef,1002:aae0(视具体情况而定), 修改vfio.conf
echo "options vfio-pci ids=1002:67ef,1002:aae0  disable_vga=1" > /etc/modprobe.d/vfio.conf

#修改blacklist.conf,禁用驱动
vim /etc/modprobe.d/blacklist.conf
#修改为
blacklist nouveau
blacklist radeon
blacklist nvidia

#修改kvm.conf
vim /etc/modprobe.d/kvm.conf 
# 修改为
options kvm ignore_msrs=1

#更新initramfs并重启
update-initramfs -u
reboot
```

PVE web UI上新建虚拟机vm101(win10)，需直通键鼠(usb0),显卡(hostpci0,hostpci1)。这里使用OVMF/UEFI/q35/pcie方式。至于SeaBIOS/i440fx/pci方式，据官网文档<sup data-text="PVE wiki: GPU Passthrough" data-url="https://pve.proxmox.com/wiki/Pci_passthrough#GPU_Passthrough" data-numero="7" data-draft-node="inline" data-draft-type="reference" data-tooltip="PVE wiki: GPU Passthrough https://pve.proxmox.com/wiki/Pci_passthrough#GPU_Passthrough" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_7_1" href="https://zhuanlan.zhihu.com/p/438793914#ref_7" data-reference-link="true" aria-labelledby="ref_7">[7]</a></sup>应该也可以，我没试。

hostpci0的主GPU(x-vga=1)若打开，则会关闭vnc连接。可以先关了以便于调试：待vnc连入win10桌面后打开远程桌面连接后在开。

![No Txt](https://pic3.zhimg.com/v2-f2f3ca0bbe0a8bcb4b2680a194834c4e_b.jpg)

![No Txt](https://pic3.zhimg.com/80/v2-f2f3ca0bbe0a8bcb4b2680a194834c4e_720w.webp)

PVE: vm101(win10)图形化配置

大功告成后，连接在RX460显卡上的TV跳出win10界面了，但还是有一个PCI设备未识别，根据AIDA64排查是设备描述为Red Hat Virtio Memory Balloon的PCI设备，安装[virtio-win-gt-x64.msi](https://link.zhihu.com/?target=https%3A//fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/virtio-win-0.1.208-1/virtio-win-gt-x64.msi) 驱动后解决<sup data-text="" data-url="https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers#Windows_OS_Support" data-numero="8" data-draft-node="inline" data-draft-type="reference" data-tooltip="https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers#Windows_OS_Support" data-tooltip-preset="white" data-tooltip-classname="ztext-referene-tooltip"><a id="ref_8_0" href="https://zhuanlan.zhihu.com/p/438793914#ref_8" data-reference-link="true" aria-labelledby="ref_8">[8]</a></sup>。

![No Txt](https://pic3.zhimg.com/v2-b9a889a4db55e8935dc7c826e429a07a_b.jpg)

![No Txt](https://pic3.zhimg.com/80/v2-b9a889a4db55e8935dc7c826e429a07a_720w.webp)

vm101: win10桌面

之后windows服务中会多一个Ballon Service.

### 开启SATA控制器直通

acs补丁开启后，SATA controller会被单独分组，如下图 添加Group 15为PCI设备。

![No Txt](https://pic3.zhimg.com/v2-298d14346b6121e62307aabaaae5da5a_b.jpg)

![No Txt](https://pic3.zhimg.com/80/v2-298d14346b6121e62307aabaaae5da5a_720w.webp)

PVE: vm100(omv)图形化配置

搞定后，OMV可完美支持S.M.A.R.T信息和高级电源管理(APM)，爽！

![No Txt](https://pic4.zhimg.com/v2-359e820c8448ed0019127c67bcecb58b_b.jpg)

![No Txt](https://pic4.zhimg.com/80/v2-359e820c8448ed0019127c67bcecb58b_720w.webp)

OMV中的SMART信息

___

## 其他参考教程

1. [https://forum.proxmox.com/threads/problem-with-gpu-passthrough.55918/post-361178](https://link.zhihu.com/?target=https%3A//forum.proxmox.com/threads/problem-with-gpu-passthrough.55918/post-361178)
2. [Proxmox VE(PVE)直通显卡 踩坑经验](https://link.zhihu.com/?target=https%3A//qiedd.com/669.html)
3. [Proxmox VE 直通显卡方案及解决N卡Code43](https://link.zhihu.com/?target=https%3A//xylog.cn/2020/03/03/proxmox-vga-nvidia.html)
4. [小白玩PVE proxmox RX560D显卡直通](https://link.zhihu.com/?target=https%3A//blog.51cto.com/u_12242014/2382885)
5. [pve虚拟机显卡直通教程 - TimZhong's Blog](https://link.zhihu.com/?target=https%3A//blog.timzhong.top/2020/09/27/pve-direct-pcie/)
6. [朗风晴月：2021年完全保姆级，PVE直通intel核显UHD630，客厅HTPC+AIO](https://zhuanlan.zhihu.com/p/390268983)

## 参考

1. [^](https://zhuanlan.zhihu.com/p/438793914#ref_1_0)[http://liujunming.top/2019/11/24/Introduction-to-PCIe-Access-Control-Services/](http://liujunming.top/2019/11/24/Introduction-to-PCIe-Access-Control-Services/)
2. [^](https://zhuanlan.zhihu.com/p/438793914#ref_2_0)AMD1700X搞ESXI和PVE两天后无奈弃坑 [https://www.chiphell.com/forum.php?mod=viewthread&tid=2167989&mobile=1](https://www.chiphell.com/forum.php?mod=viewthread&tid=2167989&mobile=1)
3. [^](https://zhuanlan.zhihu.com/p/438793914#ref_3_0)PVE wiki: PCI Passthrough [https://pve.proxmox.com/wiki/Pci\_passthrough](https://pve.proxmox.com/wiki/Pci_passthrough)
4. [^](https://zhuanlan.zhihu.com/p/438793914#ref_4_0)解决proxmox Ryzen CPU IOMMU分组问题 [https://cosmiccat.net/2021/04/495/](https://cosmiccat.net/2021/04/495/)
5. [^](https://zhuanlan.zhihu.com/p/438793914#ref_5_0)[https://www.reddit.com/r/Proxmox/comments/cagusq/current\_state\_of\_pci\_passthrough\_acs\_patch/](https://www.reddit.com/r/Proxmox/comments/cagusq/current_state_of_pci_passthrough_acs_patch/)
6. [^](https://zhuanlan.zhihu.com/p/438793914#ref_6_0)arch wiki: PCI\_passthrough\_via\_OVMF [https://wiki.archlinux.org/title/PCI\_passthrough\_via\_OVMF#Ensuring\_that\_the\_groups\_are\_valid](https://wiki.archlinux.org/title/PCI_passthrough_via_OVMF#Ensuring_that_the_groups_are_valid)
7. ^<sup class="ReferenceList-backLink"><a href="https://zhuanlan.zhihu.com/p/438793914#ref_7_0" data-reference-link="true">a</a></sup><sup class="ReferenceList-backLink"><a href="https://zhuanlan.zhihu.com/p/438793914#ref_7_1" data-reference-link="true">b</a></sup>PVE wiki: GPU Passthrough [https://pve.proxmox.com/wiki/Pci\_passthrough#GPU\_Passthrough](https://pve.proxmox.com/wiki/Pci_passthrough#GPU_Passthrough)
8. [^](https://zhuanlan.zhihu.com/p/438793914#ref_8_0)[https://pve.proxmox.com/wiki/Windows\_VirtIO\_Drivers#Windows\_OS\_Support](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers#Windows_OS_Support)
