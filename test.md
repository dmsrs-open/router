
```bash
apt-get install ethtool net-tools pacman gcc make autoconf automake gdb tree pve-headers-$(uname -r) pve-kernel-$(uname -r) linux-libc-dev-amd64-cross pve-kernel-libc-dev
```

修改文件 ```/etc/network/interface```

```bash
auto enp1s0
iface enp1s0 inet manual
 post-up /usr/sbin/ethtool -K enp1s0 gso off tso off sg off gro off
 post-up /usr/sbin/ethtool -G enp1s0 rx 1024 tx 1024

```

添加启动参数

```bash
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on pcie_aspm=off"
```
