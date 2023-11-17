PVE开启网卡直通，显卡直通，USB直通。请务必看完此文章，再结合自己实际，操作，如果成功，请再下面评论，自己的平台，有助于网友交流。

## 第一步：确认自己的主板CPU是否支持Vt-d功能

不支持就搞不了直通。intel要b75以上芯片组才支持。也就是说intel4代酷睿处理器以上，都支持。amd不明。

VT-D是io虚拟化。不是VT-X，具体请参考下面文章

<https://zhuanlan.zhihu.com/p/50640466>

有很多新手，以为主板开启虚拟化功能，就能直通了，其实不是！要开启vt-d才能io虚拟化。AMD平台是iommu，某些OEM主板上叫SRIOV。请注意。

## 第二步：开启iommu

```bash
#编辑grub，请不要盲目改。根据自己的环境，选择设置
vi /etc/default/grub
#在里面找到：GRUB_CMDLINE_LINUX_DEFAULT="quiet"
#然后修改为：GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt"
#如果是amd cpu请改为：GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt"
#如果是需要显卡直通，建议在cmdline再加一句video=vesafb:off video=efifb:off video=simplefb:off，加了之后，pve重启进内核后停留在一个画面，这是正常情况
#GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt video=vesafb:off video=efifb:off video=simplefb:off"
#GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream,multifunction nofb textonly nomodeset video=efifb:off"
```

