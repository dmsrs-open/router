![](https://upsangel.com/wp-content/uploads/2023/10/conf-2023-10-06_084855.jpg)

PVE教學經常會看到起手式設置PCIE直通和IOMMU分組之類的環境參數，正好小U要嘗試核顯+HDMI直通，本文就梳理一下相關的參數設置是什麼意思。

摘要節點

- [GRUB和intel\_iommu](https://upsangel.com/htpc-nas/iommu-vfio-gpo-proxmox-pve-pcie%E7%9B%B4%E9%80%9A%E5%92%8C%E6%A0%B8%E9%A1%AFhdmi%E7%9B%B4%E9%80%9A%E8%A8%AD%E7%BD%AE%E5%8F%83%E6%95%B8%E8%A7%A3%E9%87%8B/#GRUB%E5%92%8Cintel_iommu#GRUB%E5%92%8Cintel_iommu "GRUB和intel_iommu")
- [modules和vifo](https://upsangel.com/htpc-nas/iommu-vfio-gpo-proxmox-pve-pcie%E7%9B%B4%E9%80%9A%E5%92%8C%E6%A0%B8%E9%A1%AFhdmi%E7%9B%B4%E9%80%9A%E8%A8%AD%E7%BD%AE%E5%8F%83%E6%95%B8%E8%A7%A3%E9%87%8B/#GRUB%E5%92%8Cintel_iommu#modules%E5%92%8Cvifo "modules和vifo")
- [直通顯卡以及HDMI](https://upsangel.com/htpc-nas/iommu-vfio-gpo-proxmox-pve-pcie%E7%9B%B4%E9%80%9A%E5%92%8C%E6%A0%B8%E9%A1%AFhdmi%E7%9B%B4%E9%80%9A%E8%A8%AD%E7%BD%AE%E5%8F%83%E6%95%B8%E8%A7%A3%E9%87%8B/#GRUB%E5%92%8Cintel_iommu#%E7%9B%B4%E9%80%9A%E9%A1%AF%E5%8D%A1%E4%BB%A5%E5%8F%8AHDMI "直通顯卡以及HDMI")
  - [Driver的加載](https://upsangel.com/htpc-nas/iommu-vfio-gpo-proxmox-pve-pcie%E7%9B%B4%E9%80%9A%E5%92%8C%E6%A0%B8%E9%A1%AFhdmi%E7%9B%B4%E9%80%9A%E8%A8%AD%E7%BD%AE%E5%8F%83%E6%95%B8%E8%A7%A3%E9%87%8B/#GRUB%E5%92%8Cintel_iommu#Driver%E7%9A%84%E5%8A%A0%E8%BC%89 "Driver的加載")
  - [CONF文件修改](https://upsangel.com/htpc-nas/iommu-vfio-gpo-proxmox-pve-pcie%E7%9B%B4%E9%80%9A%E5%92%8C%E6%A0%B8%E9%A1%AFhdmi%E7%9B%B4%E9%80%9A%E8%A8%AD%E7%BD%AE%E5%8F%83%E6%95%B8%E8%A7%A3%E9%87%8B/#GRUB%E5%92%8Cintel_iommu#CONF%E6%96%87%E4%BB%B6%E4%BF%AE%E6%94%B9 "CONF文件修改")
  - [直通核顯而不需直通HDMI](https://upsangel.com/htpc-nas/iommu-vfio-gpo-proxmox-pve-pcie%E7%9B%B4%E9%80%9A%E5%92%8C%E6%A0%B8%E9%A1%AFhdmi%E7%9B%B4%E9%80%9A%E8%A8%AD%E7%BD%AE%E5%8F%83%E6%95%B8%E8%A7%A3%E9%87%8B/#GRUB%E5%92%8Cintel_iommu#%E7%9B%B4%E9%80%9A%E6%A0%B8%E9%A1%AF%E8%80%8C%E4%B8%8D%E9%9C%80%E7%9B%B4%E9%80%9AHDMI "直通核顯而不需直通HDMI")
- [附送：去除PVE登入後的訂閱提示](https://upsangel.com/htpc-nas/iommu-vfio-gpo-proxmox-pve-pcie%E7%9B%B4%E9%80%9A%E5%92%8C%E6%A0%B8%E9%A1%AFhdmi%E7%9B%B4%E9%80%9A%E8%A8%AD%E7%BD%AE%E5%8F%83%E6%95%B8%E8%A7%A3%E9%87%8B/#GRUB%E5%92%8Cintel_iommu#%E9%99%84%E9%80%81%EF%BC%9A%E5%8E%BB%E9%99%A4PVE%E7%99%BB%E5%85%A5%E5%BE%8C%E7%9A%84%E8%A8%82%E9%96%B1%E6%8F%90%E7%A4%BA "附送：去除PVE登入後的訂閱提示")

[![](https://upsangel.com/wp-content/uploads/2023/BF300250.png)](https://upsangel.com/check/surfsharkvpn/)

## GRUB和intel\_iommu

最常見PVE直通教程第一樣修改的如下：

```
nano /etc/default/grub

找到 GRUB_CMDLINE_LINUX_DEFAULT="quiet"
改为 GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on pcie_acs_override=downstream"

update-grub
```

**Grub是什麼？**

GRUB 是一個引導加載器，當電腦開機時，它會先被載入，然後 GRUB 將負責加載操作系統。

- `intel_iommu=on`: 這會啟用 Intel 的 IOMMU。IOMMU 是輸入/輸出內存管理單元，主要用於虛擬化情境，允許主機和虛擬機共享硬件資源。
- `pcie_acs_override=downstream`: 這用於 PCIe ACS(存取控制服務)的覆蓋。這個參數可能在多個虛擬機使用同一PCIe設備時有所幫助，通常是在硬件層面上對虛擬機進行隔離。

## modules和vifo

編輯 `nano /etc/modules`

```
#增加以下module
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd

#保存後 
update-initramfs -u -k all
```

**modules是什麼？**

`/etc/modules` 是 Linux 系統中的一個配置文件，它用於列出在啟動時應該自動載入的核心模組。這些模組通常是**設備驅動**或其他特殊功能的驅動，它們不是核心的固定部分，但可能是系統正常運行所需的。  
當系統啟動時，`init` 進程或相關的啟動服務會讀取 `/etc/modules` 文件，並使用 `modprobe` 命令來載入其中列出的每一個模組。  
例如，如果你有一個特定的硬體設備，如某種無線網卡，它需要一個特定的驅動來運行，但這個驅動不是預設載入的。在這種情況下，你可以將該驅動的模組名稱添加到 `/etc/modules` 文件中，確保每次系統啟動時它都會被載入。

- `vfio`: 這是 VFIO (Virtual Function I/O) 的主模組。VFIO 是一種提供安全和模塊化的方法來訪問硬件的框架，通常用於虛擬化。
- `vfio_iommu_type1`: 這是 VFIO 的 IOMMU 驅動，它支持 Type 1(I/O Virtualization)。
- `vfio_pci`: 這個模組是用於 PCI/PCIe 設備的 VFIO 驅動。
- `vfio_virqfd`: 這是一個支持 VFIO 虛擬中斷的模組。

將這些模組添加到 `/etc/modules` 會確保在系統啟動時它們被載入，這通常在設置硬件虛擬化或特定的硬件直通（如 GPU 直通到虛擬機）時是必要的。

## 直通顯卡以及HDMI

參考 [gangqizai/igd: Intel 核显直通 rom / Intel Integrated GPU passrough rom file for PVE (github.com)](https://github.com/gangqizai/igd)

> 把显卡驱动加入黑名单
>
> ```
> echo "blacklist i915" >> /etc/modprobe.d/pve-blacklist.conf
> ```
>
> 通过设备ID绑定vfio-pci 执行 lspci -n | grep -E “0300” 查看并记录核显 VendorID 和 DeviceID
>
> ```
> echo "options vfio-pci ids=8086:a780" >> /etc/modprobe.d/vifo.conf
> ```
>
> ```
> update-initramfs -u
> reboot
> 
> vifo.conf 没有 disable_vga=1，有的删掉！
> ```

另一參考 [Intel核顯直通 顯示輸出 HDMI/DP/Type-C簡單方法完整版無需自訂OVMF 可顯示開機BIOS啟動畫面 附送pve\_source使用方法 – YouTube](https://www.youtube.com/watch?v=bqS4Ap7sxYo) ， 設置稍有不同，首先，grub那裏還需要加入：

```
initcall_blacklist=sysfb_init
```

而pve\_blacklist中除了i915之外，還有snd\_hda\_intel （但是沒有snd\_hda\_codec\_hdmi），以及允許設備不安全中斷的定義。總結如下：

> echo “blacklist snd\_hda\_intel” >> /etc/modprobe.d/pve-blacklist.conf  
> echo “blacklist i915” >> /etc/modprobe.d/pve-blacklist.conf  
> echo “options vfio\_iommu\_type1 allow\_unsafe\_interrupts=1” >> /etc/modprobe.d/pve-blacklist.conf

PCIE ID查看和綁定的命令也有不同，YouTube用的是

```
lspci -D -nn | grep VGA
lspci -D -nn | grep Audio
```

### Driver的加載

[gangqizai/igd](https://github.com/gangqizai/igd) 給出的兩個通用BIOS，只需要在虛擬機的conf 文件加入

因为使用两个rom文件，conf配置文件中，一个rom文件加在显卡，另一个加在声卡,大家注意一下。

```
hostpci0: 0000:00:02.0,legacy-igd=1,romfile=gen12_igd.romhostpci1: 0000:00:1f.3,romfile=gen12_gop.rom
```

就能啓動。

但是[愛折騰老高的YouTube](https://www.youtube.com/watch?v=bqS4Ap7sxYo)的步驟要複雜很多，主要因爲是老高的N5105無法使用 [gangqizai/igd](https://github.com/gangqizai/igd) 中gen12\_gop.rom 這個ROM，所以要人手提取並轉化這個gop rom：

[

Intel核显直通 显示输出 HDMI/DP/Type-C简单方法完整版无需定制OVMF 可显示开机BIOS启动画面 附送pve\_source使用方法

](<https://www.youtube.com/watch?v=bqS4Ap7sxYo> "Play video "Intel核显直通 显示输出 HDMI/DP/Type-C简单方法完整版无需定制OVMF 可显示开机BIOS启动画面 附送pve_source使用方法"")

Video can’t be loaded because JavaScript is disabled: [Intel核显直通 显示输出 HDMI/DP/Type-C简单方法完整版无需定制OVMF 可显示开机BIOS启动画面 附送pve\_source使用方法 (https://www.youtube.com/watch?v=bqS4Ap7sxYo)](https://www.youtube.com/watch?v=bqS4Ap7sxYo "Intel核显直通 显示输出 HDMI/DP/Type-C简单方法完整版无需定制OVMF 可显示开机BIOS启动画面 附送pve_source使用方法")

簡單比較一下 GOP 與VBIOS ：

- GOP：沒有 64 KB 的檔案大小限制，需要在32 位元保護模式下執行，UEFI不需要搭配CSM，可以快速開機。
- VBIOS/IGD：有 64 KB 與127 KB的檔案大小限制，且必須要在16 位元執行環境。UEFI 需要搭配 CSM(也就是所謂的Legacy mode), 開機速度比GOP慢。

我的理解 [gangqizai/igd](https://github.com/gangqizai/igd) 的gen12\_igd.rom等於Legacy mode 的 VBIOS ([Bios工程师手边事—IGD VBIOS\_intel bmp工具-CSDN博客](https://blog.csdn.net/zhao_longwei/article/details/50255567))，而gen12\_gop.rom [愛折騰老高的YouTube](https://www.youtube.com/watch?v=bqS4Ap7sxYo) 要自行提取。提取的思路如下：

廠家BIOS –> 用 [“UEFI BIOS Updater” (UBU)](https://winraid.level1techs.com/t/tool-guide-news-uefi-bios-updater-ubu/30357/69?page=4) 來提取顯卡的Video Onboard 的efi –> 用[edk2](https://github.com/tianocore/edk2-BaseTools-win32)把efi轉化爲ROM

- [\[Tool Guide+News\] “UEFI BIOS Updater” (UBU) – BIOS/UEFI Modding / BIOS Modding Guides and Problems – Win-Raid Forum (level1techs.com)](https://winraid.level1techs.com/t/tool-guide-news-uefi-bios-updater-ubu/30357/69?page=4)
- [tianocore/edk2-BaseTools-win32: git-svn mirror of https://svn.code.sf.net/p/edk2-toolbinaries/code/trunk/Win32 (github.com)](https://github.com/tianocore/edk2-BaseTools-win32)

![](https://upsangel.com/wp-content/uploads/2023/10/ubu-extra-2023-10-06_084258-1024x754.jpg)

我的N100按照此方法提取出來的文件是：

- [https://drive.google.com/file/d/1jJ9gp8dU46Szseb-OVspH-7n48RAmHMC/view?usp=drive\_link](https://drive.google.com/file/d/1jJ9gp8dU46Szseb-OVspH-7n48RAmHMC/view?usp=drive_link)

### CONF文件修改

[igd/100.conf at main · gangqizai/igd (github.com)](https://github.com/gangqizai/igd/blob/main/100.conf)，主要添加pci0和pci1的驅動定義：

```
args: -set device.hostpci0.addr=02.0 -set device.hostpci0.x-igd-gms=0x2 -set device.hostpci0.x-igd-opregion=on -debugcon file:/root/igd_debug.log -global isa-debugcon.iobase=0x402
hostpci0: 0000:00:02.0,legacy-igd=1,romfile=gen12_igd.rom
hostpci1: 0000:00:1f.3,romfile=gen12_gop.rom
```

![](https://upsangel.com/wp-content/uploads/2023/10/conf-2023-10-06_084855-1024x490.jpg)

1. `aargs`:
    - `-set device.hostpci0.addr=02.0`: 設定要通過的 PCI 設備的地址。
    - `-set device.hostpci0.x-igd-gms=0x2`: 設定整合顯示卡的顯存大小。
    - `-set device.hostpci0.x-igd-opregion=on`: 啟用 Intel 的整合顯示卡的 opregion。
    - `-debugcon file:/root/igd_debug.log`: 將調試輸出重定向到指定的日誌文件。
    - `-global isa-debugcon.iobase=0x402`: 設定 ISA debug console 的 IO 基址。
2. `hostpci0`:
    - `0000:00:02.0`: 是 PCI 設備的地址，表示要被傳遞到虛擬機的硬體裝置。在這裡，它是一個集成顯示卡。
    - `legacy-igd=1`: 表示使用傳統的 IGD 模式。
    - `romfile=gen12_igd.rom`: 使用特定的 ROM 文件來初始化該硬體設備。
3. `hostpci1`:
    - `0000:00:1f.3`: 另一個要通過到虛擬機的 PCI 設備的地址。
    - `romfile=gen12_gop.rom`: 使用特定的 ROM 文件來初始化這個硬體設備。

### 直通核顯而不需直通HDMI

有的情況我們並不需要虛擬機輸出HDMI，只是給核顯的性能讓虛擬機使用。最典型的是將GPU交給黑群暉/Plex/Jellyfin等做硬解：

若你是想把核显一起直通给黑群晖，需要把刚才引导文件的代码改为：

```
找到 GRUB_CMDLINE_LINUX_DEFAULT="quiet"改为 GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on pcie_acs_override=downstream video=efifb:off,vesafb:off"
```

在 `/etc/modules` 里面增加和上面一样的内容并更新，然后执行

```
echo "blacklist snd_hda_intel" >> /etc/modprobe.d/pve-blacklist.conf
echo "blacklist snd_hda_codec_hdmi" >> /etc/modprobe.d/pve-blacklist.conf
echo "blacklist i915" >> /etc/modprobe.d/pve-blacklist.conf
update-initramfs -u
```

## 附送：去除PVE登入後的訂閱提示

[Remove Proxmox Subscription Notice (Tested to 8.0)](https://johnscs.com/remove-proxmox51-subscription-notice/) 在PVE SHELL中運行：

```
sed -Ezi.bak "s/(Ext.Msg.show({\s+title: gettext('No valid sub)/void({ \/\/\1/g" /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js && systemctl restart pveproxy.service
```

次分享0
