# 1. PVE Awesome

- [1. PVE Awesome](#1-pve-awesome)
  - [1.1. 一些常见路径](#11-一些常见路径)
  - [1.2. PVE一键优化脚本](#12-pve一键优化脚本)
  - [1.3. 系统安装和定时任务](#13-系统安装和定时任务)
  - [1.4. PVE pci设备错乱问题](#14-pve-pci设备错乱问题)
  - [1.5. 重新设置网络](#15-重新设置网络)
  - [1.6. 解决PVE网卡混乱问题](#16-解决pve网卡混乱问题)
  - [1.7. 开启IOMMU](#17-开启iommu)
  - [1.8. 硬盘的直通和休眠](#18-硬盘的直通和休眠)
  - [1.9. 安装win10虚拟机](#19-安装win10虚拟机)
  - [1.10. 安装其它虚拟机](#110-安装其它虚拟机)
  - [1.11. 安装UPS](#111-安装ups)
  - [1.12. 安装SMART工具](#112-安装smart工具)
  - [1.13. 安装iperf](#113-安装iperf)
  - [1.14. PVE优化](#114-pve优化)
  - [1.15. ipmitool设置](#115-ipmitool设置)
  - [1.16. 虚拟机自动重启脚本](#116-虚拟机自动重启脚本)
  - [1.17. PVE降低功耗](#117-pve降低功耗)
  - [1.18. 其它省电操作：主板关闭ASPM，pve系统也要关闭ASPM](#118-其它省电操作主板关闭aspmpve系统也要关闭aspm)
  - [1.19. 主板设置要balanced power](#119-主板设置要balanced-power)
  - [1.20. 关闭超线程](#120-关闭超线程)
  - [1.21. PVE 问题汇总](#121-pve-问题汇总)
  - [1.22. PVE虚拟机总是断连](#122-pve虚拟机总是断连)
  - [1.23. 如果没有ethtool工具可以执行如下命令安装](#123-如果没有ethtool工具可以执行如下命令安装)
  - [1.24. PVE 总是进入initramfs](#124-pve-总是进入initramfs)
  - [1.25. 无法更新解决](#125-无法更新解决)
  - [1.26. 无法关闭虚拟机](#126-无法关闭虚拟机)
  - [1.27. 进阶](#127-进阶)
  - [1.28. 实现冷备热备](#128-实现冷备热备)
  - [1.29. 虚拟机备份和恢复还原](#129-虚拟机备份和恢复还原)
  - [1.30. PVE 升级内核](#130-pve-升级内核)
  - [1.31. 常用命令](#131-常用命令)
  - [1.32. 补充](#132-补充)
  - [1.33. 核显直通](#133-核显直通)
  - [1.34. 开启BIOS支持](#134-开启bios支持)
  - [1.35. 启动内核IOMMU支持](#135-启动内核iommu支持)
  - [1.36. 加载vifo模块](#136-加载vifo模块)
  - [1.37. 禁用驱动](#137-禁用驱动)
  - [1.38. 将设备加入进vfio](#138-将设备加入进vfio)
  - [1.39. 防止在win10中显卡代码43](#139-防止在win10中显卡代码43)
  - [1.40. 信任设备](#140-信任设备)
  - [1.41. 更新配置](#141-更新配置)
  - [1.42. N卡直通](#142-n卡直通)
  - [1.43. 开启SR-IOV](#143-开启sr-iov)
  - [1.44. 检查并设置虚拟网卡](#144-检查并设置虚拟网卡)
  - [1.45. 另一种开启方法：注册系统服务，固定SR-IOV](#145-另一种开启方法注册系统服务固定sr-iov)
  - [1.46. 跑分测试](#146-跑分测试)

## 1.1. 一些常见路径

这些路径在后续虚拟机迁移备份时用

存储配置文件:

```bash
/etc/pve/storage.cfg
```

存储路径local：

```bash
iso存放路径： /var/lib/vz/template/iso/

虚拟机的备份路径： /var/lib/vz/dump/

zfs的磁盘路径是：/dev/rpool/data/

存储路径local-lvm，包括挂载的NFS、SMB等其它存储设备：/mnt/pve/
```

## 1.2. PVE一键优化脚本

首先是建议使用PVE一键优化脚本来做一些简单的优化和辅助设置，非常节省时间，教程参考：[https://github.com/ivanhao/pvetools](https://link.zhihu.com/?target=https%3A//github.com/ivanhao/pvetools)

默认PVE是开启SSH的，直接连接即可：

先删除企业源：

```bash
rm /etc/apt/sources.list.d/pve-enterprise.list
```

安装

```bash
export LC_ALL=en_US.UTF-8
apt update && apt -y install git && git clone https://github.com/ivanhao/pvetools.git
```

启动工具（cd到目录，启动工具）

```bash
cd ~/pvetools

./pvetools.sh
```

如何卸载？

```bash
删除下载的pvetools目录即可
```

我会用它做基本的设置，非常方便，例如配置邮箱通知等

## 1.3. 系统安装和定时任务

安装步骤省略，网上教程很多，不难

我个人在安装PVE时采用ZFS组了Mirror，原因在于：我发现我用的sata固态运行PVE有时候会出错，怀疑是固态老旧丢数据，因此用ZFS来避免PVE系统层面的错误导致的后续麻烦。

此外，需要手动定期scrub来保证系统的正确，于是设置每天凌晨00:30执行scrub命令

编辑系统 crontab

```bash
crontab -e
```

选择 vim 编辑器，粘贴以下内容并保存，意思是每天凌晨0点30分纠正错误数据

```bash
30 0 * * * /usr/sbin/zpool scrub rpool
```

crontab设置完了之后不会立即生效，可以用命令重启一下cron

```bash
/etc/rc.d/cron restart
```

借助在线的 [https://crontab.guru/](https://link.zhihu.com/?target=https%3A//crontab.guru/) 工具，可以帮你写出正确的时间表达式

查看在运行的计划任务

```bash
crontab -l
```

查看最近一次scurb运行情况，如无意外提示0错误

```bash
zpool status rpool
```

同理可以用于其它需求：

定时关闭虚拟机

每隔5分钟关闭106虚拟机

```bash
crontab -e 

*/5 * * * * /usr/sbin/qm shutdown 106
```

定时关机

每天凌晨1点30分关机

```bash
crontab -e 

30 01 * * * /sbin/shutdown -h now

补充：可能有人无法关机成功，可以改为以下命令
#! /bin/sh
/sbin/init 0    关闭电源
/sbin/init 6    重新启动
```

其它写法参考

```bash
30     3       10,20     *     *     ls             每月10号及20号的3：30执行ls命令[注：“，”用来连接多个不连续的时段]
25     8-11    *         *     *     ls             每天8-11点的第25分钟执行ls命令[注：“-”用来连接连续的时段]
*/15   *       *         *     *     ls             每15分钟执行一次ls命令 [即每个小时的第0 15 30 45 60分钟执行ls命令]
30     6       */10      *     *     ls             每个月中，每隔10天6:30执行一次ls命令[即每月的1、11、21、31日是的6：30执行一次ls 命令]
```

## 1.4. PVE pci设备错乱问题

这个是因为主板设置变化、外接新的pci设备导致的，需要重新直通硬件。也和主板有关，例如我用超微X11SRA-F更换pcie设备时，变化不大，但超微X10DRL-i就会变，不一定。

解决方法：虚拟机尽量不要设置开机自启；每次更改硬件后，手动改

## 1.5. 重新设置网络

可以手动编辑文件`/etc/network/interfaces`来完成网络配置

也可以图形化操作：桥接端口，用空格分割，把多个网口都绑在一起。

之后，别忘了点击 应用配置

![No Txt](https://pic1.zhimg.com/v2-7380a220b0b805176087ea800e8048fc_b.jpg)

![No Txt](https://pic1.zhimg.com/80/v2-7380a220b0b805176087ea800e8048fc_720w.webp)

吐槽一下PVE下给虚拟机添加PCI设备不能超过5个的限制，PVE的稳定性和一些小毛病还是有的，但可以略做妥协做到相对稳定的长期使用。

另外，直通 sata 控制器个数好像超过6个也会报错。

## 1.6. 解决PVE网卡混乱问题

首先，如何一对一确认网卡的名字

```bash
lspci | grep -i ethernet

09:00.0 Ethernet controller: Intel Corporation I210 Gigabit Network Connection (rev 03)
0a:00.0 Ethernet controller: Intel Corporation I210 Gigabit Network Connection (rev 03)
0f:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller (rev 05)
10:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller (rev 05)
11:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller (rev 05)
12:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8125 2.5GbE Controller (rev 05)
```

开头的地址为 PCI 总线地址，16 进制，根据相关规则，对应到网卡名称为：

板载网卡为 eno1 eno2

后面的2.5G网卡是 因为是16进制，所以，f对应15,10对应16,11对应17,12对应18，因此是enp15s0,enp16s0,enp17s0,enp18s0

## 1.7. 开启IOMMU

此步骤几乎为必须

启动内核IOMMU支持

```bash
vim /etc/default/grub
```

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
改为
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream video=efifb:off"
```

```bash
update-grub

reboot
```

## 1.8. 硬盘的直通和休眠

通过qm的方式直通，可以，但不推荐

最佳方式仍然是：直通sata控制器。因为：

1. 可以休眠，检测硬盘健康度等，充分利用nas系统优势
2. 虚拟机关机时，硬盘是彻底断电，并非休眠。省电的同时，节省机械硬盘的寿命

我的超微主板有两个sata控制器，分别是4口和6口，4口已经用来运行PVE宿主机系统，因此是直通了另一个6口sata控制器给Truenas，平时连机械sata或sas盘用于冷备，一般很少开机，只在定期备份时临时启动。

平时数据则用PCI转出的M.2固态，实现“全固态NAS”和“机械NAS”之间的切换。

注意：你宿主机是sata固态时，切忌，不要直接直通sata controller（因为真的有人会贸然学这个操作）

![No Txt](https://pic4.zhimg.com/v2-764513dbbfae2378483a59ec78cb2f73_b.jpg)

![No Txt](https://pic4.zhimg.com/80/v2-764513dbbfae2378483a59ec78cb2f73_720w.webp)

这里简单补充普通的qm直通方式：

查看存储设备的id，记住

```bash
ls /dev/disk/by-id
```

然后硬盘映射

注意：这里需要将107换成虚拟机的真实ID，sata1这里也可以换成未占用的id数（PVE支持satat0-5）

```bash
qm set 107 -sata1 /dev/disk/by-id/ata-TOSHIBA_MG06ACA10TE_6970A01YFKQE
```

如果返回以下信息,说明已成功映射

```bash
update VM 107: -sata1 /dev/disk/by-id/ata-WDC_XXXX_XXXX_XXXX
```

在网页端 100 虚拟机下查看确定是否成功，再继续后续的操作即可

## 1.9. 安装win10虚拟机

PVE安装虚拟机教程也很多，没有什么难度。这里特别提一下PVE安装Windows系统的另一种方式：直接在物理硬盘上安装

也就是和正常安装Windows一样，也可以把装好win10的固态盘直接拿来就行。操作也非常简单，套个Windows虚拟机的模板，调调参数就行了，具体步骤如下：

首先，你有一个安装了Windows的物理盘，且装到了PVE上

1、创建虚拟机，并做一些简单设置，比较随意，这只是个简单模板，图示如下：

![No Txt](https://pic3.zhimg.com/v2-cd8b84c77975e5d05c7ee92544229b46_b.jpg)

![No Txt](https://pic3.zhimg.com/80/v2-cd8b84c77975e5d05c7ee92544229b46_720w.webp)

然后

![No Txt](https://pic2.zhimg.com/v2-0c21df678c14d0255004b40f5b6427ed_b.jpg)

![No Txt](https://pic2.zhimg.com/80/v2-0c21df678c14d0255004b40f5b6427ed_720w.webp)

然后

![No Txt](https://pic1.zhimg.com/v2-551bac65cbb1b765e2953a789e7d4564_b.jpg)

![No Txt](https://pic1.zhimg.com/80/v2-551bac65cbb1b765e2953a789e7d4564_720w.webp)

然后

![No Txt](https://pic1.zhimg.com/v2-d194118cfe0af8a28bf7f14f050b8570_b.jpg)

![No Txt](https://pic1.zhimg.com/80/v2-d194118cfe0af8a28bf7f14f050b8570_720w.webp)

然后

![No Txt](https://pic3.zhimg.com/v2-a4d97cfc9a931d8732c9102dda09d17a_b.jpg)

![No Txt](https://pic3.zhimg.com/80/v2-a4d97cfc9a931d8732c9102dda09d17a_720w.webp)

接下来才是重点，前面的配置后续都可以自己微调。

先把我装了系统的M.2硬盘添加进来

![No Txt](https://pic2.zhimg.com/v2-d0ecfa40ddf13e718f54d164133b5d81_b.jpg)

![No Txt](https://pic2.zhimg.com/80/v2-d0ecfa40ddf13e718f54d164133b5d81_720w.webp)

然后在选项，引导顺序中，把刚才的PCI设备（也就是我装了系统的M.2硬盘）设置为第一并拖到第一个，取消勾选其它所有

![No Txt](https://pic3.zhimg.com/v2-e8b207c0fb4689a9e2b6b2f6672cf53e_b.jpg)

![No Txt](https://pic3.zhimg.com/80/v2-e8b207c0fb4689a9e2b6b2f6672cf53e_720w.webp)

![No Txt](https://pic1.zhimg.com/v2-56afd68d6cb77ef4b37ea9c94e58acdc_b.jpg)

![No Txt](https://pic1.zhimg.com/80/v2-56afd68d6cb77ef4b37ea9c94e58acdc_720w.webp)

之后启动虚拟机，就完成了

![No Txt](https://pic3.zhimg.com/v2-fe8388e076cd23d32e92facdb58bf2d2_b.jpg)

![No Txt](https://pic3.zhimg.com/80/v2-fe8388e076cd23d32e92facdb58bf2d2_720w.webp)

进入系统后发现没网，可以自己设置直通网卡，用E1000或者上传virtIO的CD安装驱动或自己打驱动，都可以，这里不啰嗦了。

其它问题

仅用于传统安装win10虚拟机下：

1. 使用OVMF
2. q35
3. 勾选TPM和v2.0
4. 启用NUMA
5. 千万不要勾选预安装秘钥
6. 在虚拟机开机阶段按下 Esc 进入 BIOS 管理界面，在 Boot Manager 里选择安装镜像所在的设备启动，否则进不去安装界面
7. 进入安装的时候，要挂载两个DVD ISO，一个win10，一个virtio
8. 一定要记住 两个CD必须隔开，一个ide0一个ide2
9. 安装所有必备驱动：在设备管理器中，PCI设备是感叹号，需要更新。然后右键 更新，选择我们前面挂载的virtIO驱动光盘最外面目录，让它自己扫描安装就行了
10. virtIO镜像 [https://github.com/virtio-win/virtio-win-pkg-scripts](https://link.zhihu.com/?target=https%3A//github.com/virtio-win/virtio-win-pkg-scripts)

## 1.10. 安装其它虚拟机

无法进入安装

```bash
Fresh install on Debian Buster, following this install guide, adapted to Buster.
On reboot, I get this:

Loading Linux 5.0.21-3-pve ...
error: /boot/vmlinuz-5.0.21-3-pve has invalid signature.
Loading initial ramdisk ...
error: you need to load the kernel first.
```

解决：需要在进入时立刻按esc进入BIOS，然后关闭secure boot

具体在第一个里面有一个secure相关的选项，进去以后，把x关闭，然后保存，回来continue就行了

注意事项

truenas系统仅占用4G多，8G虽然足够，但依然要给足最低16G，因为后续Truenas升级时会提示你boot空间不够。

其它闲话

例如群晖已经被破解麻了，安装一点难度都没有。

威联通教程少，好像也就老骥伏枥的教程，难度较大，好在威联通有一个云系统，这个安装非常简单，有兴趣可以尝试。

## 1.11. 安装UPS

由于我用的是APC的BK650，用这种方法。如果你用山特的等其它设备，这个教程可能不适用。

安装apcupsd

```bash
apt install apcupsd -y
```

修改配置

```bash
vim /etc/apcupsd/apcupsd.conf
```

必须要修改几个地方

```bash
#UPSNAME改成
UPSNAME XXX（随便起个名字）

#设置为5表示，切换到ups电源5S后开始关闭虚拟机，然后关闭宿主机，0为不启用，这里必须要设置
TIMEOUT 2

#每隔5s输出ups状态到日志中
STATTIME 5

#开启日志，日志文件为/var/log/apcupsd.status
LOGSTATS on

#线缆类型为usb
UPSCABLE usb
 
#usb接口，自动识别
UPSTYPE usb
 
#还要注意把这行注释掉，不然不会自动发现usb
# DEVICE /dev/ttyS0
 
#断电6s后才识别为正在使用电池，防止短时间断电导致错误
ONBATTERYDELAY 6
 
#电池电量低于5%时关闭主机，建议修改为95，UPS电池老化后经不起几分钟耗电，等还剩5%的时候再关机已经晚了
BATTERYLEVEL 95
 
#预计电量剩余时间小于3分钟时关闭主机，建议设置60
MINUTES 60
```

之后设置该服务开机自启

```bash
#启动apcupsd
systemctl start apcupsd

#查看apcupsd进程状态
systemctl status apcupsd

#开机启动
systemctl enable apcupsd

#重启apcupsd，更改配置文件后使用
systemctl restart apcupsd

#查看ups状态
apcaccess

systemctl status apcupsd
```

## 1.12. 安装SMART工具

用于查看PVE下盘的信息

```bash
apt-get install smartmontools hddtemp -y
```

先看看有哪些盘

```bash
hddtemp /dev/sd?
```

然后看smart信息

```bash
smartctl -s on -a /dev/sda
```

只看必要的

```bash
smartctl -A /dev/sda
```

## 1.13. 安装iperf

测网速用的，用于排查一些驱动问题，下载地址：[https://iperf.fr/iperf-download.php#macos](https://link.zhihu.com/?target=https%3A//iperf.fr/iperf-download.php%23macos)

linux可以直接装：

```bash
apt-get install iperf3 -y
```

openwrt安装方式：

```bash
opkg update
opkg install iperf
```

使用：

服务端

```bash
iperf3 -s
```

客户端

```bash
iperf3 -c 192.168.50.111 -t 60
```

## 1.14. PVE优化

## 1.15. ipmitool设置

ipmi网口的地址BMC，需要在主板bios中设置

ipmi工具可以在超微官网搜索下载

## 1.16. 虚拟机自动重启脚本

PVE 时不时会宕机（原因不详，可能是硬件问题，也可能系统问题），利用脚本每隔一分钟检测一次虚拟机是否有心跳，如果没有心跳，就强制重启虚拟机

```bash
#!/usr/bin/env bash
function check_and_restart() {
    vm_id="${1}"
    vm_ip="${2}"
    # curl --connect-timeout 5 -sSL "${vm_ip}" > /dev/null
    ping -c 1 "${vm_ip}" > /dev/null
    if [[ $? != 0 ]]; then
  now=`timedatectl status | grep 'Local time' | awk -F"Local time: " '{ print $2 }'`
  echo "[${now}] [NO] id = ${vm_id}, ip = ${vm_ip}"
        /usr/sbin/qm stop "${vm_id}"
        /usr/sbin/qm start "${vm_id}"
    fi
}

function main() {
    vm_list=${1}
    for each in ${vm_list}; do
        vm_id=`echo "${each}" | awk -F: '{ print $1 }'`
        vm_ip=`echo "${each}" | awk -F: '{ print $2 }'`
  check_and_restart "${vm_id}" "${vm_ip}"
    done
}

# 需要检查的虚拟机列表，格式为 vm_id:vm_ip
vm_list="
100:10.0.0.1
101:10.0.0.2
"

# 打印时间
# timedatectl status | grep 'Local time' | awk -F"Local time: " '{ print $2 }'

main "${vm_list}"

```

```bash
vi /root/check_and_restart.sh
```

```bash
#!/usr/bin/env bash
function check_and_restart() {
    vm_id="${1}"
    vm_ip="${2}"
    # curl --connect-timeout 5 -sSL "${vm_ip}" > /dev/null
    ping -c 1 "${vm_ip}" > /dev/null
    if [[ $? != 0 ]]; then
  now=`timedatectl status | grep 'Local time' | awk -F"Local time: " '{ print $2 }'`
  echo "[${now}] [NO] id = ${vm_id}, ip = ${vm_ip}"
        /usr/sbin/qm stop "${vm_id}"
        /usr/sbin/qm start "${vm_id}"
    fi
}

function main() {
    vm_list=${1}
    for each in ${vm_list}; do
        vm_id=`echo "${each}" | awk -F: '{ print $1 }'`
        vm_ip=`echo "${each}" | awk -F: '{ print $2 }'`
  check_and_restart "${vm_id}" "${vm_ip}"
    done
}

# 需要检查的虚拟机列表，格式为 vm_id:vm_ip
vm_list="
100:192.168.50.11
101:192.168.50.12
103:192.168.50.3
104:192.168.50.158
105:192.168.50.144
"

# 打印时间
# timedatectl status | grep 'Local time' | awk -F"Local time: " '{ print $2 }'

main "${vm_list}"


```

将以上文件保存至 `/root/check_and_restart.sh`，然后在 `crontab` 里写入：

```bash
crontab -e

*/15 * * * * bash /root/check_and_restart.sh >> /root/log.txt
```

由于一些虚拟机开机特别慢，因此时间太短也不行，例如虚拟机下的Windows开机长达3分钟，因此间隔尽量长一些。否则虚拟机开一半就还得stop再start，陷于永久循环。一般没什么要求还是15分钟以上

随后执行

```bash
systemctl restart cron
```

## 1.17. PVE降低功耗

此方案一般不建议使用，节能有限，我个人觉得体验不是很好

```bash
vi /etc/default/grub
```

找到quiet那个位置，后面加空格，再加

```bash
intel_pstate=disable
```

加上参数后保存，并更新grub

```bash
update-grub
```

下载工具

```bash
apt-get install cpufrequtils
```

了解常见cpu运行模式

```bash
ondemand：系统默认的超频模式，按需调节，内核提供的功能，不是很强大，但有效实现了动态频率调节，平时以低速方式运行，当系统负载提高时候自动提高频率。以这种模式运行不会因为降频造成性能降低，同时也能节约电能和降低温度。一般官方内核默认的方式都是ondemand。
 
interactive：交互模式，直接上最高频率，然后看CPU负荷慢慢降低，比较耗电。Interactive 是以 CPU 排程数量而调整频率，从而实现省电。InteractiveX 是以 CPU 负载来调整 CPU 频率，不会过度把频率调低。所以比 Interactive 反应好些，但是省电的效果一般。
 
conservative：保守模式，类似于ondemand，但调整相对较缓，想省电就用他吧。Google官方内核，kang内核默认模式。
 
smartass：聪明模式，是I和C模式的升级，该模式在比interactive 模式不差的响应的前提下会做到了更加省电。
 
performance：性能模式！只有最高频率，从来不考虑消耗的电量，性能没得说，但是耗电量。
 
powersave 省电模式，通常以最低频率运行。
 
userspace：用户自定义模式，系统将变频策略的决策权交给了用户态应用程序，并提供了相应的接口供用户态应用程序调节CPU 运行频率使用。也就是长期以来都在用的那个模式。可以通过手动编辑配置文件进行配置
 
Hotplug：类似于ondemand, 但是cpu会在关屏下尝试关掉一个cpu，并且带有deep sleep，比较省电。
```

查看现有配置

```bash
cpufreq-info #查询命令
 
 
 
analyzing CPU 0:
  driver: intel_cpufreq
  CPUs which run at the same hardware frequency: 0
  CPUs which need to have their frequency coordinated by software: 0
  maximum transition latency: 20.0 us.
  hardware limits: 1.20 GHz - 2.80 GHz
  available cpufreq governors: conservative, ondemand, userspace, powersave, performance, schedutil
  current policy: frequency should be within 1.20 GHz and 1.20 GHz.
                  The governor "conservative" may decide which speed to use #此行引号内内容为工作模式
                  within this range.
  current CPU frequency is 1.20 GHz.
 
```

配置文件位置 /etc/init.d/cpufrequtils 查找GOVERNOR内容替换

```bash
vi /etc/init.d/cpufrequtils

默认
ENABLE="true"   
GOVERNOR="ondemand"
MAX_SPEED="0"
MIN_SPEED="0"


ENABLE="true"   
GOVERNOR="conservative"  #运行模式,依照需求调整
MAX_SPEED="0"         #上限 #自定义模式下设置cpu频率上限   ，非自定义模式不要填写，否则导致频率锁死最低频率MIN_SPEED="0" 
MIN_SPEED="0"         #下限



改为
ENABLE="true"   
GOVERNOR="powersave"
MAX_SPEED="1200000"
MIN_SPEED="1200000"

```

重启服务：

```bash
systemctl daemon-reload

/etc/init.d/cpufrequtils restart
```

## 1.18. 其它省电操作：主板关闭ASPM，pve系统也要关闭ASPM

## 1.19. 主板设置要balanced power

## 1.20. 关闭超线程

## 1.21. PVE 问题汇总

## 1.22. PVE虚拟机总是断连

Virtio与E1000，这是两种不同的网络虚拟化技术，Virtio是半虚拟化而E1000是全虚拟化。半虚拟化技术的隔离度是没有全虚拟化好的，这就是为什么在使用Virtio时，OpenWRT网络出现问题会导致整个Proxmox的网络都不能用了的原因。除了这两种虚拟化方式外，还有些更为先进的虚拟化技术，如SR-IVO等。

因此，优先VirtIO，出了问题就选E1000。但可能跑不满网速

解决办法是：禁用Proxmox宿主机上的`TCP checksum offload`，并将OpenWRT使用的网卡虚拟化方式改为`E1000`。实际测试下来没有再发生网卡hang的问题，满速率下载（250Mbps左右）时CPU占用率50%左右，比之前使用`Virtio`时CPU占用率要高10%左右，还是可以接受的。

## 1.23. 如果没有ethtool工具可以执行如下命令安装

```bash
 apt install ethtool 
```

```bash
禁用 tcp 分段卸载和通用分段卸载

ethtool -K eno1 tso off gso off
```

重启后永久生效的话，在对应的网卡配置下, 与address同级添加配置:

```bash
vi /etc/network/interfaces

然后
offload-gso off
offload-gro off
offload-tso off
offload-rx off
offload-tx off
offload-rxvlan off
offload-txvlan off
offload-sg off
offload-ufo off
offload-lro off

```

## 1.24. PVE 总是进入initramfs

问题在于PVE很蠢，等不到zfs池导入就不进入系统，所以只要延迟进入即可

```bash
vi /etc/default/grub


然后找到 GRUB_CMDLINE_LINUX_DEFAULT，在后面加一个 rootdelay=10 即可，例如

GRUB_CMDLINE_LINUX_DEFAULT="rootdelay=10 quiet"
```

然后

```bash
update-grub

重启电脑即可
```

## 1.25. 无法更新解决

企业级无法更新，那就去掉PVE企业源

```bash
vi /etc/apt/sources.list.d/pve-enterprise.list
文件中的唯一一条代码：
deb https://enterprise.proxmox.com/debian/pve stretch pve-enterprise
把它注释掉，或者是删掉
```

最后执行升级

```bash
apt update
apt update&&apt dist-upgrade 
```

## 1.26. 无法关闭虚拟机

rm /var/lock/qemu-server/lock-102.conf #102是你的虚拟机编号

再输入`qm stop 102` 就可以立即关闭你的102号虚拟机了

此问题在Windows上容易出现

## 1.27. 进阶

## 1.28. 实现冷备热备

由于直通sata控制器在虚拟机关机的时候可以让硬盘完全断电，因此，可以用于冷备和定期备份。如何实现呢？

我个人是建立了两个TrueNAS系统

第一个是用固态阵列组raidz1，用于热数据、跑服务、跑虚拟机等这类服务

第二个是用机械硬盘组阵列raidz1，用于冷备。没事的时候就关闭，一方面可以关掉一组阵列的机械硬盘更静音、发热小、省电，另一方面机械硬盘寿命与运行时长有关，可以有效延长寿命。

相反，固态硬盘跟通电时间关系不太大，跟读写量关系大，因此大部分热数据我都是在固态上运行。

至于定期的备份，完全可以通过简单是shell脚本，搭配TrueNAS的Rsync服务实现。

## 1.29. 虚拟机备份和恢复还原

虚拟机备份位置：

```bash
/var/lib/vz/dump
```

可以在虚拟机的“备份”中单独备份，也可以总的批量计划备份。

我们可以通过Truenas的smb、NFS两种主要途径共享，实现虚拟机的定期备份。当然不仅是定期备份，还能直接让虚拟机运行在阵列上。

例如：可以如图先挂载到PVE，然后甚至连虚拟机自身、备份都可以直接运行在NAS上。

![No Txt](https://pic1.zhimg.com/v2-8a2ebe8e4be0430d11a91453118e743c_b.jpg)

![No Txt](https://pic1.zhimg.com/80/v2-8a2ebe8e4be0430d11a91453118e743c_720w.webp)

我个人是用固态组了阵列zfs raidz1，通过这种方式运行虚拟机，速度更快，也更安全。而阵列直通给Truenas，Truenas再通过NFS共享出来给PVE。

## 1.30. PVE 升级内核

![No Txt](https://pic1.zhimg.com/v2-3d5f617c38435274caee6b77fb675818_b.jpg)

![No Txt](https://pic1.zhimg.com/80/v2-3d5f617c38435274caee6b77fb675818_720w.webp)

```bash
apt update && apt install pve-headers-6.1.0-1-pve    -y 

apt install pve-kernel-6.1.0-1-pve     

reboot
```

## 1.31. 常用命令

```bash
qm importdisk <虚拟机编号> <img\vmdk格式文件> <这块磁盘要挂载的位置>

qm importdisk 107 XXXX.qcow2 syno

其中XXX.qcow2是磁盘文件
syno是我个人挂载到pve上的用于备份的空间，来自truenas的nfs挂载的，容量高达30T，实际我设置为2T

最后记得依然格式化为qcow2，否则就改为raw，这个是不能动态扩展的
qm importdisk 101 /storage/images/100/vm-100-disk-0.qcow2 syno  --format=qcow2
```

## 1.32. 补充

## 1.33. 核显直通

如果是用核显，可以参考，但不保证适用所有

## 1.34. 开启BIOS支持

启用vt-x

## 1.35. 启动内核IOMMU支持

```bash
vim /etc/default/grub
```

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
改为
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream video=efifb:off"
```

```bash
update-grub
```

## 1.36. 加载vifo模块

```bash
vim /etc/modules
```

结尾添加

```bash
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

## 1.37. 禁用驱动

阻止驱动加载（核心显卡直通时才需要操作）

PVE黑名单设置，添加驱动黑名单

```bash
vim /etc/modprobe.d/blacklist.conf
```

```bash
blacklist snd_hda_intel
blacklist snd_hda_codec_hdmi
blacklist i915





# block AMD driver
blacklist radeon
blacklist amdgpu

# block NVIDIA driver
blacklist nouveau
blacklist nvidia
blacklist nvidiafb

# block INTEL driver
blacklist snd_hda_intel
blacklist snd_hda_codec_hdmi
blacklist i915
```

找显卡和声卡

```bash
lspci

lspci | grep VGA
lspci | grep Audio
```

找VGA和Audio

```bash
00:02.0 VGA compatible controller: Intel Corporation CometLake-S GT2 [UHD Graphics 630]

00:1f.3 Audio device: Intel Corporation Cannon Lake PCH cAVS (rev 10)

```

后来有两个VGA

```bash
02:00.0 VGA compatible controller: NVIDIA Corporation GM107 [GeForce GTX 750] (rev a2)
04:00.0 VGA compatible controller: ASPEED Technology, Inc. ASPEED Graphics Family (rev 30)
```

一个Audio

```bash
02:00.1 Audio device: NVIDIA Corporation GM107 High Definition Audio Controller [GeForce 940MX] (rev a1)
```

根据前两位数找对应硬件ID，与上面一一对应

```bash
lspci -n -s 00:02.0
lspci -n -s 00:1f.3
```

后来的新的显卡是

```bash
lspci -n -s 02:00.0
lspci -n -s 02:00.1
```

分别得到

```bash
00:02.0 0300: 8086:3e92
00:1f.3 0403: 8086:a348 (rev 10)
```

```bash
02:00.0 0300: 10de:1381 (rev a2)
02:00.1 0403: 10de:0fbc (rev a1)
```

## 1.38. 将设备加入进vfio

用于添加直通组

```bash
vim /etc/modprobe.d/vfio.conf
```

原来的

```bash
options vfio-pci ids=8086:3e92,8086:a348
```

新的（最后是我的1065测试用）

```bash
options vfio-pci ids=10de:1381,10de:0fbc,10de:1c04

```

## 1.39. 防止在win10中显卡代码43

添加options防止VM死机

```bash
vim /etc/modprobe.d/kvm.conf
```

```bash
options kvm ignore_msrs=1
```

## 1.40. 信任设备

```bash
echo "options vfio_iommu_type1 allow_unsafe_interrupts=1" > /etc/modprobe.d/iommu_unsafe_interrupts.conf
```

## 1.41. 更新配置

更新内核并重启PVE

```bash
update-initramfs -u
```

```bash
reboot
```

检查模块是否加载成功

```bash
lsmod | grep vfio
```

然后在图形界面添加显卡，开启全部功能，勾选pcie

## 1.42. N卡直通

N卡比起核显直通问题简单很多

游戏串死

请确认是不是windows一直GPU占用100%，如果是则尝试以下方法，在grub后追加 pcie\_aspm=off，例如

```bash
vi /etc/default/grub

GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on video=efifb:off pcie_aspm=off"

然后
update-grub

reboot

```

安装windows时直接蓝屏，显示```bash [SYSTEM THREAD EXCEPTION NOT HANDLED ...]```

运行以下代码然后重启宿主机

```bash
echo "options kvm ignore_msrs=1 report_ignored_msrs=0" > /etc/modprobe.d/kvm.conf
```

更新内核并重启PVE

```bash
update-initramfs -u

reboot
```

此外还必须进行以下操作，否则驱动出错： WebUI中：对应虚拟机->硬件->显卡对应的PCI设备（双击）->勾选x-vga（主GPU）

## 1.43. 开启SR-IOV

不是万兆网，不用设置此项

万兆网卡需要这个，虚拟机之间通过网络传数据走的是PCI，一个是速度快，尤其并发高的时候。其次节约交换机网口，例如4个虚拟机机不用占4个交换机口，一个口就够了。

首先，在BIOS中打开下面这些选项

```bash
Vd-t, IO-MMU, SR-IOV
```

然后

```bash
vi /etc/default/grub
```

修改 GRUB\_CMDLINE\_LINUX\_DEFAULT="quiet "为

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pci=assign-busses pcie_acs_override=downstream"

GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pci=assign-busses pcie_acs_override=downstream video=efifb:off"
```

> _intel\_iommu=on是适用于intel平台_  
> _pcie\_acs\_override=downstream 是提示内存报错_  
> _pci=assign-busses和iommp=pt 是开启sr-iov需要的参数_

然后加载直通内核模块

```bash
vi /etc/modules
```

添加

```bash
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

更新

```bash
update-initramfs -u -k all

update-grub
```

```bash
reboot now
```

## 1.44. 检查并设置虚拟网卡

查看iommu是否开启

```bash
dmesg | grep -e DMAR -e IOMMU -e AMD-Vi
```

查看所有网卡

```bash
lspci -nn|grep Eth

```

我的四个网卡分别是

```bash
05:00.0 Ethernet controller [0200]: Intel Corporation I210 Gigabit Network Connection [8086:1533] (rev 03)
06:00.0 Ethernet controller [0200]: Intel Corporation I210 Gigabit Network Connection [8086:1533] (rev 03)
07:00.0 Ethernet controller [0200]: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 [8086:1528] (rev 01)
07:00.1 Ethernet controller [0200]: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 [8086:1528] (rev 01)
```

查看BF

```bash
lshw -c network -businfo
```

没有安装的自己用

```bash
apt-get install lshw
```

得到

```bash
Bus info          Device     Class          Description
=======================================================
pci@0000:05:00.0  eno1       network        I210 Gigabit Network Connection
pci@0000:06:00.0  eno2       network        I210 Gigabit Network Connection
pci@0000:07:00.0  enp181s0f0   network        Ethernet Controller 10-Gigabit X540-AT2
pci@0000:07:00.1  enp181s0f1   network        Ethernet Controller 10-Gigabit X540-AT2
```

其中万兆网卡是enp181s0f0，其ID是0000:07:00.0

```bash
=======================================================
pci@0000:05:00.0  ens15f0    network        Ethernet Controller 10-Gigabit X540-AT2
pci@0000:05:00.1  ens15f1    network        Ethernet Controller 10-Gigabit X540-AT2
```

查看器sr-iov能力

```bash
lspci -s 0000:07:00.0 -vvv | grep Capabilities

lspci -s 0000:04:00.0 -vvv | grep Capabilities

lspci -s 0000:b3:00.0 -vvv | grep Capabilities
```

同理可以查看其它网卡，不过只有特定类型的网卡才能用SRIOV，需要自己去网上查支持的型号

```bash
lspci -s 05:00.0 -vvv | grep Capabilities
lspci -s 06:00.0 -vvv | grep Capabilities

lspci -s 07:00.1 -vvv | grep Capabilities
```

开启4个试试看

```bash
echo 4 > /sys/class/net/enp181s0f0/device/sriov_numvfs
```

可以在pve网页看到新生成的VF，也可以命令行看

```bash
lshw -c network -businfo
或
lspci -nn|grep Eth
```

成功后，可以开机自动化了，上述在重启后失效，所以要写脚本，开机自动完成自己想要的初始化操作

```bash
vi /etc/init.d/net-sriov
```

```bash
#! /bin/sh
## BEGIN INIT INFO
# Provides:          sriov_script
# Required-Start:    $network $named $remote_fs $syslog $sriov_scripts
# Required-Stop:     $remote_fs $sriov_scripts
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6 
# Short-Description: SR-IOV initialization.
#Description:       Initializing VM's network with sriov support.
## END INIT INFO

start () {
    #enable Sriov
    echo 8 > /sys/class/net/enp181s0f0/device/sriov_numvfs
    echo 8 > /sys/class/net/enp181s0f1/device/sriov_numvfs

    ip link set dev enp181s0f0 up
    ip link set dev enp181s0f1 up
    
    ip link set dev enp181s0f0 vf 0 mac 24:8a:07:b7:a8:71
    ip link set dev enp181s0f0 vf 1 mac 24:8a:07:b7:a8:72
    ip link set dev enp181s0f0 vf 2 mac 24:8a:07:b7:a8:73
    ip link set dev enp181s0f0 vf 3 mac 24:8a:07:b7:a8:74
    ip link set dev enp181s0f0 vf 4 mac 24:8a:07:b7:a8:75
    ip link set dev enp181s0f0 vf 5 mac 24:8a:07:b7:a8:76
    ip link set dev enp181s0f0 vf 6 mac 24:8a:07:b7:a8:77
    ip link set dev enp181s0f0 vf 7 mac 24:8a:07:b7:a8:78

    ip link set dev enp181s0f1 vf 0 mac 24:8a:07:b7:a8:81
    ip link set dev enp181s0f1 vf 1 mac 24:8a:07:b7:a8:82
    ip link set dev enp181s0f1 vf 2 mac 24:8a:07:b7:a8:83
    ip link set dev enp181s0f1 vf 3 mac 24:8a:07:b7:a8:84
    ip link set dev enp181s0f1 vf 4 mac 24:8a:07:b7:a8:85
    ip link set dev enp181s0f1 vf 5 mac 24:8a:07:b7:a8:86
    ip link set dev enp181s0f1 vf 6 mac 24:8a:07:b7:a8:87
    ip link set dev enp181s0f1 vf 7 mac 24:8a:07:b7:a8:88
}
stop () {
    [ "$READ_INTERFACES" != "no" ] && network_interfaces ifdown
}

case $1 in
    start)
        start
        ;;
    stop | force-stop)
        stop
        ;;
    *)
        echo "Usage: $0 {start|stop}" >&2
        exit 1
        ;;
esac

exit 0
```

```bash
chmod +x /etc/init.d/net-sriov
systemctl enable net-sriov
update-initramfs -u -k all
update-grub
reboot now
```

上述，提示：0 1 6无效，这三个虚拟网卡没用，只能用 2/3/4/5，因为default中设置了默认开启和默认停止的网卡

因此也可以参考下面，用单口演示：

```bash
vi /etc/init.d/net-sriov
```

```bash
#! /bin/sh
## BEGIN INIT INFO
# Provides:          sriov_script
# Required-Start:    $network $named $remote_fs $syslog $sriov_scripts
# Required-Stop:     $remote_fs $sriov_scripts
# Default-Start:     0 1 2 3 4 5 6
# Default-Stop:      7
# Short-Description: SR-IOV initialization.
#Description:       Initializing VM's network with sriov support.
## END INIT INFO

start () {
    #enable Sriov
    echo 8 > /sys/class/net/enp181s0f0/device/sriov_numvfs
    echo 8 > /sys/class/net/enp181s0f1/device/sriov_numvfs

    ip link set dev enp181s0f0 up
    ip link set dev enp181s0f1 up
    
    ip link set dev enp181s0f0 vf 0 mac 24:8a:07:b7:a8:71
    ip link set dev enp181s0f0 vf 1 mac 24:8a:07:b7:a8:72
    ip link set dev enp181s0f0 vf 2 mac 24:8a:07:b7:a8:73
    ip link set dev enp181s0f0 vf 3 mac 24:8a:07:b7:a8:74
    ip link set dev enp181s0f0 vf 4 mac 24:8a:07:b7:a8:75
    ip link set dev enp181s0f0 vf 5 mac 24:8a:07:b7:a8:76
    ip link set dev enp181s0f0 vf 6 mac 24:8a:07:b7:a8:77
    ip link set dev enp181s0f0 vf 7 mac 24:8a:07:b7:a8:78

    ip link set dev enp181s0f1 vf 0 mac 24:8a:07:b7:a8:81
    ip link set dev enp181s0f1 vf 1 mac 24:8a:07:b7:a8:82
    ip link set dev enp181s0f1 vf 2 mac 24:8a:07:b7:a8:83
    ip link set dev enp181s0f1 vf 3 mac 24:8a:07:b7:a8:84
    ip link set dev enp181s0f1 vf 4 mac 24:8a:07:b7:a8:85
    ip link set dev enp181s0f1 vf 5 mac 24:8a:07:b7:a8:86
    ip link set dev enp181s0f1 vf 6 mac 24:8a:07:b7:a8:87
    ip link set dev enp181s0f1 vf 7 mac 24:8a:07:b7:a8:88
}
stop () {
    [ "$READ_INTERFACES" != "no" ] && network_interfaces ifdown
}

case $1 in
    start)
        start
        ;;
    stop | force-stop)
        stop
        ;;
    *)
        echo "Usage: $0 {start|stop}" >&2
        exit 1
        ;;
esac

exit 0
```

```bash
#! /bin/sh
## BEGIN INIT INFO
# Provides:          sriov_script
# Required-Start:    $network $named $remote_fs $syslog $sriov_scripts
# Required-Stop:     $remote_fs $sriov_scripts
# Default-Start:     0 1 2 3 4 5 6
# Default-Stop:      7
# Short-Description: SR-IOV initialization.
#Description:       Initializing VM's network with sriov support.
## END INIT INFO

start () {
    #enable Sriov
    echo 8 > /sys/class/net/enp181s0f0/device/sriov_numvfs

    ip link set dev enp181s0f0 up
    
    ip link set dev enp181s0f0 vf 0 mac 24:8a:07:b7:a8:71
    ip link set dev enp181s0f0 vf 1 mac 24:8a:07:b7:a8:72
    ip link set dev enp181s0f0 vf 2 mac 24:8a:07:b7:a8:73
    ip link set dev enp181s0f0 vf 3 mac 24:8a:07:b7:a8:74
    ip link set dev enp181s0f0 vf 4 mac 24:8a:07:b7:a8:75
    ip link set dev enp181s0f0 vf 5 mac 24:8a:07:b7:a8:76
    ip link set dev enp181s0f0 vf 6 mac 24:8a:07:b7:a8:77
    ip link set dev enp181s0f0 vf 7 mac 24:8a:07:b7:a8:78
}
stop () {
    [ "$READ_INTERFACES" != "no" ] && network_interfaces ifdown
}

case $1 in
    start)
        start
        ;;
    stop | force-stop)
        stop
        ;;
    *)
        echo "Usage: $0 {start|stop}" >&2
        exit 1
        ;;
esac

exit 0
```

```bash
chmod +x /etc/init.d/net-sriov
systemctl enable net-sriov
update-initramfs -u -k all
update-grub
reboot now


```

查看情况

```bash
05:00.0 Ethernet controller [0200]: Intel Corporation I210 Gigabit Network Connection [8086:1533] (rev 03)
06:00.0 Ethernet controller [0200]: Intel Corporation I210 Gigabit Network Connection [8086:1533] (rev 03)
07:00.0 Ethernet controller [0200]: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 [8086:1528] (rev 01)
07:00.1 Ethernet controller [0200]: Intel Corporation Ethernet Controller 10-Gigabit X540-AT2 [8086:1528] (rev 01)
08:10.0 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:10.1 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:10.2 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:10.3 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:10.4 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:10.5 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:10.6 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:10.7 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.0 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.1 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.2 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.3 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.4 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.5 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.6 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
08:11.7 Ethernet controller [0200]: Intel Corporation X540 Ethernet Controller Virtual Function [8086:1515] (rev 01)
```

其它配置

- 在Hardware中，要将内存设置为 "balloon=0"
- 在Options栏中，设置Startup delay 延迟1-5分钟再开启，保证SR-IOV服务开启后，再启动虚拟机
- 所有虚拟机在添加SR-IOV的VF网卡的时候，都不要选择所有功能，不勾选就是直通单个虚拟网卡，选择就是全部直通。但是ROM-bar和PCIE可以勾选
- sriov在win不是免驱的，需要同时添加pve的默认自带的虚拟网卡和SRIOV的vf网卡，自带的网卡是为了联网，打驱动用360驱动之类都可以，然后自带的虚拟网卡就可以不用了

补充

- SR-IOV所开出的VF，不能被加入Linux Bridge或者OVS-Bridge，只能作为基本的网络端口使用
- Ubuntu、CentOS这些系统用于虚拟机，都能直接使用VF，但常用的软路由系统，”OpenWRT”，则需要重新编译网卡驱动才能启用
- 所有虚拟机在添加SR-IOV的VF网卡的时候，都不要选择所有功能  
    选择以后会把所在分组的4个网卡一起直通到虚拟机  
    不勾选就是直通单个虚拟网卡。

## 1.45. 另一种开启方法：注册系统服务，固定SR-IOV

首先创建启动脚本

```bash
vi /etc/systemd/system/sriov.service
```

也可以用finalshell编辑

```bash
[Unit]
Description=Script to enable SR-IOV on boot
 
[Service]
Type=simple
#start SR-IOV
ExecStartPre=/usr/bin/bash -c '/usr/bin/echo 8 > /sys/class/net/ens11f1/device/sriov_numvfs'

#set VF MAC
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 0 mac 86:24:72:8c:91:00'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 1 mac 86:24:72:8c:91:01'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 2 mac 86:24:72:8c:91:02'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 3 mac 86:24:72:8c:91:03'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 4 mac 86:24:72:8c:91:04'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 5 mac 86:24:72:8c:91:05'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 6 mac 86:24:72:8c:91:06'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set dev ens11f1 vf 7 mac 86:24:72:8c:91:07'

#set PF up
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1 up'

#set VF up
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v0 up'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v1 up'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v2 up'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v3 up'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v4 up'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v5 up'
ExecStartPre=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v6 up'
ExecStart=/usr/bin/bash -c '/usr/bin/ip link set ens11f1v7 up'
Restart=on-failure
 
[Install]
WantedBy=multi-user.target
```

注册开机启动服务

```bash
systemctl daemon-reload
systemctl enable sriov.service
```

重启

```bash
reboot
```

## 1.46. 跑分测试

```bash
wget http://cdn.geekbench.com/Geekbench-5.1.0-Linux.tar.gz

tar -xzvf Geekbench-5.1.0-Linux.tar.gz

cd Geekbench-5.1.0-Linux

./geekbench5
```

发布
