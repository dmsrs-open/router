Proxmox VE安装内核的方法主要有2种，

- 自编译内核
- 使用预编译内核（deb包）

自编译内核就是自己下载linux内核源码，手动编译，再通过make install。此种方式可以安装任意版本的内核，注意我这说的是安装任意内核，并不代表能够正常使用。

预编译内核主要是官方或者第三方为Proxmox VE制作的deb包，只要通过dpkg -i或者apt install即可安装的内核。

本文主要讲预编译内核。

目前预编译内核主要分为2种

- 官方内核
- 第三方内核
  - openwrt优化内核: <https://github.com/fw867/pve-edge-kernel>
  - pve-edge-kernel,为PVE提前解锁新内核: <https://github.com/fabianishere/pve-edge-kernel>

## PVE内核的命名规则

内核kernel

```bash
pve-kernel-5.10.6-1-pve
```

`pve-kernel` +`内核版本` 常规的linux是linux-image+内核版本

头文件headers

```bash
pve-headers-5.10.6-1-pve
```

`pve-header` +`内核版本`

内核版本还要分，如5.10.6-1-pve

5是主内核版本号，10是次版本号，6是修订号，1是编译次数，pve是标志信息。

## 使用dpkg安装PVE kernel

PVE的官方内核建议去国内镜像下载

<http://mirrors.ustc.edu.cn/proxmox/debian/dists/bullseye/pve-no-subscription/binary-amd64/>

以最新的6.1内核为例

下载kernel文件，带amd64的才是kernel文件。

[![](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-130514@2x.png)](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-130514@2x.png)

如果你有使用dkms，则需要下载对应的headers，把kernel换成headers就是了。

[![](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-130644@2x.png)](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-130644@2x.png)

使用上述的第三方的内核，可以前往github主页，找到releases页面，下载对应的版本即可。

[![](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-132153@2x.png)](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-132153@2x.png)

下载好之后，直接进行

`dpkg -i *.deb` 即可

## 使用源安装PVE kernel

对于官方内核，请参考<https://foxi.buduanwang.vip/virtualization/298.html/配置PVE软件源>

对于上述说的第三方内核，请参考github的说明

[![](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-132509@2x.png)](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-132509@2x.png)

安装好源之后，请进行`apt update` 更新一下仓库索引。

使用下面的命令，可以查看可以安装的内核。

```bash
apt search pve-kernel|grep pve-kernel-
```

如下图所示，如果想安装哪个内核，就安装哪个内核。

