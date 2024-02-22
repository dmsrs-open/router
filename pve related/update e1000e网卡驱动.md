4

This answer is not useful

Save this answer.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/posts/925384/timeline)

Show activity on this post.

As a gravedigger, I'd like to dig up this old ass thread to share my solution for Ubuntu. Download the latest Intel network driver ([3.4.0.2](https://downloadcenter.intel.com/download/15817/Intel-Network-Adapter-Driver-for-PCIe-Intel-Gigabit-Ethernet-Network-Connections-Under-Linux-?product=60019) at time of writing). Decompress it, append a thing to a line in the Makefile, get the patch, apply the patch, install, readd the module, and finally, reboot. Good luck.

```bash
wget https://downloadcenter.intel.com/download/15817/Intel-Network-Adapter-Driver-for-PCIe-Intel-Gigabit-Ethernet-Network-Connections-Under-Linux-?product=60019
tar -zxvf e1000e-3.4.0.2.tar.gz
vi e1000e-3.4.0.2/src/Makefile
    ## Locate line 152: EXTRA_CFLAGS += $(CFLAGS_EXTRA)
    ## Append -fno-pie
## Download the patch from https://sourceforge.net/p/e1000/bugs/_discuss/thread/9048ab8e 
## wget/curl won't work here. THANKS SOURCE FORGE.
patch -p0 < e1000e-3.4.0.2-timer-updates.patch
cd e1000e-3.4.0.2/src/
sudo make install
sudo rmmod e1000e && sudo modprobe e1000e
sudo reboot
```

This wad completed on Ubuntu 18.04, kernel 4.15.