![](https://img.buduanwang.vip/2020/05/25/e04e0fb148c8c.png)

修改完成之后，`直接更新grub`

```bash
update-grub
```

`注意，如果此方法还不能开启iommu，请修改`

 /etc/kernel/cmdline文件

并且使用`proxmox-boot-tool refresh` 更新启动项

## 第三步 加载相应的内核模块

```bash
echo vfio >> /etc/modules
echo vfio_iommu_type1 >> /etc/modules
echo vfio_pci >> /etc/modules
echo vfio_virqfd >> /etc/modules
```

使用`update-initramfs -k all -u`命令更新内核参数

重启主机

## 第四步 验证是否开启iommu

重启之后，在终端输入

```bash
dmesg | grep iommu
```

出现如下例子。则代表成功

```
[ 1.341100] pci 0000:00:00.0: Adding to iommu group 0[ 1.341116] pci 0000:00:01.0: Adding to iommu group 1[ 1.341126] pci 0000:00:02.0: Adding to iommu group 2[ 1.341137] pci 0000:00:14.0: Adding to iommu group 3[ 1.341146] pci 0000:00:17.0: Adding to iommu group 4
```

此时输入命令

```bash
find /sys/kernel/iommu_groups/ -type l 
#出现很多直通组，就代表成功了。如果没有任何东西，就是没有开启
```

## 显卡直通

理论上AMD RADEON 5xxx, 6xxx, 7xxx, Navi 5XXX(XT), NVIDIA GEFORCE 7, 8, GTX 4xx, 5xx, 6xx, 7xx, 9xx, 10xx and RTX 16xx/20xx/30xx都可以成功直通。

但是对于NVIDIA显卡，建议使用9代以上中端卡直通，且使用最新的驱动。

对于AMD的APU3/5系列核显/RX4XX/5XX/6XXX均无法完美直通。无法使用本文提供的教程直通，请注意，有其他的教程，但由于我没有卡，无法撰写教程

### 1、直接屏蔽显卡驱动

```bash
#直通AMD显卡，请使用下面命令echo "blacklist radeon" >> /etc/modprobe.d/blacklist.conf echo "blacklist amdgpu" >> /etc/modprobe.d/blacklist.conf #直通NVIDIA显卡，请使用下面命令
echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist nvidia" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist nvidiafb" >> /etc/modprobe.d/blacklist.conf 
#直通INTEL核显，请使用下面命令，注意！如果使用Gvt-G，请不要使用下面的命令
echo "blacklist snd_hda_intel" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist snd_hda_codec_hdmi" >> /etc/modprobe.d/blacklist.conf 
echo "blacklist i915" >> /etc/modprobe.d/blacklist.conf 
```

### 2、把显卡绑定到vfio-pci

使用lspci 查看自己的显卡PCI地址，如02:00

使用lspci -n 查看显卡的did和vid。我这边是02:00，可以看到下面输出

```
root@pve1:~# lspci -n
00:00.0 0600: 8086:3ec4 (rev 0a)
00:01.0 0604: 8086:1901 (rev 0a)
00:02.0 0300: 8086:3e9b
00:14.0 0c03: 8086:a12f (rev 31)
00:17.0 0106: 8086:a102 (rev 31)
00:1c.0 0604: 8086:a114 (rev f1)
00:1d.0 0604: 8086:a118 (rev f1)
00:1d.2 0604: 8086:a11a (rev f1)
00:1d.3 0604: 8086:a11b (rev f1)
00:1f.0 0601: 8086:a148 (rev 31)
00:1f.2 0580: 8086:a121 (rev 31)
00:1f.3 0403: 8086:a170 (rev 31)
00:1f.4 0c05: 8086:a123 (rev 31)
00:1f.6 0200: 8086:15b8 (rev 31)
01:00.0 0200: 15b3:1003
02:00.0 0100: 10de:1381 (rev 03)02:00.1 0100: 10de:0fbc (rev 03)
03:00.0 0108: 8086:f1a6 (rev 03)
04:00.0 0604: 1b21:1080 (rev 04)
```

 02:00.0 02:00.1一个是GPU，一个是声卡，两者都要一起直通，所以通过命令，把2者都绑定到vfio-pci上。

```bash
echo "options vfio-pci ids=10de:1381,10de:0fbc" > /etc/modprobe.d/vfio.conf
#注意，上面这条命令，ids=后面跟直通组的所有设备。中间以英文逗号隔开。自己的设备自己替换。
```

上述操作完成之后，再检查一下，是否将例子内容替换成自己的。使用以下命令查看。

```bash
cat /etc/modprobe.d/blacklist.conf
cat /etc/modprobe.d/vfio.conf
```

### 3、更新内核

对于nvidia显卡，需要

```bash
echo "options kvm ignore_msrs=1" > /etc/modprobe.d/kvm.conf
```

`update-initramfs -k all -u`

随后重启

### 4、开始直通

新建一个虚拟机。根据自己的爱好，选择ovmf或者seabios，通常来说两者对独显直通没有影响，建议nvidia 9系以上选择OVMF，其他选择seabios。

打开虚拟机面板，正常安装系统，并且开启远程桌面或者安装好向日葵。随后点击添加 `PCI设备`

[![](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220111100655-1.png)](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220111100655-1.png)

如下图，注意！！！不要勾选主GPU！。如果不能勾选PCIE，那么一定要把虚拟机改成Q35类型。

[![](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220111100819.png)](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220111100819.png)

随后开机，如果能正常启动，那么就安装NVIDIA最新驱动。

提示：由于某些消费级主板PCI的设计问题，你可能只能直通第一个PCIe x16槽的显卡。

## 核显直通

**如果想要核显显示到显示器。虚拟机请使用Seabios，机型为i440fx并且在bios中开启CSM。估摸着核显需要到pci的00:02位置才能亮。**

目前IGD（ **Intel Graphics Device**）直通理论上支持3代酷睿以上。但是从目前的直通结果看，比较容易的是5代-10代。3-4代直通成功概率低，受多方面影响。11代及其之后，直到目前，也能正常直通，建议11代以上，升级到内核6.2，再直通

amd 3400g 5xxg 需要vender reset才能直通（本文教程不适合）。

### 基于5-10代的CPU核显和11-13代直通给linux。请优先以下面这种方式直通

针对于qemu-sever大于6.2-3版本，就是pve6.3以上版本。

将bios改成seabios，机器类型选择i440fx，使用传统模式装好系统，开启远程。

将显卡设置成无，在核显后面添加legacy-igd=1，如hostpci0: 0000:00:02.0,legacy-igd=1。此时机器会出现显示器画面。如果出现画面，但是核显不能正确驱动，

添加一个`args: -set device.hostpci0.addr=02.0 -set device.hostpci0.x-igd-gms=1 -set device.hostpci0.x-igd-opregion=on`

最后的配置文件，加上声卡可以参考如下：

```
args: -set device.hostpci0.addr=02.0 -set device.hostpci0.x-igd-gms=1 -set device.hostpci0.x-igd-opregion=on
hostpci0: 0000:00:02.0,legacy-igd=1
hostpci1: 0000:00:1f.3
machine: pc-i440fx-7.2
```

如果上面操作还是不行，请尝试添加vbios，关于什么是vbios，请百度一下，如何提取vbios，请参考下面文章<https://foxi.buduanwang.vip/yj/1602.html/,本文不适用。>

### 基于5-10代的CPU核显直通黑苹果。请优先以下面这种方式直通

黑苹果需要OVMF启动，一般需要定制虚拟机bios，以在虚拟机启动的时候，在虚拟机内驱动核显。

定制bios，请加QQ 70083721，需要付费定制。

### 基于11-13代的CPU核显直通。请优先以下面这种方式直通

看这个吧，

<https://blog.csdn.net/coolhz/article/details/130234903>

心态炸了。不想写了。

如果是要显示虚拟机bios，请加QQ 70083721，需要付费定制虚拟机bios。

## 硬盘直通

此部分请参考

<https://foxi.buduanwang.vip/virtualization/1754.html/>

## 网卡直通

正常情况下，网卡直通不会有什么困难。在开启iommu之后，即可在Web页面上，将网卡作为PCIe设备添加即可。

但，你需要确保没有直通到PVE的管理网口。否则你的PVE会失联。且PVE没有使用此网卡。

下图为PVE7.2直通网卡的界面。

[![](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220523234824.png)](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220523234824.png)

注意！

由于供应商的问题，可能一张物理网卡会有多个逻辑的网口，这些网口会在同一个PCIe地址上，如下

[![](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220523235017.png)](https://foxi.buduanwang.vip/wp-content/uploads/2020/05/QQ截图20220523235017.png)

这有2个I350的网卡，均在07:00这个位置上。将此类网卡直通，有2种情况。

1、一个网口为PVE管理口，一个网口直通给虚拟机

此种情况，请参考上面，进行直通，如上上图，请勿勾选 所有功能。

2、分别直通给虚拟机。

由于多个网卡位于同一个PCI地址上，可能会在一个iommu组里，只能将这些网卡同时直通给一个虚拟机，否则会报错。

你需要确认网卡是否在同一个iommu组，执行下面命令：

`for d in /sys/kernel/iommu_groups/*/devices/*; do n=${d#*/iommu_groups/*}; n=${n%%/*}; printf 'IOMMU Group %s ' "$n"; lspci -nns "${d##*/}"; done|grep Eth`  

如下输出：

```
root@pve3:~# for d in /sys/kernel/iommu_groups/*/devices/*; do      n=${d#*/iommu_groups/*}; n=${n%%/*};     printf 'IOMMU Group %s ' "$n";     lspc
IOMMU Group 17 04:00.0 Ethernet controller [0200]: Mellanox Technologies MT27500 Family [ConnectX-3] [15b3:1003]
IOMMU Group 19 07:00.0 Ethernet controller [0200]: Intel Corporation I350 Gigabit Network Connection [8086:1521] (rev 01)
IOMMU Group 20 07:00.1 Ethernet controller [0200]: Intel Corporation I350 Gigabit Network Connection [8086:1521] (rev 01)
```

 从上面输出看，这上面的2个I350网卡分别在组19和20上，就意味着可以分开直通给虚拟机。

如果同一个iommu组，那么就需要利用PCIe桥的ACS特性，这部分请参考

[IOMMU是如何划分PCI device group的？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/341895948)

情况1: 版本低于7.1

你需要安装破解内核，才能开启ACS强制。

这部分参考：

<https://foxi.buduanwang.vip/linux/1522.html/>

情况2：PVE版本为7.1+

你可以在GRUB上配置一个命令即可完成。

在grub文件里添加一个参数`pcie_acs_override=downstream`

grub如下

```
GRUB_DEFAULT=0
GRUB_TIMEOUT=5
GRUB_DISTRIBUTOR=`lsb_release -i -s 2> /dev/null || echo Debian`
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on  pcie_acs_override=downstream"
GRUB_CMDLINE_LINUX=""

```

随后进行保存，并且更新内核，更新grub

```
update-grub
update-initramfs -k all -u 
```

随后重启

## 黑苹果

虚拟机可以创建黑苹果，随后直通硬件到虚拟机，可以获得相关的性能提升。

黑苹果，你需要以PCI方式直通硬件（请勿勾选PCIe）。最好使用免驱显卡，这样可以直接输出到显示器。

如果不是免驱显卡，那么请自行进系统之后，配置Opencore。

黑苹果不支持gvt-g