[![](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-132815@2x.png)](https://foxi.buduanwang.vip/wp-content/uploads/2023/01/QQ20230103-132815@2x.png)

比如，你要装红框那个内核

执行命令

```bash
apt install pve-kernel-5.15.39-2-pve
```

即可安装内核

## 管理内核

### 调整启动内核

内核安装完毕，需要重启才能生效。PVE会把版本号最新的内核作为默认内核启动项，如果你安装的内核较旧，那么就需要调整启动内核，这里需要pve自带的工具`proxmox-boot-tool` 。

下面是工具的使用说明：

```bash
root@pve1:~/1# proxmox-boot-tool 
USAGE: /usr/sbin/proxmox-boot-tool <commands> [ARGS]

  /usr/sbin/proxmox-boot-tool format <partition> [--force]
  /usr/sbin/proxmox-boot-tool init <partition>
  /usr/sbin/proxmox-boot-tool reinit
  /usr/sbin/proxmox-boot-tool clean [--dry-run]
  /usr/sbin/proxmox-boot-tool refresh [--hook <name>]
  /usr/sbin/proxmox-boot-tool kernel <add|remove> <kernel-version>
  /usr/sbin/proxmox-boot-tool kernel pin <kernel-version> [--next-boot]
  /usr/sbin/proxmox-boot-tool kernel unpin [--next-boot]
  /usr/sbin/proxmox-boot-tool kernel list
  /usr/sbin/proxmox-boot-tool status [--quiet]
  /usr/sbin/proxmox-boot-tool help
```

我们先查看当前安装的内核，`proxmox-boot-tool kernel list`

```bash
root@pve1:~/1# proxmox-boot-tool kernel list
Manually selected kernels:       --->手动加入的内核，通常是自己编译的内核
None.

Automatically selected kernels:   --->自动读取到的内核
5.15.35-1-pve
5.15.74-1-pve
6.0.15-edge
6.1.0-1-pve

Pinned kernel:   --->当前设置默认启动的内核
5.15.35-1-pve
```

那我们将`6.0.15-edge`设置成第一启动项：

`proxmox-boot-tool kernel pin 6.0.15-edge`

如果只是想临时启动，可以添加一个参数--next-boot ，这样将在下一次启动的时候启动这个内核，但是之后还是默认的启动内核。

`proxmox-boot-tool kernel pin 6.0.15-edge --next-boot`

设置好了可以通过命令验证 `proxmox-boot-tool kernel list`

```bash
root@pve1:~/1# proxmox-boot-tool kernel list
Manually selected kernels:
None.

Automatically selected kernels:
5.15.35-1-pve
5.15.74-1-pve
6.0.15-edge
6.1.0-1-pve

Pinned kernel: 
6.0.15-edge  --->已修改
```

### 卸载内核

通过`dpkg -l |grep pve-kernel-`

```bash
root@pve1:~/1# dpkg -l |grep pve-kernel-
ii  pve-kernel-5.10.6-1-pve                        5.10.6-1                       amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-5.11.22-7-pve                       5.11.22-12                     amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-5.13                                7.1-9                          all          Latest Proxmox VE Kernel Image
rc  pve-kernel-5.13.19-4-pve                       5.13.19-9                      amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-5.13.19-6-pve                       5.13.19-15                     amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-5.15                                7.2-14                         all          Latest Proxmox VE Kernel Image
rc  pve-kernel-5.15.12-1-pve                       5.15.12-2                      amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-5.15.19-2-pve                       5.15.19-3                      amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-5.15.35-1-pve                       5.15.35-3                      amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-5.15.39-2-pve                       5.15.39-2                      amd64        Proxmox Kernel Image
ii  pve-kernel-5.15.53-1-pve                       5.15.53-1                      amd64        Proxmox Kernel Image
ii  pve-kernel-5.15.64-1-pve                       5.15.64-1                      amd64        Proxmox Kernel Image
ii  pve-kernel-5.15.74-1-pve                       5.15.74-1                      amd64        Proxmox Kernel Image
rc  pve-kernel-5.4                                 6.4-13                         all          Latest Proxmox VE Kernel Image
rc  pve-kernel-5.4.106-1-pve                       5.4.106-1                      amd64        The Proxmox PVE Kernel Image
rc  pve-kernel-5.4.166-1-pve                       5.4.166-1                      amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-6.0.15-edge                         6.0.15-1                       amd64        The Proxmox PVE Kernel Image
ii  pve-kernel-6.1                                 7.3-1                          all          Latest Proxmox VE Kernel Image
ii  pve-kernel-6.1.0-1-pve                         6.1.0-1                        amd64        Proxmox Kernel Image
ii  pve-kernel-helper                              7.2-14                         all          Function for various kernel maintenance tasks.
ii  pve-kernel-libc-dev                            5.19.17-1                      amd64        Linux support headers for userspa
```

找到对应的内核版本，执行`dpkg --remove pve-kernel-5.15.35-1-pve` 即可卸载，这样只是卸载，如果要卸载并清理则需要使用--purge参数

`dpkg --purge pve-kernel-5.15.35-1-pve`这样就可以把内核从PVE中卸载干净。

对于某些内核来说，还有一些依赖包，如卸载`pve-kernel-6.1.0-1-pve`时就会报错，是因为这个`pve-kernel-6.1`依赖这个内核，要装一起装，要卸载一起卸载，相依为命。

```bash
root@pve1:~/1# dpkg --remove  pve-kernel-6.1.0-1-pve
dpkg: dependency problems prevent removal of pve-kernel-6.1.0-1-pve:
 pve-kernel-6.1 depends on pve-kernel-6.1.0-1-pve.

dpkg: error processing package pve-kernel-6.1.0-1-pve (--remove):
 dependency problems - not removing
Errors were encountered while processing:
 pve-kernel-6.1.0-1-pve
```

所以遇到这种情况，一起卸载就没事了。

`dpkg --remove pve-kernel-6.1.0-1-pve pve-kernel-6.1`

为什么会出现这种问题？

因为PVE有些包是最新内核的引用，安装这个包就可以安装对应版本的最新内核，我们可以通过下面命令查看

`apt search pve-kernel|grep -B 1 "Latest Proxmox VE Kernel Imag"`

```bash
root@pve1:~/1# apt search  pve-kernel|grep -B 1 "Latest Proxmox VE Kernel Imag"

WARNING: apt does not have a stable CLI interface. Use with caution in scripts.

pve-kernel-5.11/stable 7.0-10 all
  Latest Proxmox VE Kernel Image
--
pve-kernel-5.13/stable,now 7.1-9 all [installed,auto-removable]
  Latest Proxmox VE Kernel Image
--
pve-kernel-5.15/stable 7.3-1 all [upgradable from: 7.2-14]
  Latest Proxmox VE Kernel Image
--
pve-kernel-5.19/stable 7.2-14 all
  Latest Proxmox VE Kernel Image
--
pve-kernel-6.1/stable,now 7.3-1 all [residual-config]
  Latest Proxmox VE Kernel Image
```

所以，如果你想直接安装某个此版本内核的最新内核，直接指定主次版本就可以。`apt install pve-kernel-5.19`
