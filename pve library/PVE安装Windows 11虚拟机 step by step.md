win 11已经发布有两周多了，因为引进了tpm机制，只支持较新的设备安装，对于虚拟机的支持不高。

目前各个虚拟化平台针对win 11已经有对应的方案，今天来介绍一下PVE 7.0安装win 11虚拟机。

提前下载win11和virtio win 11的镜像。

win 11镜像下载这里就不说了，很多途径。

virtio的镜像在这里下载<https://github.com/virtio-win/virtio-win-pkg-scripts，下载最新的virtio> win iso。

新建和配置虚拟机

点击新建虚拟机

[![](https://z3.ax1x.com/2021/10/24/5fNaUf.png)](https://z3.ax1x.com/2021/10/24/5fNaUf.png)

给虚拟机起名，然后下一步。

[![](https://z3.ax1x.com/2021/10/24/5fNtbt.png)](https://z3.ax1x.com/2021/10/24/5fNtbt.png)

选择加载win 11镜像文件，系统类型选择windows。

[![](https://z3.ax1x.com/2021/10/24/5fNd58.png)](https://z3.ax1x.com/2021/10/24/5fNd58.png)

系统配置这里：

bios选择OVMF(UEFI)；机器选择q35；勾选TPM，并选择TPM版本为v2.0；然后存储的位置选择同一个存储。

[![](https://z3.ax1x.com/2021/10/24/5fN0PS.png)](https://z3.ax1x.com/2021/10/24/5fN0PS.png)

硬盘设备选择VirtIO，磁盘大小选择64G，32G其实也可以，但是微软要求最低64G。

[![](https://z3.ax1x.com/2021/10/24/5fNUVP.png)](https://z3.ax1x.com/2021/10/24/5fNUVP.png)

设置CPU和内存，微软要求最低2核8G，这里我们给4核8G，因为是单节点，所以CPU类型勾选host。

[![](https://z3.ax1x.com/2021/10/24/5fND2Q.png)](https://z3.ax1x.com/2021/10/24/5fND2Q.png)

[![](https://z3.ax1x.com/2021/10/24/5fNB8g.png)](https://z3.ax1x.com/2021/10/24/5fNB8g.png)

配置网卡信息后继续。

[![](https://z3.ax1x.com/2021/10/24/5fNyKs.png)](https://z3.ax1x.com/2021/10/24/5fNyKs.png)

这里不要勾选自动创建后启动，确认配置信息后点击完成。

[![](https://z3.ax1x.com/2021/10/24/5fNrvj.png)](https://z3.ax1x.com/2021/10/24/5fNrvj.png)

到新建的虚拟机这里，新建光驱。

[![](https://z3.ax1x.com/2021/10/24/5fN6rn.png)](https://z3.ax1x.com/2021/10/24/5fN6rn.png)

选择下载的驱动镜像，点击创建。

[![](https://z3.ax1x.com/2021/10/24/5fNcbq.png)](https://z3.ax1x.com/2021/10/24/5fNcbq.png)

完成后点击启动。

启动后进入windows安装界面，这里照一般操作进行。

[![](https://z3.ax1x.com/2021/10/24/5fN2V0.png)](https://z3.ax1x.com/2021/10/24/5fN2V0.png)

到安装类型这里选择 自定义安装。

[![](https://z3.ax1x.com/2021/10/24/5fNW5T.png)](https://z3.ax1x.com/2021/10/24/5fNW5T.png)

到选择安装位置这里会无法显示硬盘信息，因为缺少驱动，点击加载驱动程序。

[![](https://z3.ax1x.com/2021/10/24/5fNRaV.png)](https://z3.ax1x.com/2021/10/24/5fNRaV.png)

然后点击浏览。

[![](https://z3.ax1x.com/2021/10/24/5fNhPU.png)](https://z3.ax1x.com/2021/10/24/5fNhPU.png)

选择驱动镜像下的amd64下的w10文件夹，点击确定。

[![](https://z3.ax1x.com/2021/10/24/5fN4GF.png)](https://z3.ax1x.com/2021/10/24/5fN4GF.png)

加载驱动后磁盘控制器能够显示，点击下一页。

[![](https://z3.ax1x.com/2021/10/24/5fN524.png)](https://z3.ax1x.com/2021/10/24/5fN524.png)

选中显示的磁盘后点击下一步进行安装。

[![](https://z3.ax1x.com/2021/10/24/5fNIxJ.png)](https://z3.ax1x.com/2021/10/24/5fNIxJ.png)

文件复制完后会重启几次。

[![](https://z3.ax1x.com/2021/10/24/5fNTM9.png)](https://z3.ax1x.com/2021/10/24/5fNTM9.png)

安装完成后会启动第一次配置界面。

[![](https://z3.ax1x.com/2021/10/24/5fN7rR.png)](https://z3.ax1x.com/2021/10/24/5fN7rR.png)

输入账户信息后进行系统配置。

[![](https://z3.ax1x.com/2021/10/24/5fNHq1.png)](https://z3.ax1x.com/2021/10/24/5fNHq1.png)

配置完成后进入桌面。

[![](https://z3.ax1x.com/2021/10/24/5fNLa6.png)](https://z3.ax1x.com/2021/10/24/5fNLa6.png)

在设备管理器中有一些设备未能正确识别。

[![](https://z3.ax1x.com/2021/10/24/5fNOIK.png)](https://z3.ax1x.com/2021/10/24/5fNOIK.png)

进入驱动镜像，运行virtio-win-ge-x64安装文件安装驱动。

[![](https://z3.ax1x.com/2021/10/24/5fNqVx.png)](https://z3.ax1x.com/2021/10/24/5fNqVx.png)

安装完成后，所有设备都能正确识别。

[![](https://z3.ax1x.com/2021/10/24/5fNjPO.png)](https://z3.ax1x.com/2021/10/24/5fNjPO.png)

至此win11虚拟机安装完成。
