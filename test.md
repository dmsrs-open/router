
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

2

This answer is not useful

Save this answer.

[](chrome-extension://hajanaajapkhaabfcofdjgjnlgkdkknm/posts/934146/timeline)

Show activity on this post.

I had the same issue with a e1000e on Ubuntu 18.04.1, 4.15.0-36 kernel and nothing helped. I've updated the driver directly from intel to 3.4.2.1-NAPI, without any improvements. All things listed in this and the [other](https://serverfault.com/questions/616485/e1000e-reset-adapter-unexpectedly-detected-hardware-unit-hang) thread did not help. Guessing from reading through [this Ubuntu bug report](https://bugs.launchpad.net/ubuntu/+source/linux/+bug/1766377) I have figured as a workaround to significantly reduce the ringbuffer size:

```
sudo ethtool -G eth0 rx 256 tx 256
```

This solves the problem completely for me and appears to not impact performance at all (Desktop use, only did basic benchmarks).
