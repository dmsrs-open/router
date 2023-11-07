# pve troubleshooting

```log
Nov 07 22:39:52 pve kernel: ------------[ cut here ]------------
Nov 07 22:39:52 pve kernel: WARNING: CPU: 3 PID: 8577 at arch/x86/kvm/mmu/mmu.c:6949 kvm_nx_huge_page_recovery_worker+0x3c4/0x410 [kvm]
Nov 07 22:39:52 pve kernel: Modules linked in: veth tcp_diag inet_diag ebtable_filter ebtables ip_set ip6table_raw iptable_raw ip6table_filter ip6_tables iptable_filter bpfilter nf_tables bonding tls softdog sunrpc nfnetlink_log nfnetlink binfmt_misc intel_rapl_msr intel_rapl_common intel_tcc_cooling x86_pkg_temp_thermal intel_powerclamp coretemp kvm_intel mei_pxp mei_hdcp i915 drm_buddy kvm ttm crct10dif_pclmul polyval_clmulni drm_display_helper polyval_generic ghash_clmulni_intel sha512_ssse3 aesni_intel cec crypto_simd rc_core cryptd mei_me drm_kms_helper ee1004 rapl i2c_algo_bit syscopyarea intel_cstate pcspkr serio_raw sysfillrect sysimgblt intel_xhci_usb_role_switch mei acpi_pad mac_hid zfs(PO) zunicode(PO) zzstd(O) zlua(O) zavl(PO) icp(PO) zcommon(PO) znvpair(PO) spl(O) vhost_net vhost vhost_iotlb tap vfio_pci vfio_pci_core irqbypass vfio_iommu_type1 vfio iommufd drm efi_pstore dmi_sysfs ip_tables x_tables autofs4 btrfs blake2b_generic xor raid6_pq simplefb dm_thin_pool dm_persistent_data
Nov 07 22:39:52 pve kernel:  dm_bio_prison dm_bufio libcrc32c crc32_pclmul psmouse i2c_i801 xhci_pci xhci_pci_renesas i2c_smbus ahci e1000e xhci_hcd libahci video wmi
Nov 07 22:39:52 pve kernel: CPU: 3 PID: 8577 Comm: kvm-nx-lpage-re Tainted: P           O       6.2.16-3-pve #1
Nov 07 22:39:52 pve kernel: Hardware name:  YL-SKUL6/YL-SKUL6, BIOS 5.12 05/28/2018
Nov 07 22:39:52 pve kernel: RIP: 0010:kvm_nx_huge_page_recovery_worker+0x3c4/0x410 [kvm]
Nov 07 22:39:52 pve kernel: Code: ff 48 8b 45 c0 4c 39 e0 0f 85 e6 fd ff ff 48 89 df e8 e0 e7 f9 ff e9 ed fd ff ff 49 bc ff ff ff ff ff ff ff 7f e9 c6 fc ff ff <0f> 0b e9 01 ff ff ff 48 8b 45 d0 65 48 2b 04 25 28 00 00 00 75 27
Nov 07 22:39:52 pve kernel: RSP: 0018:ffffb0738458be40 EFLAGS: 00010246
Nov 07 22:39:52 pve kernel: RAX: 0000000000000000 RBX: ffffb0738457d000 RCX: 0000000000000000
Nov 07 22:39:52 pve kernel: RDX: 0000000000000000 RSI: 0000000000000000 RDI: 0000000000000000
Nov 07 22:39:52 pve kernel: RBP: ffffb0738458bec0 R08: 0000000000000000 R09: 0000000000000000
Nov 07 22:39:52 pve kernel: R10: ffff9b758ac19228 R11: 0000000000000000 R12: ffffb0738458be80
Nov 07 22:39:52 pve kernel: R13: 0000000000000001 R14: 0000000000000006 R15: ffff9b758ac192b8
Nov 07 22:39:52 pve kernel: FS:  0000000000000000(0000) GS:ffff9b7cced80000(0000) knlGS:0000000000000000
Nov 07 22:39:52 pve kernel: CS:  0010 DS: 0000 ES: 0000 CR0: 0000000080050033
Nov 07 22:39:52 pve kernel: CR2: 00007ff88b482000 CR3: 0000000381c10004 CR4: 00000000003726e0
Nov 07 22:39:52 pve kernel: Call Trace:
Nov 07 22:39:52 pve kernel:  <TASK>
Nov 07 22:39:52 pve kernel:  ? __pfx_kvm_nx_huge_page_recovery_worker+0x10/0x10 [kvm]
Nov 07 22:39:52 pve kernel:  kvm_vm_worker_thread+0x9d/0x1b0 [kvm]
Nov 07 22:39:52 pve kernel:  ? __pfx_kvm_vm_worker_thread+0x10/0x10 [kvm]
Nov 07 22:39:52 pve kernel:  kthread+0xe6/0x110
Nov 07 22:39:52 pve kernel:  ? __pfx_kthread+0x10/0x10
Nov 07 22:39:52 pve kernel:  ret_from_fork+0x29/0x50
Nov 07 22:39:52 pve kernel:  </TASK>
Nov 07 22:39:52 pve kernel: ---[ end trace 0000000000000000 ]---
-- Reboot --
```

```log
ov 07 22:41:57 pve pve-ha-lrm[989]: starting server
Nov 07 22:41:57 pve pve-ha-lrm[989]: status change startup => wait_for_agent_lock
Nov 07 22:41:57 pve systemd[1]: Started pve-ha-lrm.service - PVE Local HA Resource Manager Daemon.
Nov 07 22:41:58 pve systemd[1]: Starting pve-guests.service - PVE guests...
Nov 07 22:41:59 pve pve-guests[991]: <root@pam> starting task UPID:pve:000003E0:000005E8:654A4CB7:startall::root@pam:
Nov 07 22:41:59 pve pve-guests[991]: <root@pam> end task UPID:pve:000003E0:000005E8:654A4CB7:startall::root@pam: OK
Nov 07 22:41:59 pve systemd[1]: Finished pve-guests.service - PVE guests.
Nov 07 22:41:59 pve systemd[1]: Starting pvescheduler.service - Proxmox VE scheduler...
Nov 07 22:41:59 pve pvescheduler[994]: starting server
Nov 07 22:41:59 pve systemd[1]: Started pvescheduler.service - Proxmox VE scheduler.
Nov 07 22:41:59 pve systemd[1]: Reached target multi-user.target - Multi-User System.
Nov 07 22:41:59 pve systemd[1]: Reached target graphical.target - Graphical Interface.
Nov 07 22:41:59 pve systemd[1]: Starting systemd-update-utmp-runlevel.service - Record Runlevel Change in UTMP...
Nov 07 22:41:59 pve systemd[1]: systemd-update-utmp-runlevel.service: Deactivated successfully.
Nov 07 22:41:59 pve systemd[1]: Finished systemd-update-utmp-runlevel.service - Record Runlevel Change in UTMP.
Nov 07 22:41:59 pve systemd[1]: Startup finished in 2.843s (firmware) + 6.596s (loader) + 4.713s (kernel) + 11.266s (userspace) = 25.420s.
Nov 07 22:42:05 pve kernel: L1TF CPU bug present and SMT on, data leak possible. See CVE-2018-3646 and https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/l1tf.html for details.
Nov 07 22:42:19 pve systemd[1]: systemd-fsckd.service: Deactivated successfully.
```

```log
Nov 07 12:17:01 pve CRON[71345]: pam_unix(cron:session): session closed for user root
Nov 07 13:17:01 pve CRON[79349]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Nov 07 13:17:01 pve CRON[79350]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Nov 07 13:17:01 pve CRON[79349]: pam_unix(cron:session): session closed for user root
Nov 07 14:17:01 pve CRON[87349]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Nov 07 14:17:01 pve CRON[87350]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Nov 07 14:17:01 pve CRON[87349]: pam_unix(cron:session): session closed for user root
Nov 07 15:17:01 pve CRON[95355]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Nov 07 15:17:01 pve CRON[95356]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Nov 07 15:17:01 pve CRON[95355]: pam_unix(cron:session): session closed for user root
Nov 07 16:17:01 pve CRON[103356]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Nov 07 16:17:01 pve CRON[103357]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Nov 07 16:17:01 pve CRON[103356]: pam_unix(cron:session): session closed for user root
Nov 07 17:17:01 pve CRON[111344]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Nov 07 17:17:01 pve CRON[111345]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Nov 07 17:17:01 pve CRON[111344]: pam_unix(cron:session): session closed for user root
Nov 07 18:17:01 pve CRON[119344]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Nov 07 18:17:01 pve CRON[119345]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Nov 07 18:17:01 pve CRON[119344]: pam_unix(cron:session): session closed for user root
Nov 07 18:28:42 pve kernel: perf: interrupt took too long (2502 > 2500), lowering kernel.perf_event_max_sample_rate to 79750
Nov 07 19:17:01 pve CRON[127347]: pam_unix(cron:session): session opened for user root(uid=0) by (uid=0)
Nov 07 19:17:01 pve CRON[127348]: (root) CMD (cd / && run-parts --report /etc/cron.hourly)
Nov 07 19:17:01 pve CRON[127347]: pam_unix(cron:session): session closed for user root
Nov 07 19:19:23 pve kernel: e1000e 0000:01:00.0 enp1s0: NIC Link is Down
Nov 07 19:19:23 pve kernel: vmbr0: port 1(enp1s0) entered disabled state
Nov 07 19:19:25 pve kernel: e1000e 0000:01:00.0 enp1s0: NIC Link is Up 1000 Mbps Full Duplex, Flow Control: Rx/Tx
Nov 07 19:19:25 pve kernel: vmbr0: port 1(enp1s0) entered blocking state
Nov 07 19:19:25 pve kernel: vmbr0: port 1(enp1s0) entered forwarding state
Nov 07 19:19:30 pve kernel: e1000e 0000:01:00.0 enp1s0: NIC Link is Down
Nov 07 19:19:30 pve kernel: vmbr0: port 1(enp1s0) entered disabled state
Nov 07 19:19:33 pve kernel: e1000e 0000:01:00.0 enp1s0: NIC Link is Up 1000 Mbps Full Duplex, Flow Control: Rx/Tx
Nov 07 19:19:33 pve kernel: vmbr0: port 1(enp1s0) entered blocking state
Nov 07 19:19:33 pve kernel: vmbr0: port 1(enp1s0) entered forwarding state
Nov 07 19:19:39 pve kernel: e1000e 0000:01:00.0 enp1s0: NIC Link is Down
Nov 07 19:19:39 pve kernel: vmbr0: port 1(enp1s0) entered disabled state
Nov 07 19:19:42 pve kernel: e1000e 0000:01:00.0 enp1s0: NIC Link is Up 1000 Mbps Full Duplex, Flow Control: Rx/Tx
Nov 07 19:19:42 pve kernel: vmbr0: port 1(enp1s0) entered blocking state
Nov 07 19:19:42 pve kernel: vmbr0: port 1(enp1s0) entered forwarding state
-- Reboot --
Nov 07 19:22:18 pve kernel: Linux version 6.2.16-3-pve (tom@sbuild) (gcc (Debian 12.2.0-14) 12.2.0, GNU ld (GNU Binutils for Debian) 2.40) #1 SMP PREEMPT_DYNAMIC PVE 6.2.16-3 (2023-06-17T05:58Z) ()
Nov 07 19:22:18 pve kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-6.2.16-3-pve root=/dev/mapper/pve-root ro quiet intel_iommu=on/
Nov 07 19:22:18 pve kernel: KERNEL supported cpus:
Nov 07 19:22:18 pve kernel:   Intel GenuineIntel
Nov 07 19:22:18 pve kernel:   AMD AuthenticAMD
Nov 07 19:22:18 pve kernel:   Hygon HygonGenuine
Nov 07 19:22:18 pve kernel:   Centaur CentaurHauls
Nov 07 19:22:18 pve kernel:   zhaoxin   Shanghai  
Nov 07 19:22:18 pve kernel: x86/fpu: Supporting XSAVE feature 0x001: 'x87 floating point registers'
Nov 07 19:22:18 pve kernel: x86/fpu: Supporting XSAVE feature 0x002: 'SSE registers'
Nov 07 19:22:18 pve kernel: x86/fpu: Supporting XSAVE feature 0x004: 'AVX registers'
Nov 07 19:22:18 pve kernel: x86/fpu: Supporting XSAVE feature 0x008: 'MPX bounds registers'
Nov 07 19:22:18 pve kernel: x86/fpu: Supporting XSAVE feature 0x010: 'MPX CSR'
Nov 07 19:22:18 pve kernel: x86/fpu: xstate_offset[2]:  576, xstate_sizes[2]:  256
Nov 07 19:22:18 pve kernel: x86/fpu: xstate_offset[3]:  832, xstate_sizes[3]:   64
Nov 07 19:22:18 pve kernel: x86/fpu: xstate_offset[4]:  896, xstate_sizes[4]:   64
Nov 07 19:22:18 pve kernel: x86/fpu: Enabled xstate features 0x1f, context size is 960 bytes, using 'compacted' format.
Nov 07 19:22:18 pve kernel: signal: max sigframe size: 2032
Nov 07 19:22:18 pve kernel: BIOS-provided physical RAM map:
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000000000000-0x0000000000057fff] usable
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000000058000-0x0000000000058fff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000000059000-0x000000000009dfff] usable
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000000009e000-0x00000000000fffff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000000100000-0x0000000084b08fff] usable
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000084b09000-0x0000000084b09fff] ACPI NVS
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000084b0a000-0x0000000084b0afff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000084b0b000-0x000000008bd2efff] usable
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000008bd2f000-0x000000008c7ddfff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000008c7de000-0x000000008cc46fff] usable
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000008cc47000-0x000000008cfe5fff] ACPI NVS
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000008cfe6000-0x000000008d3a6fff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000008d3a7000-0x000000008d3fdfff] type 20
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000008d3fe000-0x000000008d3fefff] usable
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x000000008d3ff000-0x000000008fffffff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x00000000e0000000-0x00000000efffffff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x00000000fe000000-0x00000000fe010fff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x00000000fec00000-0x00000000fec00fff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x00000000fed00000-0x00000000fed00fff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x00000000fee00000-0x00000000fee00fff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x00000000ff000000-0x00000000ffffffff] reserved
Nov 07 19:22:18 pve kernel: BIOS-e820: [mem 0x0000000100000000-0x000000086effffff] usable
Nov 07 19:22:18 pve kernel: NX (Execute Disable) protection: active
Nov 07 19:22:18 pve kernel: efi: EFI v2.50 by American Megatrends
Nov 07 19:22:18 pve kernel: efi: ACPI 2.0=0x8cc47000 ACPI=0x8cc47000 SMBIOS=0x8d31a000 SMBIOS 3.0=0x8d319000 ESRT=0x8adf7918 
Nov 07 19:22:18 pve kernel: efi: Remove mem35: MMIO range=[0xe0000000-0xefffffff] (256MB) from e820 map
Nov 07 19:22:18 pve kernel: e820: remove [mem 0xe0000000-0xefffffff] reserved
Nov 07 19:22:18 pve kernel: efi: Not removing mem36: MMIO range=[0xfe000000-0xfe010fff] (68KB) from e820 map
Nov 07 19:22:18 pve kernel: efi: Not removing mem37: MMIO range=[0xfec00000-0xfec00fff] (4KB) from e820 map
Nov 07 19:22:18 pve kernel: efi: Not removing mem38: MMIO range=[0xfed00000-0xfed00fff] (4KB) from e820 map
Nov 07 19:22:18 pve kernel: efi: Not removing mem39: MMIO range=[0xfee00000-0xfee00fff] (4KB) from e820 map
Nov 07 19:22:18 pve kernel: efi: Remove mem40: MMIO range=[0xff000000-0xffffffff] (16MB) from e820 map
Nov 07 19:22:18 pve kernel: e820: remove [mem 0xff000000-0xffffffff] reserved
Nov 07 19:22:18 pve kernel: secureboot: Secure boot disabled
Nov 07 19:22:18 pve kernel: SMBIOS 3.0.0 present.
Nov 07 19:22:18 pve kernel: DMI:  YL-SKUL6/YL-SKUL6, BIOS 5.12 05/28/2018
Nov 07 19:22:18 pve kernel: tsc: Detected 2700.000 MHz processor
Nov 07 19:22:18 pve kernel: tsc: Detected 2699.909 MHz TSC
Nov 07 19:22:18 pve kernel: e820: update [mem 0x00000000-0x00000fff] usable ==> reserved
Nov 07 19:22:18 pve kernel: e820: remove [mem 0x000a0000-0x000fffff] usable
Nov 07 19:22:18 pve kernel: last_pfn = 0x86f000 max_arch_pfn = 0x400000000
Nov 07 19:22:18 pve kernel: x86/PAT: Configuration [0-7]: WB  WC  UC- UC  WB  WP  UC- WT  
Nov 07 19:22:18 pve kernel: last_pfn = 0x8d3ff max_arch_pfn = 0x400000000
Nov 07 19:22:18 pve kernel: esrt: Reserving ESRT space from 0x000000008adf7918 to 0x000000008adf7950.
Nov 07 19:22:18 pve kernel: e820: update [mem 0x8adf7000-0x8adf7fff] usable ==> reserved
Nov 07 19:22:18 pve kernel: Using GB pages for direct mapping
Nov 07 19:22:18 pve kernel: secureboot: Secure boot disabled
Nov 07 19:22:18 pve kernel: RAMDISK: [mem 0x309e9000-0x344ebfff]
Nov 07 19:22:18 pve kernel: ACPI: Early table checksum verification disabled
Nov 07 19:22:18 pve kernel: ACPI: RSDP 0x000000008CC47000 000024 (v02 ALASKA)
Nov 07 19:22:18 pve kernel: ACPI: XSDT 0x000000008CC470A8 0000D4 (v01 ALASKA A M I    01072009 AMI  00010013)
Nov 07 19:22:18 pve kernel: ACPI: FACP 0x000000008CC6D000 000114 (v06 ALASKA A M I    01072009 AMI  00010013)
Nov 07 19:22:18 pve kernel: ACPI: DSDT 0x000000008CC47218 025DE3 (v02 ALASKA A M I    01072009 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: FACS 0x000000008CFE5C40 000040
Nov 07 19:22:18 pve kernel: ACPI: APIC 0x000000008CC6D118 000084 (v03 ALASKA A M I    01072009 AMI  00010013)
Nov 07 19:22:18 pve kernel: ACPI: FPDT 0x000000008CC6D1A0 000044 (v01 ALASKA A M I    01072009 AMI  00010013)
Nov 07 19:22:18 pve kernel: ACPI: MCFG 0x000000008CC6D1E8 00003C (v01 ALASKA A M I    01072009 MSFT 00000097)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC6D228 000372 (v01 SataRe SataTabl 00001000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: FIDT 0x000000008CC6D5A0 00009C (v01 ALASKA A M I    01072009 AMI  00010013)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC6D640 003159 (v02 SaSsdt SaSsdt   00003000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: HPET 0x000000008CC707A0 000038 (v01 INTEL  KBL-ULT  00000001 MSFT 0000005F)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC707D8 000DE5 (v02 INTEL  Ther_Rvp 00001000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC715C0 000024 (v02 INTEL  xh_OEMBD 00000000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: UEFI 0x000000008CC715E8 000042 (v01 INTEL  EDK2     00000002      01000013)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC71630 000EDE (v02 CpuRef CpuSsdt  00003000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: LPIT 0x000000008CC72510 000094 (v01 INTEL  KBL-ULT  00000000 MSFT 0000005F)
Nov 07 19:22:18 pve kernel: ACPI: WSMT 0x000000008CC725A8 000028 (v01 INTEL  KBL-ULT  00000000 MSFT 0000005F)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC725D0 000141 (v02 INTEL  HdaDsp   00000000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC72718 00029F (v02 INTEL  sensrhub 00000000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC729B8 003002 (v02 INTEL  PtidDevc 00001000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0x000000008CC759C0 000215 (v02 INTEL  TbtTypeC 00000000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: DBGP 0x000000008CC75BD8 000034 (v01 INTEL           00000002 MSFT 0000005F)
Nov 07 19:22:18 pve kernel: ACPI: DBG2 0x000000008CC75C10 000054 (v00 INTEL           00000002 MSFT 0000005F)
Nov 07 19:22:18 pve kernel: ACPI: DMAR 0x000000008CC75C68 0000A8 (v01 INTEL  KBL      00000001 INTL 00000001)
Nov 07 19:22:18 pve kernel: ACPI: ASF! 0x000000008CC75D10 0000A0 (v32 INTEL   HCG     00000001 TFSM 000F4240)
Nov 07 19:22:18 pve kernel: ACPI: Reserving FACP table memory at [mem 0x8cc6d000-0x8cc6d113]
Nov 07 19:22:18 pve kernel: ACPI: Reserving DSDT table memory at [mem 0x8cc47218-0x8cc6cffa]
Nov 07 19:22:18 pve kernel: ACPI: Reserving FACS table memory at [mem 0x8cfe5c40-0x8cfe5c7f]
Nov 07 19:22:18 pve kernel: ACPI: Reserving APIC table memory at [mem 0x8cc6d118-0x8cc6d19b]
Nov 07 19:22:18 pve kernel: ACPI: Reserving FPDT table memory at [mem 0x8cc6d1a0-0x8cc6d1e3]
Nov 07 19:22:18 pve kernel: ACPI: Reserving MCFG table memory at [mem 0x8cc6d1e8-0x8cc6d223]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc6d228-0x8cc6d599]
Nov 07 19:22:18 pve kernel: ACPI: Reserving FIDT table memory at [mem 0x8cc6d5a0-0x8cc6d63b]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc6d640-0x8cc70798]
Nov 07 19:22:18 pve kernel: ACPI: Reserving HPET table memory at [mem 0x8cc707a0-0x8cc707d7]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc707d8-0x8cc715bc]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc715c0-0x8cc715e3]
Nov 07 19:22:18 pve kernel: ACPI: Reserving UEFI table memory at [mem 0x8cc715e8-0x8cc71629]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc71630-0x8cc7250d]
Nov 07 19:22:18 pve kernel: ACPI: Reserving LPIT table memory at [mem 0x8cc72510-0x8cc725a3]
Nov 07 19:22:18 pve kernel: ACPI: Reserving WSMT table memory at [mem 0x8cc725a8-0x8cc725cf]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc725d0-0x8cc72710]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc72718-0x8cc729b6]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc729b8-0x8cc759b9]
Nov 07 19:22:18 pve kernel: ACPI: Reserving SSDT table memory at [mem 0x8cc759c0-0x8cc75bd4]
Nov 07 19:22:18 pve kernel: ACPI: Reserving DBGP table memory at [mem 0x8cc75bd8-0x8cc75c0b]
Nov 07 19:22:18 pve kernel: ACPI: Reserving DBG2 table memory at [mem 0x8cc75c10-0x8cc75c63]
Nov 07 19:22:18 pve kernel: ACPI: Reserving DMAR table memory at [mem 0x8cc75c68-0x8cc75d0f]
Nov 07 19:22:18 pve kernel: ACPI: Reserving ASF! table memory at [mem 0x8cc75d10-0x8cc75daf]
Nov 07 19:22:18 pve kernel: No NUMA configuration found
Nov 07 19:22:18 pve kernel: Faking a node at [mem 0x0000000000000000-0x000000086effffff]
Nov 07 19:22:18 pve kernel: NODE_DATA(0) allocated [mem 0x86efd5000-0x86effffff]
Nov 07 19:22:18 pve kernel: Zone ranges:
Nov 07 19:22:18 pve kernel:   DMA      [mem 0x0000000000001000-0x0000000000ffffff]
Nov 07 19:22:18 pve kernel:   DMA32    [mem 0x0000000001000000-0x00000000ffffffff]
Nov 07 19:22:18 pve kernel:   Normal   [mem 0x0000000100000000-0x000000086effffff]
Nov 07 19:22:18 pve kernel:   Device   empty
Nov 07 19:22:18 pve kernel: Movable zone start for each node
Nov 07 19:22:18 pve kernel: Early memory node ranges
Nov 07 19:22:18 pve kernel:   node   0: [mem 0x0000000000001000-0x0000000000057fff]
Nov 07 19:22:18 pve kernel:   node   0: [mem 0x0000000000059000-0x000000000009dfff]
Nov 07 19:22:18 pve kernel:   node   0: [mem 0x0000000000100000-0x0000000084b08fff]
Nov 07 19:22:18 pve kernel:   node   0: [mem 0x0000000084b0b000-0x000000008bd2efff]
Nov 07 19:22:18 pve kernel:   node   0: [mem 0x000000008c7de000-0x000000008cc46fff]
Nov 07 19:22:18 pve kernel:   node   0: [mem 0x000000008d3fe000-0x000000008d3fefff]
Nov 07 19:22:18 pve kernel:   node   0: [mem 0x0000000100000000-0x000000086effffff]
Nov 07 19:22:18 pve kernel: Initmem setup node 0 [mem 0x0000000000001000-0x000000086effffff]
Nov 07 19:22:18 pve kernel: On node 0, zone DMA: 1 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: On node 0, zone DMA: 1 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: On node 0, zone DMA: 98 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: On node 0, zone DMA32: 2 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: On node 0, zone DMA32: 2735 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: On node 0, zone DMA32: 1975 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: On node 0, zone Normal: 11265 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: On node 0, zone Normal: 4096 pages in unavailable ranges
Nov 07 19:22:18 pve kernel: Reserving Intel graphics memory at [mem 0x8e000000-0x8fffffff]
Nov 07 19:22:18 pve kernel: ACPI: PM-Timer IO Port: 0x1808
Nov 07 19:22:18 pve kernel: ACPI: LAPIC_NMI (acpi_id[0x01] high edge lint[0x1])
Nov 07 19:22:18 pve kernel: ACPI: LAPIC_NMI (acpi_id[0x02] high edge lint[0x1])
Nov 07 19:22:18 pve kernel: ACPI: LAPIC_NMI (acpi_id[0x03] high edge lint[0x1])
Nov 07 19:22:18 pve kernel: ACPI: LAPIC_NMI (acpi_id[0x04] high edge lint[0x1])
Nov 07 19:22:18 pve kernel: IOAPIC[0]: apic_id 2, version 32, address 0xfec00000, GSI 0-119
Nov 07 19:22:18 pve kernel: ACPI: INT_SRC_OVR (bus 0 bus_irq 0 global_irq 2 dfl dfl)
Nov 07 19:22:18 pve kernel: ACPI: INT_SRC_OVR (bus 0 bus_irq 9 global_irq 9 high level)
Nov 07 19:22:18 pve kernel: ACPI: Using ACPI (MADT) for SMP configuration information
Nov 07 19:22:18 pve kernel: ACPI: HPET id: 0x8086a201 base: 0xfed00000
Nov 07 19:22:18 pve kernel: TSC deadline timer available
Nov 07 19:22:18 pve kernel: smpboot: Allowing 4 CPUs, 0 hotplug CPUs
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x00000000-0x00000fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x00058000-0x00058fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x0009e000-0x000fffff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x84b09000-0x84b09fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x84b0a000-0x84b0afff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x8adf7000-0x8adf7fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x8bd2f000-0x8c7ddfff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x8cc47000-0x8cfe5fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x8cfe6000-0x8d3a6fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x8d3a7000-0x8d3fdfff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x8d3ff000-0x8fffffff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0x90000000-0xfdffffff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfe000000-0xfe010fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfe011000-0xfebfffff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfec00000-0xfec00fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfec01000-0xfecfffff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfed00000-0xfed00fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfed01000-0xfedfffff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfee00000-0xfee00fff]
Nov 07 19:22:18 pve kernel: PM: hibernation: Registered nosave memory: [mem 0xfee01000-0xffffffff]
Nov 07 19:22:18 pve kernel: [mem 0x90000000-0xfdffffff] available for PCI devices
Nov 07 19:22:18 pve kernel: Booting paravirtualized kernel on bare hardware
Nov 07 19:22:18 pve kernel: clocksource: refined-jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 7645519600211568 ns
Nov 07 19:22:18 pve kernel: setup_percpu: NR_CPUS:8192 nr_cpumask_bits:4 nr_cpu_ids:4 nr_node_ids:1
Nov 07 19:22:18 pve kernel: percpu: Embedded 62 pages/cpu s217088 r8192 d28672 u524288
Nov 07 19:22:18 pve kernel: pcpu-alloc: s217088 r8192 d28672 u524288 alloc=1*2097152
Nov 07 19:22:18 pve kernel: pcpu-alloc: [0] 0 1 2 3 
Nov 07 19:22:18 pve kernel: Fallback order for Node 0: 0 
Nov 07 19:22:18 pve kernel: Built 1 zonelists, mobility grouping on.  Total pages: 8237520
Nov 07 19:22:18 pve kernel: Policy zone: Normal
Nov 07 19:22:18 pve kernel: Kernel command line: BOOT_IMAGE=/boot/vmlinuz-6.2.16-3-pve root=/dev/mapper/pve-root ro quiet intel_iommu=on/
Nov 07 19:22:18 pve kernel: DMAR: IOMMU enabled
Nov 07 19:22:18 pve kernel: Unknown kernel command line parameters "BOOT_IMAGE=/boot/vmlinuz-6.2.16-3-pve", will be passed to user space.
Nov 07 19:22:18 pve kernel: random: crng init done
Nov 07 19:22:18 pve kernel: Dentry cache hash table entries: 4194304 (order: 13, 33554432 bytes, linear)
Nov 07 19:22:18 pve kernel: Inode-cache hash table entries: 2097152 (order: 12, 16777216 bytes, linear)
Nov 07 19:22:18 pve kernel: mem auto-init: stack:all(zero), heap alloc:on, heap free:off
Nov 07 19:22:18 pve kernel: software IO TLB: area num 4.
Nov 07 19:22:18 pve kernel: Memory: 32650840K/33473740K available (20480K kernel code, 4125K rwdata, 12368K rodata, 4600K init, 17728K bss, 822640K reserved, 0K cma-reserved)
Nov 07 19:22:18 pve kernel: SLUB: HWalign=64, Order=0-3, MinObjects=0, CPUs=4, Nodes=1
Nov 07 19:22:18 pve kernel: Kernel/User page tables isolation: enabled
Nov 07 19:22:18 pve kernel: ftrace: allocating 50923 entries in 199 pages
Nov 07 19:22:18 pve kernel: ftrace: allocated 199 pages with 5 groups
Nov 07 19:22:18 pve kernel: Dynamic Preempt: voluntary
Nov 07 19:22:18 pve kernel: rcu: Preemptible hierarchical RCU implementation.
Nov 07 19:22:18 pve kernel: rcu:  RCU restricting CPUs from NR_CPUS=8192 to nr_cpu_ids=4.
Nov 07 19:22:18 pve kernel:  Trampoline variant of Tasks RCU enabled.
Nov 07 19:22:18 pve kernel:  Rude variant of Tasks RCU enabled.
Nov 07 19:22:18 pve kernel:  Tracing variant of Tasks RCU enabled.
Nov 07 19:22:18 pve kernel: rcu: RCU calculated value of scheduler-enlistment delay is 25 jiffies.
Nov 07 19:22:18 pve kernel: rcu: Adjusting geometry for rcu_fanout_leaf=16, nr_cpu_ids=4
Nov 07 19:22:18 pve kernel: NR_IRQS: 524544, nr_irqs: 1024, preallocated irqs: 16
Nov 07 19:22:18 pve kernel: rcu: srcu_init: Setting srcu_struct sizes based on contention.
Nov 07 19:22:18 pve kernel: Console: colour dummy device 80x25
Nov 07 19:22:18 pve kernel: printk: console [tty0] enabled
Nov 07 19:22:18 pve kernel: ACPI: Core revision 20221020
Nov 07 19:22:18 pve kernel: hpet: HPET dysfunctional in PC10. Force disabled.
Nov 07 19:22:18 pve kernel: APIC: Switch to symmetric I/O mode setup
Nov 07 19:22:18 pve kernel: DMAR: Host address width 39
Nov 07 19:22:18 pve kernel: DMAR: DRHD base: 0x000000fed90000 flags: 0x0
Nov 07 19:22:18 pve kernel: DMAR: dmar0: reg_base_addr fed90000 ver 1:0 cap 1c0000c40660462 ecap 19e2ff0505e
Nov 07 19:22:18 pve kernel: DMAR: DRHD base: 0x000000fed91000 flags: 0x1
Nov 07 19:22:18 pve kernel: DMAR: dmar1: reg_base_addr fed91000 ver 1:0 cap d2008c40660462 ecap f050da
Nov 07 19:22:18 pve kernel: DMAR: RMRR base: 0x0000008c16b000 end: 0x0000008c18afff
Nov 07 19:22:18 pve kernel: DMAR: RMRR base: 0x0000008d800000 end: 0x0000008fffffff
Nov 07 19:22:18 pve kernel: DMAR-IR: IOAPIC id 2 under DRHD base  0xfed91000 IOMMU 1
Nov 07 19:22:18 pve kernel: DMAR-IR: HPET id 0 under DRHD base 0xfed91000
Nov 07 19:22:18 pve kernel: DMAR-IR: x2apic is disabled because BIOS sets x2apic opt out bit.
Nov 07 19:22:18 pve kernel: DMAR-IR: Use 'intremap=no_x2apic_optout' to override the BIOS setting.
Nov 07 19:22:18 pve kernel: DMAR-IR: Enabled IRQ remapping in xapic mode
Nov 07 19:22:18 pve kernel: x2apic: IRQ remapping doesn't support X2APIC mode
Nov 07 19:22:18 pve kernel: clocksource: tsc-early: mask: 0xffffffffffffffff max_cycles: 0x26eae8729ef, max_idle_ns: 440795235156 ns
Nov 07 19:22:18 pve kernel: Calibrating delay loop (skipped), value calculated using timer frequency.. 5399.81 BogoMIPS (lpj=10799636)
Nov 07 19:22:18 pve kernel: pid_max: default: 32768 minimum: 301
Nov 07 19:22:18 pve kernel: LSM: initializing lsm=capability,yama,integrity,apparmor
Nov 07 19:22:18 pve kernel: Yama: becoming mindful.
Nov 07 19:22:18 pve kernel: AppArmor: AppArmor initialized
Nov 07 19:22:18 pve kernel: Mount-cache hash table entries: 65536 (order: 7, 524288 bytes, linear)
Nov 07 19:22:18 pve kernel: Mountpoint-cache hash table entries: 65536 (order: 7, 524288 bytes, linear)
Nov 07 19:22:18 pve kernel: x86/cpu: SGX disabled by BIOS.
Nov 07 19:22:18 pve kernel: CPU0: Thermal monitoring enabled (TM1)
Nov 07 19:22:18 pve kernel: process: using mwait in idle threads
Nov 07 19:22:18 pve kernel: Last level iTLB entries: 4KB 64, 2MB 8, 4MB 8
Nov 07 19:22:18 pve kernel: Last level dTLB entries: 4KB 64, 2MB 0, 4MB 0, 1GB 4
Nov 07 19:22:18 pve kernel: Spectre V1 : Mitigation: usercopy/swapgs barriers and __user pointer sanitization
Nov 07 19:22:18 pve kernel: Spectre V2 : Mitigation: IBRS
Nov 07 19:22:18 pve kernel: Spectre V2 : Spectre v2 / SpectreRSB mitigation: Filling RSB on context switch
Nov 07 19:22:18 pve kernel: Spectre V2 : Spectre v2 / SpectreRSB : Filling RSB on VMEXIT
Nov 07 19:22:18 pve kernel: RETBleed: Mitigation: IBRS
Nov 07 19:22:18 pve kernel: Spectre V2 : mitigation: Enabling conditional Indirect Branch Prediction Barrier
Nov 07 19:22:18 pve kernel: Spectre V2 : User space: Mitigation: STIBP via prctl
Nov 07 19:22:18 pve kernel: Speculative Store Bypass: Vulnerable
Nov 07 19:22:18 pve kernel: MDS: Vulnerable: Clear CPU buffers attempted, no microcode
Nov 07 19:22:18 pve kernel: MMIO Stale Data: Vulnerable: Clear CPU buffers attempted, no microcode
Nov 07 19:22:18 pve kernel: SRBDS: Vulnerable: No microcode
Nov 07 19:22:18 pve kernel: Freeing SMP alternatives memory: 44K
Nov 07 19:22:18 pve kernel: smpboot: CPU0: Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz (family: 0x6, model: 0x8e, stepping: 0x9)
Nov 07 19:22:18 pve kernel: cblist_init_generic: Setting adjustable number of callback queues.
Nov 07 19:22:18 pve kernel: cblist_init_generic: Setting shift to 2 and lim to 1.
Nov 07 19:22:18 pve kernel: cblist_init_generic: Setting shift to 2 and lim to 1.
Nov 07 19:22:18 pve kernel: cblist_init_generic: Setting shift to 2 and lim to 1.
Nov 07 19:22:18 pve kernel: Performance Events: PEBS fmt3+, Skylake events, 32-deep LBR, full-width counters, Intel PMU driver.
Nov 07 19:22:18 pve kernel: ... version:                4
Nov 07 19:22:18 pve kernel: ... bit width:              48
Nov 07 19:22:18 pve kernel: ... generic registers:      4
Nov 07 19:22:18 pve kernel: ... value mask:             0000ffffffffffff
Nov 07 19:22:18 pve kernel: ... max period:             00007fffffffffff
Nov 07 19:22:18 pve kernel: ... fixed-purpose events:   3
Nov 07 19:22:18 pve kernel: ... event mask:             000000070000000f
Nov 07 19:22:18 pve kernel: Estimated ratio of average max frequency by base frequency (times 1024): 1175
Nov 07 19:22:18 pve kernel: rcu: Hierarchical SRCU implementation.
Nov 07 19:22:18 pve kernel: rcu:  Max phase no-delay instances is 1000.
Nov 07 19:22:18 pve kernel: NMI watchdog: Enabled. Permanently consumes one hw-PMU counter.
Nov 07 19:22:18 pve kernel: smp: Bringing up secondary CPUs ...
Nov 07 19:22:18 pve kernel: x86: Booting SMP configuration:
Nov 07 19:22:18 pve kernel: .... node  #0, CPUs:      #1 #2
Nov 07 19:22:18 pve kernel: MDS CPU bug present and SMT on, data leak possible. See https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/mds.html for more details.
Nov 07 19:22:18 pve kernel: MMIO Stale Data CPU bug present and SMT on, data leak possible. See https://www.kernel.org/doc/html/latest/admin-guide/hw-vuln/processor_mmio_stale_data.html for more details.
Nov 07 19:22:18 pve kernel:  #3
Nov 07 19:22:18 pve kernel: smp: Brought up 1 node, 4 CPUs
Nov 07 19:22:18 pve kernel: smpboot: Max logical packages: 1
Nov 07 19:22:18 pve kernel: smpboot: Total of 4 processors activated (21599.27 BogoMIPS)
Nov 07 19:22:18 pve kernel: devtmpfs: initialized
Nov 07 19:22:18 pve kernel: x86/mm: Memory block size: 128MB
Nov 07 19:22:18 pve kernel: ACPI: PM: Registering ACPI NVS region [mem 0x84b09000-0x84b09fff] (4096 bytes)
Nov 07 19:22:18 pve kernel: ACPI: PM: Registering ACPI NVS region [mem 0x8cc47000-0x8cfe5fff] (3796992 bytes)
Nov 07 19:22:18 pve kernel: clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff, max_idle_ns: 7645041785100000 ns
Nov 07 19:22:18 pve kernel: futex hash table entries: 1024 (order: 4, 65536 bytes, linear)
Nov 07 19:22:18 pve kernel: pinctrl core: initialized pinctrl subsystem
Nov 07 19:22:18 pve kernel: PM: RTC time: 11:22:13, date: 2023-11-07
Nov 07 19:22:18 pve kernel: NET: Registered PF_NETLINK/PF_ROUTE protocol family
Nov 07 19:22:18 pve kernel: DMA: preallocated 4096 KiB GFP_KERNEL pool for atomic allocations
Nov 07 19:22:18 pve kernel: DMA: preallocated 4096 KiB GFP_KERNEL|GFP_DMA pool for atomic allocations
Nov 07 19:22:18 pve kernel: DMA: preallocated 4096 KiB GFP_KERNEL|GFP_DMA32 pool for atomic allocations
Nov 07 19:22:18 pve kernel: audit: initializing netlink subsys (disabled)
Nov 07 19:22:18 pve kernel: audit: type=2000 audit(1699356133.016:1): state=initialized audit_enabled=0 res=1
Nov 07 19:22:18 pve kernel: thermal_sys: Registered thermal governor 'fair_share'
Nov 07 19:22:18 pve kernel: thermal_sys: Registered thermal governor 'bang_bang'
Nov 07 19:22:18 pve kernel: thermal_sys: Registered thermal governor 'step_wise'
Nov 07 19:22:18 pve kernel: thermal_sys: Registered thermal governor 'user_space'
Nov 07 19:22:18 pve kernel: thermal_sys: Registered thermal governor 'power_allocator'
Nov 07 19:22:18 pve kernel: EISA bus registered
Nov 07 19:22:18 pve kernel: cpuidle: using governor ladder
Nov 07 19:22:18 pve kernel: cpuidle: using governor menu
Nov 07 19:22:18 pve kernel: acpiphp: ACPI Hot Plug PCI Controller Driver version: 0.5
Nov 07 19:22:18 pve kernel: PCI: MMCONFIG for domain 0000 [bus 00-ff] at [mem 0xe0000000-0xefffffff] (base 0xe0000000)
Nov 07 19:22:18 pve kernel: PCI: not using MMCONFIG
Nov 07 19:22:18 pve kernel: PCI: Using configuration type 1 for base access
Nov 07 19:22:18 pve kernel: ENERGY_PERF_BIAS: Set to 'normal', was 'performance'
Nov 07 19:22:18 pve kernel: kprobes: kprobe jump-optimization is enabled. All kprobes are optimized if possible.
Nov 07 19:22:18 pve kernel: HugeTLB: registered 1.00 GiB page size, pre-allocated 0 pages
Nov 07 19:22:18 pve kernel: HugeTLB: 16380 KiB vmemmap can be freed for a 1.00 GiB page
Nov 07 19:22:18 pve kernel: HugeTLB: registered 2.00 MiB page size, pre-allocated 0 pages
Nov 07 19:22:18 pve kernel: HugeTLB: 28 KiB vmemmap can be freed for a 2.00 MiB page
Nov 07 19:22:18 pve kernel: fbcon: Taking over console
Nov 07 19:22:18 pve kernel: ACPI: Added _OSI(Module Device)
Nov 07 19:22:18 pve kernel: ACPI: Added _OSI(Processor Device)
Nov 07 19:22:18 pve kernel: ACPI: Added _OSI(3.0 _SCP Extensions)
Nov 07 19:22:18 pve kernel: ACPI: Added _OSI(Processor Aggregator Device)
Nov 07 19:22:18 pve kernel: ACPI: 10 ACPI AML tables successfully acquired and loaded
Nov 07 19:22:18 pve kernel: ACPI: [Firmware Bug]: BIOS _OSI(Linux) query ignored
Nov 07 19:22:18 pve kernel: ACPI: Dynamic OEM Table Load:
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0xFFFF88D740D5E800 0006B4 (v02 PmRef  Cpu0Ist  00003000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: \_PR_.CPU0: _OSC native thermal LVT Acked
Nov 07 19:22:18 pve kernel: ACPI: Dynamic OEM Table Load:
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0xFFFF88D741014400 0003FF (v02 PmRef  Cpu0Cst  00003001 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: Dynamic OEM Table Load:
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0xFFFF88D740D58000 00065C (v02 PmRef  ApIst    00003000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: Dynamic OEM Table Load:
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0xFFFF88D740211800 000197 (v02 PmRef  ApHwp    00003000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: Dynamic OEM Table Load:
Nov 07 19:22:18 pve kernel: ACPI: SSDT 0xFFFF88D740210A00 00018A (v02 PmRef  ApCst    00003000 INTL 20160422)
Nov 07 19:22:18 pve kernel: ACPI: Interpreter enabled
Nov 07 19:22:18 pve kernel: ACPI: PM: (supports S0 S5)
Nov 07 19:22:18 pve kernel: ACPI: Using IOAPIC for interrupt routing
Nov 07 19:22:18 pve kernel: PCI: MMCONFIG for domain 0000 [bus 00-ff] at [mem 0xe0000000-0xefffffff] (base 0xe0000000)
Nov 07 19:22:18 pve kernel: PCI: MMCONFIG at [mem 0xe0000000-0xefffffff] reserved as ACPI motherboard resource
Nov 07 19:22:18 pve kernel: PCI: Using host bridge windows from ACPI; if necessary, use "pci=nocrs" and report a bug
Nov 07 19:22:18 pve kernel: PCI: Using E820 reservations for host bridge windows
Nov 07 19:22:18 pve kernel: ACPI: Enabled 6 GPEs in block 00 to 7F
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP09.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP10.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP11.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP12.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP13.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP01.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP02.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP03.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP04.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP05.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP06.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP07.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP08.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP17.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP18.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP19.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP20.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP14.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP15.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_SB_.PCI0.RP16.PXSX.WRST: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_TZ_.FN00: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_TZ_.FN01: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_TZ_.FN02: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_TZ_.FN03: New power resource
Nov 07 19:22:18 pve kernel: ACPI: \_TZ_.FN04: New power resource
Nov 07 19:22:18 pve kernel: ACPI: PCI Root Bridge [PCI0] (domain 0000 [bus 00-fe])
Nov 07 19:22:18 pve kernel: acpi PNP0A08:00: _OSC: OS supports [ExtendedConfig ASPM ClockPM Segments MSI EDR HPX-Type3]
Nov 07 19:22:18 pve kernel: acpi PNP0A08:00: _OSC: OS now controls [PCIeHotplug SHPCHotplug PME AER PCIeCapability LTR DPC]
Nov 07 19:22:18 pve kernel: PCI host bridge to bus 0000:00
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: root bus resource [io  0x0000-0x0cf7 window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: root bus resource [io  0x0d00-0xffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: root bus resource [mem 0x000a0000-0x000fffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: root bus resource [mem 0x90000000-0xdfffffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: root bus resource [mem 0x2000000000-0x2fffffffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: root bus resource [mem 0xfd000000-0xfe7fffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: root bus resource [bus 00-fe]
Nov 07 19:22:18 pve kernel: pci 0000:00:00.0: [8086:5904] type 00 class 0x060000
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: [8086:5916] type 00 class 0x030000
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: reg 0x10: [mem 0x2ffe000000-0x2ffeffffff 64bit]
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: reg 0x18: [mem 0x2fe0000000-0x2fefffffff 64bit pref]
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: reg 0x20: [io  0xf000-0xf03f]
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: Video device with shadowed ROM at [mem 0x000c0000-0x000dffff]
Nov 07 19:22:18 pve kernel: pci 0000:00:14.0: [8086:9d2f] type 00 class 0x0c0330
Nov 07 19:22:18 pve kernel: pci 0000:00:14.0: reg 0x10: [mem 0x2fff000000-0x2fff00ffff 64bit]
Nov 07 19:22:18 pve kernel: pci 0000:00:14.0: PME# supported from D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:16.0: [8086:9d3a] type 00 class 0x078000
Nov 07 19:22:18 pve kernel: pci 0000:00:16.0: reg 0x10: [mem 0x2fff011000-0x2fff011fff 64bit]
Nov 07 19:22:18 pve kernel: pci 0000:00:16.0: PME# supported from D3hot
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: [8086:9d03] type 00 class 0x010601
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: reg 0x10: [mem 0xdff04000-0xdff05fff]
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: reg 0x14: [mem 0xdff07000-0xdff070ff]
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: reg 0x18: [io  0xf090-0xf097]
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: reg 0x1c: [io  0xf080-0xf083]
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: reg 0x20: [io  0xf060-0xf07f]
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: reg 0x24: [mem 0xdff06000-0xdff067ff]
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: PME# supported from D3hot
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0: [8086:9d10] type 01 class 0x060400
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0: Intel SPT PCH root port ACS workaround enabled
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1: [8086:9d11] type 01 class 0x060400
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1: Intel SPT PCH root port ACS workaround enabled
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2: [8086:9d12] type 01 class 0x060400
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2: Intel SPT PCH root port ACS workaround enabled
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3: [8086:9d13] type 01 class 0x060400
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3: Intel SPT PCH root port ACS workaround enabled
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4: [8086:9d14] type 01 class 0x060400
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4: Intel SPT PCH root port ACS workaround enabled
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5: [8086:9d15] type 01 class 0x060400
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5: Intel SPT PCH root port ACS workaround enabled
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.0: [8086:9d58] type 00 class 0x060100
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.2: [8086:9d21] type 00 class 0x058000
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.2: reg 0x10: [mem 0xdff00000-0xdff03fff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.4: [8086:9d23] type 00 class 0x0c0500
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.4: reg 0x10: [mem 0x2fff010000-0x2fff0100ff 64bit]
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.4: reg 0x20: [io  0xf040-0xf05f]
Nov 07 19:22:18 pve kernel: pci 0000:01:00.0: [8086:150c] type 00 class 0x020000
Nov 07 19:22:18 pve kernel: pci 0000:01:00.0: reg 0x10: [mem 0xdfe00000-0xdfe1ffff]
Nov 07 19:22:18 pve kernel: pci 0000:01:00.0: reg 0x18: [io  0xe000-0xe01f]
Nov 07 19:22:18 pve kernel: pci 0000:01:00.0: reg 0x1c: [mem 0xdfe20000-0xdfe23fff]
Nov 07 19:22:18 pve kernel: pci 0000:01:00.0: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0: PCI bridge to [bus 01]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0:   bridge window [io  0xe000-0xefff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0:   bridge window [mem 0xdfe00000-0xdfefffff]
Nov 07 19:22:18 pve kernel: pci 0000:02:00.0: [8086:150c] type 00 class 0x020000
Nov 07 19:22:18 pve kernel: pci 0000:02:00.0: reg 0x10: [mem 0xdfd00000-0xdfd1ffff]
Nov 07 19:22:18 pve kernel: pci 0000:02:00.0: reg 0x18: [io  0xd000-0xd01f]
Nov 07 19:22:18 pve kernel: pci 0000:02:00.0: reg 0x1c: [mem 0xdfd20000-0xdfd23fff]
Nov 07 19:22:18 pve kernel: pci 0000:02:00.0: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1: PCI bridge to [bus 02]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1:   bridge window [io  0xd000-0xdfff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1:   bridge window [mem 0xdfd00000-0xdfdfffff]
Nov 07 19:22:18 pve kernel: pci 0000:03:00.0: [8086:150c] type 00 class 0x020000
Nov 07 19:22:18 pve kernel: pci 0000:03:00.0: reg 0x10: [mem 0xdfc00000-0xdfc1ffff]
Nov 07 19:22:18 pve kernel: pci 0000:03:00.0: reg 0x18: [io  0xc000-0xc01f]
Nov 07 19:22:18 pve kernel: pci 0000:03:00.0: reg 0x1c: [mem 0xdfc20000-0xdfc23fff]
Nov 07 19:22:18 pve kernel: pci 0000:03:00.0: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2: PCI bridge to [bus 03]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2:   bridge window [io  0xc000-0xcfff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2:   bridge window [mem 0xdfc00000-0xdfcfffff]
Nov 07 19:22:18 pve kernel: pci 0000:04:00.0: [8086:150c] type 00 class 0x020000
Nov 07 19:22:18 pve kernel: pci 0000:04:00.0: reg 0x10: [mem 0xdfb00000-0xdfb1ffff]
Nov 07 19:22:18 pve kernel: pci 0000:04:00.0: reg 0x18: [io  0xb000-0xb01f]
Nov 07 19:22:18 pve kernel: pci 0000:04:00.0: reg 0x1c: [mem 0xdfb20000-0xdfb23fff]
Nov 07 19:22:18 pve kernel: pci 0000:04:00.0: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3: PCI bridge to [bus 04]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3:   bridge window [io  0xb000-0xbfff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3:   bridge window [mem 0xdfb00000-0xdfbfffff]
Nov 07 19:22:18 pve kernel: pci 0000:05:00.0: [8086:150c] type 00 class 0x020000
Nov 07 19:22:18 pve kernel: pci 0000:05:00.0: reg 0x10: [mem 0xdfa00000-0xdfa1ffff]
Nov 07 19:22:18 pve kernel: pci 0000:05:00.0: reg 0x18: [io  0xa000-0xa01f]
Nov 07 19:22:18 pve kernel: pci 0000:05:00.0: reg 0x1c: [mem 0xdfa20000-0xdfa23fff]
Nov 07 19:22:18 pve kernel: pci 0000:05:00.0: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4: PCI bridge to [bus 05]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4:   bridge window [io  0xa000-0xafff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4:   bridge window [mem 0xdfa00000-0xdfafffff]
Nov 07 19:22:18 pve kernel: pci 0000:06:00.0: [8086:150c] type 00 class 0x020000
Nov 07 19:22:18 pve kernel: pci 0000:06:00.0: reg 0x10: [mem 0xdf900000-0xdf91ffff]
Nov 07 19:22:18 pve kernel: pci 0000:06:00.0: reg 0x18: [io  0x9000-0x901f]
Nov 07 19:22:18 pve kernel: pci 0000:06:00.0: reg 0x1c: [mem 0xdf920000-0xdf923fff]
Nov 07 19:22:18 pve kernel: pci 0000:06:00.0: PME# supported from D0 D3hot D3cold
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5: PCI bridge to [bus 06]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5:   bridge window [io  0x9000-0x9fff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5:   bridge window [mem 0xdf900000-0xdf9fffff]
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKA configured for IRQ 11
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKB configured for IRQ 10
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKC configured for IRQ 11
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKD configured for IRQ 11
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKE configured for IRQ 11
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKF configured for IRQ 11
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKG configured for IRQ 11
Nov 07 19:22:18 pve kernel: ACPI: PCI: Interrupt link LNKH configured for IRQ 11
Nov 07 19:22:18 pve kernel: iommu: Default domain type: Translated 
Nov 07 19:22:18 pve kernel: iommu: DMA domain TLB invalidation policy: lazy mode 
Nov 07 19:22:18 pve kernel: SCSI subsystem initialized
Nov 07 19:22:18 pve kernel: libata version 3.00 loaded.
Nov 07 19:22:18 pve kernel: ACPI: bus type USB registered
Nov 07 19:22:18 pve kernel: usbcore: registered new interface driver usbfs
Nov 07 19:22:18 pve kernel: usbcore: registered new interface driver hub
Nov 07 19:22:18 pve kernel: usbcore: registered new device driver usb
Nov 07 19:22:18 pve kernel: pps_core: LinuxPPS API ver. 1 registered
Nov 07 19:22:18 pve kernel: pps_core: Software ver. 5.3.6 - Copyright 2005-2007 Rodolfo Giometti <giometti@linux.it>
Nov 07 19:22:18 pve kernel: PTP clock support registered
Nov 07 19:22:18 pve kernel: EDAC MC: Ver: 3.0.0
Nov 07 19:22:18 pve kernel: Registered efivars operations
Nov 07 19:22:18 pve kernel: NetLabel: Initializing
Nov 07 19:22:18 pve kernel: NetLabel:  domain hash size = 128
Nov 07 19:22:18 pve kernel: NetLabel:  protocols = UNLABELED CIPSOv4 CALIPSO
Nov 07 19:22:18 pve kernel: NetLabel:  unlabeled traffic allowed by default
Nov 07 19:22:18 pve kernel: mctp: management component transport protocol core
Nov 07 19:22:18 pve kernel: NET: Registered PF_MCTP protocol family
Nov 07 19:22:18 pve kernel: PCI: Using ACPI for IRQ routing
Nov 07 19:22:18 pve kernel: PCI: pci_cache_line_size set to 64 bytes
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x00058000-0x0005ffff]
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x0009e000-0x0009ffff]
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x84b09000-0x87ffffff]
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x8adf7000-0x8bffffff]
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x8bd2f000-0x8bffffff]
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x8cc47000-0x8fffffff]
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x8d3ff000-0x8fffffff]
Nov 07 19:22:18 pve kernel: e820: reserve RAM buffer [mem 0x86f000000-0x86fffffff]
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: vgaarb: setting as boot VGA device
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: vgaarb: bridge control possible
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: vgaarb: VGA device added: decodes=io+mem,owns=io+mem,locks=none
Nov 07 19:22:18 pve kernel: vgaarb: loaded
Nov 07 19:22:18 pve kernel: clocksource: Switched to clocksource tsc-early
Nov 07 19:22:18 pve kernel: VFS: Disk quotas dquot_6.6.0
Nov 07 19:22:18 pve kernel: VFS: Dquot-cache hash table entries: 512 (order 0, 4096 bytes)
Nov 07 19:22:18 pve kernel: AppArmor: AppArmor Filesystem Enabled
Nov 07 19:22:18 pve kernel: pnp: PnP ACPI init
Nov 07 19:22:18 pve kernel: system 00:00: [io  0x0a00-0x0a2f] has been reserved
Nov 07 19:22:18 pve kernel: system 00:00: [io  0x0a30-0x0a3f] has been reserved
Nov 07 19:22:18 pve kernel: system 00:00: [io  0x0a40-0x0a4f] has been reserved
Nov 07 19:22:18 pve kernel: system 00:03: [io  0x0680-0x069f] has been reserved
Nov 07 19:22:18 pve kernel: system 00:03: [io  0xffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:03: [io  0xffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:03: [io  0xffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:03: [io  0x1800-0x18fe] has been reserved
Nov 07 19:22:18 pve kernel: system 00:03: [io  0x164e-0x164f] has been reserved
Nov 07 19:22:18 pve kernel: system 00:05: [io  0x1854-0x1857] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xfed10000-0xfed17fff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xfed18000-0xfed18fff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xfed19000-0xfed19fff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xe0000000-0xefffffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xfed20000-0xfed3ffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xfed90000-0xfed93fff] could not be reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xfed45000-0xfed8ffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xff000000-0xffffffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xfee00000-0xfeefffff] could not be reserved
Nov 07 19:22:18 pve kernel: system 00:06: [mem 0xdffe0000-0xdfffffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:07: [mem 0xfd000000-0xfdabffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:07: [mem 0xfdad0000-0xfdadffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:07: [mem 0xfdb00000-0xfdffffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:07: [mem 0xfe000000-0xfe01ffff] could not be reserved
Nov 07 19:22:18 pve kernel: system 00:07: [mem 0xfe036000-0xfe03bfff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:07: [mem 0xfe03d000-0xfe3fffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:07: [mem 0xfe410000-0xfe7fffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:08: [io  0xff00-0xfffe] has been reserved
Nov 07 19:22:18 pve kernel: system 00:09: [mem 0xfe029000-0xfe029fff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:09: [mem 0xfe028000-0xfe028fff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:09: [mem 0xfdaf0000-0xfdafffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:09: [mem 0xfdae0000-0xfdaeffff] has been reserved
Nov 07 19:22:18 pve kernel: system 00:09: [mem 0xfdac0000-0xfdacffff] has been reserved
Nov 07 19:22:18 pve kernel: pnp: PnP ACPI: found 10 devices
Nov 07 19:22:18 pve kernel: clocksource: acpi_pm: mask: 0xffffff max_cycles: 0xffffff, max_idle_ns: 2085701024 ns
Nov 07 19:22:18 pve kernel: NET: Registered PF_INET protocol family
Nov 07 19:22:18 pve kernel: IP idents hash table entries: 262144 (order: 9, 2097152 bytes, linear)
Nov 07 19:22:18 pve kernel: tcp_listen_portaddr_hash hash table entries: 16384 (order: 6, 262144 bytes, linear)
Nov 07 19:22:18 pve kernel: Table-perturb hash table entries: 65536 (order: 6, 262144 bytes, linear)
Nov 07 19:22:18 pve kernel: TCP established hash table entries: 262144 (order: 9, 2097152 bytes, linear)
Nov 07 19:22:18 pve kernel: TCP bind hash table entries: 65536 (order: 9, 2097152 bytes, linear)
Nov 07 19:22:18 pve kernel: TCP: Hash tables configured (established 262144 bind 65536)
Nov 07 19:22:18 pve kernel: MPTCP token hash table entries: 32768 (order: 7, 786432 bytes, linear)
Nov 07 19:22:18 pve kernel: UDP hash table entries: 16384 (order: 7, 524288 bytes, linear)
Nov 07 19:22:18 pve kernel: UDP-Lite hash table entries: 16384 (order: 7, 524288 bytes, linear)
Nov 07 19:22:18 pve kernel: NET: Registered PF_UNIX/PF_LOCAL protocol family
Nov 07 19:22:18 pve kernel: NET: Registered PF_XDP protocol family
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0: PCI bridge to [bus 01]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0:   bridge window [io  0xe000-0xefff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0:   bridge window [mem 0xdfe00000-0xdfefffff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1: PCI bridge to [bus 02]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1:   bridge window [io  0xd000-0xdfff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1:   bridge window [mem 0xdfd00000-0xdfdfffff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2: PCI bridge to [bus 03]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2:   bridge window [io  0xc000-0xcfff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2:   bridge window [mem 0xdfc00000-0xdfcfffff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3: PCI bridge to [bus 04]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3:   bridge window [io  0xb000-0xbfff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3:   bridge window [mem 0xdfb00000-0xdfbfffff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4: PCI bridge to [bus 05]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4:   bridge window [io  0xa000-0xafff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4:   bridge window [mem 0xdfa00000-0xdfafffff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5: PCI bridge to [bus 06]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5:   bridge window [io  0x9000-0x9fff]
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5:   bridge window [mem 0xdf900000-0xdf9fffff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: resource 4 [io  0x0000-0x0cf7 window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: resource 5 [io  0x0d00-0xffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: resource 6 [mem 0x000a0000-0x000fffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: resource 7 [mem 0x90000000-0xdfffffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: resource 8 [mem 0x2000000000-0x2fffffffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:00: resource 9 [mem 0xfd000000-0xfe7fffff window]
Nov 07 19:22:18 pve kernel: pci_bus 0000:01: resource 0 [io  0xe000-0xefff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:01: resource 1 [mem 0xdfe00000-0xdfefffff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:02: resource 0 [io  0xd000-0xdfff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:02: resource 1 [mem 0xdfd00000-0xdfdfffff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:03: resource 0 [io  0xc000-0xcfff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:03: resource 1 [mem 0xdfc00000-0xdfcfffff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:04: resource 0 [io  0xb000-0xbfff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:04: resource 1 [mem 0xdfb00000-0xdfbfffff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:05: resource 0 [io  0xa000-0xafff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:05: resource 1 [mem 0xdfa00000-0xdfafffff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:06: resource 0 [io  0x9000-0x9fff]
Nov 07 19:22:18 pve kernel: pci_bus 0000:06: resource 1 [mem 0xdf900000-0xdf9fffff]
Nov 07 19:22:18 pve kernel: PCI: CLS 64 bytes, default 64
Nov 07 19:22:18 pve kernel: DMAR: No ATSR found
Nov 07 19:22:18 pve kernel: DMAR: No SATC found
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature fl1gp_support inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature pgsel_inv inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature nwfs inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature pasid inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature eafs inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature prs inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature nest inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature mts inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature sc_support inconsistent
Nov 07 19:22:18 pve kernel: DMAR: IOMMU feature dev_iotlb_support inconsistent
Nov 07 19:22:18 pve kernel: DMAR: dmar0: Using Queued invalidation
Nov 07 19:22:18 pve kernel: DMAR: dmar1: Using Queued invalidation
Nov 07 19:22:18 pve kernel: Trying to unpack rootfs image as initramfs...
Nov 07 19:22:18 pve kernel: pci 0000:00:02.0: Adding to iommu group 0
Nov 07 19:22:18 pve kernel: pci 0000:00:00.0: Adding to iommu group 1
Nov 07 19:22:18 pve kernel: pci 0000:00:14.0: Adding to iommu group 2
Nov 07 19:22:18 pve kernel: pci 0000:00:16.0: Adding to iommu group 3
Nov 07 19:22:18 pve kernel: pci 0000:00:17.0: Adding to iommu group 4
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.0: Adding to iommu group 5
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.1: Adding to iommu group 6
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.2: Adding to iommu group 7
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.3: Adding to iommu group 8
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.4: Adding to iommu group 9
Nov 07 19:22:18 pve kernel: pci 0000:00:1c.5: Adding to iommu group 10
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.0: Adding to iommu group 11
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.2: Adding to iommu group 11
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.4: Adding to iommu group 11
Nov 07 19:22:18 pve kernel: pci 0000:01:00.0: Adding to iommu group 12
Nov 07 19:22:18 pve kernel: pci 0000:02:00.0: Adding to iommu group 13
Nov 07 19:22:18 pve kernel: pci 0000:03:00.0: Adding to iommu group 14
Nov 07 19:22:18 pve kernel: pci 0000:04:00.0: Adding to iommu group 15
Nov 07 19:22:18 pve kernel: pci 0000:05:00.0: Adding to iommu group 16
Nov 07 19:22:18 pve kernel: pci 0000:06:00.0: Adding to iommu group 17
Nov 07 19:22:18 pve kernel: DMAR: Intel(R) Virtualization Technology for Directed I/O
Nov 07 19:22:18 pve kernel: PCI-DMA: Using software bounce buffering for IO (SWIOTLB)
Nov 07 19:22:18 pve kernel: software IO TLB: mapped [mem 0x0000000084dab000-0x0000000088dab000] (64MB)
Nov 07 19:22:18 pve kernel: Initialise system trusted keyrings
Nov 07 19:22:18 pve kernel: Key type blacklist registered
Nov 07 19:22:18 pve kernel: workingset: timestamp_bits=36 max_order=23 bucket_order=0
Nov 07 19:22:18 pve kernel: zbud: loaded
Nov 07 19:22:18 pve kernel: squashfs: version 4.0 (2009/01/31) Phillip Lougher
Nov 07 19:22:18 pve kernel: fuse: init (API version 7.38)
Nov 07 19:22:18 pve kernel: integrity: Platform Keyring initialized
Nov 07 19:22:18 pve kernel: integrity: Machine keyring initialized
Nov 07 19:22:18 pve kernel: Key type asymmetric registered
Nov 07 19:22:18 pve kernel: Asymmetric key parser 'x509' registered
Nov 07 19:22:18 pve kernel: Block layer SCSI generic (bsg) driver version 0.4 loaded (major 243)
Nov 07 19:22:18 pve kernel: io scheduler mq-deadline registered
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.0: PME: Signaling with IRQ 122
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.0: AER: enabled with IRQ 122
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.1: PME: Signaling with IRQ 123
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.1: AER: enabled with IRQ 123
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.2: PME: Signaling with IRQ 124
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.2: AER: enabled with IRQ 124
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.3: PME: Signaling with IRQ 125
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.3: AER: enabled with IRQ 125
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.4: PME: Signaling with IRQ 126
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.4: AER: enabled with IRQ 126
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.5: PME: Signaling with IRQ 127
Nov 07 19:22:18 pve kernel: pcieport 0000:00:1c.5: AER: enabled with IRQ 127
Nov 07 19:22:18 pve kernel: shpchp: Standard Hot Plug PCI Controller Driver version: 0.4
Nov 07 19:22:18 pve kernel: input: Sleep Button as /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0C0E:00/input/input0
Nov 07 19:22:18 pve kernel: ACPI: button: Sleep Button [SLPB]
Nov 07 19:22:18 pve kernel: input: Power Button as /devices/LNXSYSTM:00/LNXSYBUS:00/PNP0C0C:00/input/input1
Nov 07 19:22:18 pve kernel: ACPI: button: Power Button [PWRB]
Nov 07 19:22:18 pve kernel: input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input2
Nov 07 19:22:18 pve kernel: ACPI: button: Power Button [PWRF]
Nov 07 19:22:18 pve kernel: thermal LNXTHERM:00: registered as thermal_zone0
Nov 07 19:22:18 pve kernel: ACPI: thermal: Thermal Zone [TZ00] (28 C)
Nov 07 19:22:18 pve kernel: thermal LNXTHERM:01: registered as thermal_zone1
Nov 07 19:22:18 pve kernel: ACPI: thermal: Thermal Zone [TZ01] (30 C)
Nov 07 19:22:18 pve kernel: Serial: 8250/16550 driver, 32 ports, IRQ sharing enabled
Nov 07 19:22:18 pve kernel: hpet_acpi_add: no address or irqs in _CRS
Nov 07 19:22:18 pve kernel: Linux agpgart interface v0.103
Nov 07 19:22:18 pve kernel: loop: module loaded
Nov 07 19:22:18 pve kernel: tun: Universal TUN/TAP device driver, 1.6
Nov 07 19:22:18 pve kernel: PPP generic driver version 2.4.2
Nov 07 19:22:18 pve kernel: i8042: PNP: PS/2 Controller [PNP0303:PS2K,PNP0f13:PS2M] at 0x60,0x64 irq 1,12
Nov 07 19:22:18 pve kernel: serio: i8042 KBD port at 0x60,0x64 irq 1
Nov 07 19:22:18 pve kernel: serio: i8042 AUX port at 0x60,0x64 irq 12
Nov 07 19:22:18 pve kernel: mousedev: PS/2 mouse device common for all mice
Nov 07 19:22:18 pve kernel: rtc_cmos 00:04: RTC can wake from S4
Nov 07 19:22:18 pve kernel: rtc_cmos 00:04: registered as rtc0
Nov 07 19:22:18 pve kernel: rtc_cmos 00:04: setting system clock to 2023-11-07T11:22:14 UTC (1699356134)
Nov 07 19:22:18 pve kernel: rtc_cmos 00:04: alarms up to one month, y3k, 242 bytes nvram
Nov 07 19:22:18 pve kernel: i2c_dev: i2c /dev entries driver
Nov 07 19:22:18 pve kernel: device-mapper: core: CONFIG_IMA_DISABLE_HTABLE is disabled. Duplicate IMA measurements will not be recorded in the IMA log.
Nov 07 19:22:18 pve kernel: device-mapper: uevent: version 1.0.3
Nov 07 19:22:18 pve kernel: device-mapper: ioctl: 4.47.0-ioctl (2022-07-28) initialised: dm-devel@redhat.com
Nov 07 19:22:18 pve kernel: platform eisa.0: Probing EISA bus 0
Nov 07 19:22:18 pve kernel: platform eisa.0: EISA: Cannot allocate resource for mainboard
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 1
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 2
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 3
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 4
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 5
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 6
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 7
Nov 07 19:22:18 pve kernel: platform eisa.0: Cannot allocate resource for EISA slot 8
Nov 07 19:22:18 pve kernel: platform eisa.0: EISA: Detected 0 cards
Nov 07 19:22:18 pve kernel: intel_pstate: Intel P-state driver initializing
Nov 07 19:22:18 pve kernel: intel_pstate: HWP enabled
Nov 07 19:22:18 pve kernel: ledtrig-cpu: registered to indicate activity on CPUs
Nov 07 19:22:18 pve kernel: intel_pmc_core INT33A1:00:  initialized
Nov 07 19:22:18 pve kernel: drop_monitor: Initializing network drop monitor service
Nov 07 19:22:18 pve kernel: NET: Registered PF_INET6 protocol family
Nov 07 19:22:18 pve kernel: Freeing initrd memory: 60428K
Nov 07 19:22:18 pve kernel: Segment Routing with IPv6
Nov 07 19:22:18 pve kernel: In-situ OAM (IOAM) with IPv6
Nov 07 19:22:18 pve kernel: NET: Registered PF_PACKET protocol family
Nov 07 19:22:18 pve kernel: Bridge firewalling registered
Nov 07 19:22:18 pve kernel: Key type dns_resolver registered
Nov 07 19:22:18 pve kernel: microcode: Microcode Update Driver: v2.2.
Nov 07 19:22:18 pve kernel: IPI shorthand broadcast: enabled
Nov 07 19:22:18 pve kernel: sched_clock: Marking stable (893757734, 5835167)->(857453601, 42139300)
Nov 07 19:22:18 pve kernel: registered taskstats version 1
Nov 07 19:22:18 pve kernel: Loading compiled-in X.509 certificates
Nov 07 19:22:18 pve kernel: zswap: loaded using pool lzo/zbud
Nov 07 19:22:18 pve kernel: Key type .fscrypt registered
Nov 07 19:22:18 pve kernel: Key type fscrypt-provisioning registered
Nov 07 19:22:18 pve kernel: Key type encrypted registered
Nov 07 19:22:18 pve kernel: AppArmor: AppArmor sha1 policy hashing enabled
Nov 07 19:22:18 pve kernel: ima: No TPM chip found, activating TPM-bypass!
Nov 07 19:22:18 pve kernel: Loading compiled-in module X.509 certificates
Nov 07 19:22:18 pve kernel: Loaded X.509 cert 'Build time autogenerated kernel key: cbd4c3bc22c475622d2a9fe0319649be83ac4145'
Nov 07 19:22:18 pve kernel: ima: Allocated hash algorithm: sha1
Nov 07 19:22:18 pve kernel: ima: No architecture policies found
Nov 07 19:22:18 pve kernel: evm: Initialising EVM extended attributes:
Nov 07 19:22:18 pve kernel: evm: security.selinux
Nov 07 19:22:18 pve kernel: evm: security.SMACK64
Nov 07 19:22:18 pve kernel: evm: security.SMACK64EXEC
Nov 07 19:22:18 pve kernel: evm: security.SMACK64TRANSMUTE
Nov 07 19:22:18 pve kernel: evm: security.SMACK64MMAP
Nov 07 19:22:18 pve kernel: evm: security.apparmor
Nov 07 19:22:18 pve kernel: evm: security.ima
Nov 07 19:22:18 pve kernel: evm: security.capability
Nov 07 19:22:18 pve kernel: evm: HMAC attrs: 0x1
Nov 07 19:22:18 pve kernel: PM:   Magic number: 15:544:377
Nov 07 19:22:18 pve kernel: RAS: Correctable Errors collector initialized.
Nov 07 19:22:18 pve kernel: Freeing unused decrypted memory: 2036K
Nov 07 19:22:18 pve kernel: Freeing unused kernel image (initmem) memory: 4600K
Nov 07 19:22:18 pve kernel: Write protecting the kernel read-only data: 34816k
Nov 07 19:22:18 pve kernel: Freeing unused kernel image (rodata/data gap) memory: 1968K
Nov 07 19:22:18 pve kernel: x86/mm: Checked W+X mappings: passed, no W+X pages found.
Nov 07 19:22:18 pve kernel: x86/mm: Checking user space page tables
Nov 07 19:22:18 pve kernel: x86/mm: Checked W+X mappings: passed, no W+X pages found.
Nov 07 19:22:18 pve kernel: Run /init as init process
Nov 07 19:22:18 pve kernel:   with arguments:
Nov 07 19:22:18 pve kernel:     /init
Nov 07 19:22:18 pve kernel:   with environment:
Nov 07 19:22:18 pve kernel:     HOME=/
Nov 07 19:22:18 pve kernel:     TERM=linux
Nov 07 19:22:18 pve kernel:     BOOT_IMAGE=/boot/vmlinuz-6.2.16-3-pve
Nov 07 19:22:18 pve kernel: ahci 0000:00:17.0: version 3.0
Nov 07 19:22:18 pve kernel: ahci 0000:00:17.0: SSS flag set, parallel bus scan disabled
Nov 07 19:22:18 pve kernel: ahci 0000:00:17.0: AHCI 0001.0301 32 slots 3 ports 6 Gbps 0x7 impl SATA mode
Nov 07 19:22:18 pve kernel: ahci 0000:00:17.0: flags: 64bit ncq stag pm led clo only pio slum part deso sadm sds apst 
Nov 07 19:22:18 pve kernel: scsi host0: ahci
Nov 07 19:22:18 pve kernel: scsi host1: ahci
Nov 07 19:22:18 pve kernel: scsi host2: ahci
Nov 07 19:22:18 pve kernel: ata1: SATA max UDMA/133 abar m2048@0xdff06000 port 0xdff06100 irq 128
Nov 07 19:22:18 pve kernel: ata2: SATA max UDMA/133 abar m2048@0xdff06000 port 0xdff06180 irq 128
Nov 07 19:22:18 pve kernel: ata3: SATA max UDMA/133 abar m2048@0xdff06000 port 0xdff06200 irq 128
Nov 07 19:22:18 pve kernel: e1000e: Intel(R) PRO/1000 Network Driver
Nov 07 19:22:18 pve kernel: e1000e: Copyright(c) 1999 - 2015 Intel Corporation.
Nov 07 19:22:18 pve kernel: e1000e 0000:01:00.0: enabling device (0000 -> 0002)
Nov 07 19:22:18 pve kernel: e1000e 0000:01:00.0: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
Nov 07 19:22:18 pve kernel: e1000e 0000:01:00.0 0000:01:00.0 (uninitialized): registered PHC clock
Nov 07 19:22:18 pve kernel: e1000e 0000:01:00.0 eth0: (PCI Express:2.5GT/s:Width x1) 00:e0:67:15:02:c0
Nov 07 19:22:18 pve kernel: e1000e 0000:01:00.0 eth0: Intel(R) PRO/1000 Network Connection
Nov 07 19:22:18 pve kernel: e1000e 0000:01:00.0 eth0: MAC: 4, PHY: 8, PBA No: FFFFFF-0FF
Nov 07 19:22:18 pve kernel: e1000e 0000:02:00.0: enabling device (0000 -> 0002)
Nov 07 19:22:18 pve kernel: e1000e 0000:02:00.0: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
Nov 07 19:22:18 pve kernel: e1000e 0000:02:00.0 0000:02:00.0 (uninitialized): registered PHC clock
Nov 07 19:22:18 pve kernel: e1000e 0000:02:00.0 eth1: (PCI Express:2.5GT/s:Width x1) 00:e0:67:15:02:c1
Nov 07 19:22:18 pve kernel: e1000e 0000:02:00.0 eth1: Intel(R) PRO/1000 Network Connection
Nov 07 19:22:18 pve kernel: e1000e 0000:02:00.0 eth1: MAC: 4, PHY: 8, PBA No: FFFFFF-0FF
Nov 07 19:22:18 pve kernel: e1000e 0000:03:00.0: enabling device (0000 -> 0002)
Nov 07 19:22:18 pve kernel: e1000e 0000:03:00.0: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
Nov 07 19:22:18 pve kernel: tsc: Refined TSC clocksource calibration: 2711.998 MHz
Nov 07 19:22:18 pve kernel: clocksource: tsc: mask: 0xffffffffffffffff max_cycles: 0x27178451938, max_idle_ns: 440795251172 ns
Nov 07 19:22:18 pve kernel: clocksource: Switched to clocksource tsc
Nov 07 19:22:18 pve kernel: e1000e 0000:03:00.0 0000:03:00.0 (uninitialized): registered PHC clock
Nov 07 19:22:18 pve kernel: ata1: SATA link up 6.0 Gbps (SStatus 133 SControl 300)
Nov 07 19:22:18 pve kernel: ata1.00: ACPI cmd f5/00:00:00:00:00:00(SECURITY FREEZE LOCK) filtered out
Nov 07 19:22:18 pve kernel: ata1.00: ACPI cmd b1/c1:00:00:00:00:00(DEVICE CONFIGURATION OVERLAY) filtered out
Nov 07 19:22:18 pve kernel: ata1.00: ATA-9: SAMSUNG MZMTE256HMHP-00005, EXT4400Q, max UDMA/133
Nov 07 19:22:18 pve kernel: ata1.00: NCQ Send/Recv Log not supported
Nov 07 19:22:18 pve kernel: ata1.00: 500118192 sectors, multi 16: LBA48 NCQ (depth 32), AA
Nov 07 19:22:18 pve kernel: ata1.00: Features: Dev-Sleep
Nov 07 19:22:18 pve kernel: ata1.00: ACPI cmd f5/00:00:00:00:00:00(SECURITY FREEZE LOCK) filtered out
Nov 07 19:22:18 pve kernel: ata1.00: ACPI cmd b1/c1:00:00:00:00:00(DEVICE CONFIGURATION OVERLAY) filtered out
Nov 07 19:22:18 pve kernel: ata1.00: NCQ Send/Recv Log not supported
Nov 07 19:22:18 pve kernel: ata1.00: configured for UDMA/133
Nov 07 19:22:18 pve kernel: ahci 0000:00:17.0: port does not support device sleep
Nov 07 19:22:18 pve kernel: scsi 0:0:0:0: Direct-Access     ATA      SAMSUNG MZMTE256 400Q PQ: 0 ANSI: 5
Nov 07 19:22:18 pve kernel: sd 0:0:0:0: Attached scsi generic sg0 type 0
Nov 07 19:22:18 pve kernel: sd 0:0:0:0: [sda] 500118192 512-byte logical blocks: (256 GB/238 GiB)
Nov 07 19:22:18 pve kernel: sd 0:0:0:0: [sda] Write Protect is off
Nov 07 19:22:18 pve kernel: sd 0:0:0:0: [sda] Mode Sense: 00 3a 00 00
Nov 07 19:22:18 pve kernel: sd 0:0:0:0: [sda] Write cache: enabled, read cache: enabled, doesn't support DPO or FUA
Nov 07 19:22:18 pve kernel: sd 0:0:0:0: [sda] Preferred minimum I/O size 512 bytes
Nov 07 19:22:18 pve kernel: e1000e 0000:03:00.0 eth2: (PCI Express:2.5GT/s:Width x1) 00:e0:67:15:02:c2
Nov 07 19:22:18 pve kernel: e1000e 0000:03:00.0 eth2: Intel(R) PRO/1000 Network Connection
Nov 07 19:22:18 pve kernel: e1000e 0000:03:00.0 eth2: MAC: 4, PHY: 8, PBA No: FFFFFF-0FF
Nov 07 19:22:18 pve kernel: e1000e 0000:04:00.0: enabling device (0000 -> 0002)
Nov 07 19:22:18 pve kernel: e1000e 0000:04:00.0: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
Nov 07 19:22:18 pve kernel:  sda: sda1 sda2 sda3
Nov 07 19:22:18 pve kernel: sd 0:0:0:0: [sda] Attached SCSI disk
Nov 07 19:22:18 pve kernel: e1000e 0000:04:00.0 0000:04:00.0 (uninitialized): registered PHC clock
Nov 07 19:22:18 pve kernel: e1000e 0000:04:00.0 eth3: (PCI Express:2.5GT/s:Width x1) 00:e0:67:15:02:c3
Nov 07 19:22:18 pve kernel: e1000e 0000:04:00.0 eth3: Intel(R) PRO/1000 Network Connection
Nov 07 19:22:18 pve kernel: e1000e 0000:04:00.0 eth3: MAC: 4, PHY: 8, PBA No: FFFFFF-0FF
Nov 07 19:22:18 pve kernel: e1000e 0000:05:00.0: enabling device (0000 -> 0002)
Nov 07 19:22:18 pve kernel: e1000e 0000:05:00.0: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
Nov 07 19:22:18 pve kernel: e1000e 0000:05:00.0 0000:05:00.0 (uninitialized): registered PHC clock
Nov 07 19:22:18 pve kernel: e1000e 0000:05:00.0 eth4: (PCI Express:2.5GT/s:Width x1) 00:e0:67:15:02:c4
Nov 07 19:22:18 pve kernel: e1000e 0000:05:00.0 eth4: Intel(R) PRO/1000 Network Connection
Nov 07 19:22:18 pve kernel: e1000e 0000:05:00.0 eth4: MAC: 4, PHY: 8, PBA No: FFFFFF-0FF
Nov 07 19:22:18 pve kernel: e1000e 0000:06:00.0: enabling device (0000 -> 0002)
Nov 07 19:22:18 pve kernel: e1000e 0000:06:00.0: Interrupt Throttling Rate (ints/sec) set to dynamic conservative mode
Nov 07 19:22:18 pve kernel: e1000e 0000:06:00.0 0000:06:00.0 (uninitialized): registered PHC clock
Nov 07 19:22:18 pve kernel: ata2: SATA link down (SStatus 4 SControl 300)
Nov 07 19:22:18 pve kernel: e1000e 0000:06:00.0 eth5: (PCI Express:2.5GT/s:Width x1) 00:e0:67:15:02:c5
Nov 07 19:22:18 pve kernel: e1000e 0000:06:00.0 eth5: Intel(R) PRO/1000 Network Connection
Nov 07 19:22:18 pve kernel: e1000e 0000:06:00.0 eth5: MAC: 4, PHY: 8, PBA No: FFFFFF-0FF
Nov 07 19:22:18 pve kernel: ata3: SATA link down (SStatus 4 SControl 300)
Nov 07 19:22:18 pve kernel: i801_smbus 0000:00:1f.4: SPD Write Disable is set
Nov 07 19:22:18 pve kernel: i801_smbus 0000:00:1f.4: SMBus using PCI interrupt
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.1: [8086:9d20] type 00 class 0x058000
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.1: reg 0x10: [mem 0xfd000000-0xfdffffff 64bit]
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.1: Adding to iommu group 18
Nov 07 19:22:18 pve kernel: xhci_hcd 0000:00:14.0: xHCI Host Controller
Nov 07 19:22:18 pve kernel: xhci_hcd 0000:00:14.0: new USB bus registered, assigned bus number 1
Nov 07 19:22:18 pve kernel: pci 0000:00:1f.1: Removing from iommu group 18
Nov 07 19:22:18 pve kernel: xhci_hcd 0000:00:14.0: hcc params 0x200077c1 hci version 0x100 quirks 0x0000000081109810
Nov 07 19:22:18 pve kernel: e1000e 0000:05:00.0 enp5s0: renamed from eth4
Nov 07 19:22:18 pve kernel: xhci_hcd 0000:00:14.0: xHCI Host Controller
Nov 07 19:22:18 pve kernel: xhci_hcd 0000:00:14.0: new USB bus registered, assigned bus number 2
Nov 07 19:22:18 pve kernel: xhci_hcd 0000:00:14.0: Host supports USB 3.0 SuperSpeed
Nov 07 19:22:18 pve kernel: usb usb1: New USB device found, idVendor=1d6b, idProduct=0002, bcdDevice= 6.02
Nov 07 19:22:18 pve kernel: usb usb1: New USB device strings: Mfr=3, Product=2, SerialNumber=1
Nov 07 19:22:18 pve kernel: usb usb1: Product: xHCI Host Controller
Nov 07 19:22:18 pve kernel: usb usb1: Manufacturer: Linux 6.2.16-3-pve xhci-hcd
Nov 07 19:22:18 pve kernel: usb usb1: SerialNumber: 0000:00:14.0
Nov 07 19:22:18 pve kernel: hub 1-0:1.0: USB hub found
Nov 07 19:22:18 pve kernel: hub 1-0:1.0: 12 ports detected
Nov 07 19:22:18 pve kernel: i2c i2c-0: 2/4 memory slots populated (from DMI)
Nov 07 19:22:18 pve kernel: usb usb2: New USB device found, idVendor=1d6b, idProduct=0003, bcdDevice= 6.02
Nov 07 19:22:18 pve kernel: usb usb2: New USB device strings: Mfr=3, Product=2, SerialNumber=1
Nov 07 19:22:18 pve kernel: usb usb2: Product: xHCI Host Controller
Nov 07 19:22:18 pve kernel: usb usb2: Manufacturer: Linux 6.2.16-3-pve xhci-hcd
Nov 07 19:22:18 pve kernel: usb usb2: SerialNumber: 0000:00:14.0
Nov 07 19:22:18 pve kernel: i2c i2c-0: Successfully instantiated SPD at 0x50
Nov 07 19:22:18 pve kernel: hub 2-0:1.0: USB hub found
Nov 07 19:22:18 pve kernel: hub 2-0:1.0: 6 ports detected
Nov 07 19:22:18 pve kernel: i2c i2c-0: Successfully instantiated SPD at 0x52
Nov 07 19:22:18 pve kernel: e1000e 0000:04:00.0 enp4s0: renamed from eth3
Nov 07 19:22:18 pve kernel: e1000e 0000:06:00.0 enp6s0: renamed from eth5
Nov 07 19:22:18 pve kernel: e1000e 0000:03:00.0 enp3s0: renamed from eth2
Nov 07 19:22:18 pve kernel: e1000e 0000:01:00.0 enp1s0: renamed from eth0
Nov 07 19:22:18 pve kernel: e1000e 0000:02:00.0 enp2s0: renamed from eth1
Nov 07 19:22:18 pve kernel: raid6: avx2x4   gen() 34383 MB/s
Nov 07 19:22:18 pve kernel: raid6: avx2x2   gen() 34826 MB/s
Nov 07 19:22:18 pve kernel: raid6: avx2x1   gen() 29467 MB/s
Nov 07 19:22:18 pve kernel: raid6: using algorithm avx2x2 gen() 34826 MB/s
Nov 07 19:22:18 pve kernel: raid6: .... xor() 20746 MB/s, rmw enabled
Nov 07 19:22:18 pve kernel: raid6: using avx2x2 recovery algorithm
Nov 07 19:22:18 pve kernel: xor: automatically using best checksumming function   avx       
Nov 07 19:22:18 pve kernel: Btrfs loaded, crc32c=crc32c-intel, zoned=yes, fsverity=yes
Nov 07 19:22:18 pve kernel: EXT4-fs (dm-1): mounted filesystem c42157fb-441f-487c-97d1-71bb6e51f4f2 with ordered data mode. Quota mode: none.
Nov 07 19:22:18 pve systemd: Inserted module 'autofs4'
Nov 07 19:22:18 pve systemd: systemd 252.6-1 running in system mode (+PAM +AUDIT +SELINUX +APPARMOR +IMA +SMACK +SECCOMP +GCRYPT -GNUTLS +OPENSSL +ACL +BLKID +CURL +ELFUTILS +FIDO2 +IDN2 -IDN +IPTC +KMOD +LIBCRYPTSETUP +LIBFDISK +PCRE2 -PWQUALITY +P11KIT +QRENCODE +TPM2 +BZIP2 +LZ4 +XZ +ZLIB +ZSTD -BPF_FRAMEWORK -XKBCOMMON +UTMP +SYSVINIT default-hierarchy=unified)
Nov 07 19:22:18 pve systemd: Detected architecture x86-64.
Nov 07 19:22:18 pve systemd: Hostname set to <pve>.
Nov 07 19:22:18 pve systemd: Queued start job for default target graphical.target.
Nov 07 19:22:18 pve systemd: Created slice system-getty.slice - Slice /system/getty.
Nov 07 19:22:18 pve systemd: Created slice system-modprobe.slice - Slice /system/modprobe.
Nov 07 19:22:18 pve systemd: Created slice system-postfix.slice - Slice /system/postfix.
Nov 07 19:22:18 pve systemd: Created slice system-systemd\x2dfsck.slice - Slice /system/systemd-fsck.
Nov 07 19:22:18 pve systemd: Created slice user.slice - User and Session Slice.
Nov 07 19:22:18 pve systemd: Started systemd-ask-password-console.path - Dispatch Password Requests to Console Directory Watch.
Nov 07 19:22:18 pve systemd: Started systemd-ask-password-wall.path - Forward Password Requests to Wall Directory Watch.
Nov 07 19:22:18 pve systemd: Set up automount proc-sys-fs-binfmt_misc.automount - Arbitrary Executable File Formats File System Automount Point.
Nov 07 19:22:18 pve systemd: Reached target ceph-fuse.target - ceph target allowing to start/stop all ceph-fuse@.service instances at once.
Nov 07 19:22:18 pve systemd: Reached target ceph.target - ceph target allowing to start/stop all ceph*@.service instances at once.
Nov 07 19:22:18 pve systemd: Reached target cryptsetup.target - Local Encrypted Volumes.
Nov 07 19:22:18 pve systemd: Reached target integritysetup.target - Local Integrity Protected Volumes.
Nov 07 19:22:18 pve systemd: Reached target paths.target - Path Units.
Nov 07 19:22:18 pve systemd: Reached target slices.target - Slice Units.
Nov 07 19:22:18 pve systemd: Reached target time-set.target - System Time Set.
Nov 07 19:22:18 pve systemd: Reached target veritysetup.target - Local Verity Protected Volumes.
Nov 07 19:22:18 pve systemd: Listening on dm-event.socket - Device-mapper event daemon FIFOs.
Nov 07 19:22:18 pve systemd: Listening on lvm2-lvmpolld.socket - LVM2 poll daemon socket.
Nov 07 19:22:18 pve systemd: Listening on rpcbind.socket - RPCbind Server Activation Socket.
Nov 07 19:22:18 pve systemd: Listening on systemd-fsckd.socket - fsck to fsckd communication Socket.
Nov 07 19:22:18 pve systemd: Listening on systemd-initctl.socket - initctl Compatibility Named Pipe.
Nov 07 19:22:18 pve systemd: Listening on systemd-journald-audit.socket - Journal Audit Socket.
Nov 07 19:22:18 pve systemd: Listening on systemd-journald-dev-log.socket - Journal Socket (/dev/log).
Nov 07 19:22:18 pve systemd: Listening on systemd-journald.socket - Journal Socket.
Nov 07 19:22:18 pve systemd: Listening on systemd-udevd-control.socket - udev Control Socket.
Nov 07 19:22:18 pve systemd: Listening on systemd-udevd-kernel.socket - udev Kernel Socket.
Nov 07 19:22:18 pve systemd: Mounting dev-hugepages.mount - Huge Pages File System...
Nov 07 19:22:18 pve systemd: Mounting dev-mqueue.mount - POSIX Message Queue File System...
Nov 07 19:22:18 pve systemd: Mounting sys-kernel-debug.mount - Kernel Debug File System...
Nov 07 19:22:18 pve systemd: Mounting sys-kernel-tracing.mount - Kernel Trace File System...
Nov 07 19:22:18 pve systemd: auth-rpcgss-module.service - Kernel Module supporting RPCSEC_GSS was skipped because of an unmet condition check (ConditionPathExists=/etc/krb5.keytab).
Nov 07 19:22:18 pve systemd: Starting keyboard-setup.service - Set the console keyboard layout...
Nov 07 19:22:18 pve systemd: Starting kmod-static-nodes.service - Create List of Static Device Nodes...
Nov 07 19:22:18 pve systemd: Starting lvm2-monitor.service - Monitoring of LVM2 mirrors, snapshots etc. using dmeventd or progress polling...
Nov 07 19:22:18 pve systemd: Starting modprobe@configfs.service - Load Kernel Module configfs...
Nov 07 19:22:18 pve systemd: Starting modprobe@dm_mod.service - Load Kernel Module dm_mod...
Nov 07 19:22:18 pve systemd: Starting modprobe@drm.service - Load Kernel Module drm...
Nov 07 19:22:18 pve systemd: Starting modprobe@efi_pstore.service - Load Kernel Module efi_pstore...
Nov 07 19:22:18 pve systemd: Starting modprobe@fuse.service - Load Kernel Module fuse...
Nov 07 19:22:18 pve systemd: Starting modprobe@loop.service - Load Kernel Module loop...
Nov 07 19:22:18 pve systemd: systemd-fsck-root.service - File System Check on Root Device was skipped because of an unmet condition check (ConditionPathExists=!/run/initramfs/fsck-root).
Nov 07 19:22:18 pve kernel: pstore: Using crash dump compression: deflate
Nov 07 19:22:18 pve systemd: Starting systemd-journald.service - Journal Service...
Nov 07 19:22:18 pve kernel: pstore: Registered efi_pstore as persistent store backend
Nov 07 19:22:18 pve systemd: Starting systemd-modules-load.service - Load Kernel Modules...
Nov 07 19:22:18 pve systemd: Starting systemd-remount-fs.service - Remount Root and Kernel File Systems...
Nov 07 19:22:18 pve systemd: Starting systemd-udev-trigger.service - Coldplug All udev Devices...
Nov 07 19:22:18 pve systemd: Mounted dev-hugepages.mount - Huge Pages File System.
Nov 07 19:22:18 pve systemd: Mounted dev-mqueue.mount - POSIX Message Queue File System.
Nov 07 19:22:18 pve systemd: Mounted sys-kernel-debug.mount - Kernel Debug File System.
Nov 07 19:22:18 pve systemd: Mounted sys-kernel-tracing.mount - Kernel Trace File System.
Nov 07 19:22:18 pve systemd: Finished keyboard-setup.service - Set the console keyboard layout.
Nov 07 19:22:18 pve systemd: Finished kmod-static-nodes.service - Create List of Static Device Nodes.
Nov 07 19:22:18 pve systemd: modprobe@configfs.service: Deactivated successfully.
Nov 07 19:22:18 pve systemd: Finished modprobe@configfs.service - Load Kernel Module configfs.
Nov 07 19:22:18 pve systemd: modprobe@dm_mod.service: Deactivated successfully.
Nov 07 19:22:18 pve systemd: Finished modprobe@dm_mod.service - Load Kernel Module dm_mod.
Nov 07 19:22:18 pve systemd: modprobe@efi_pstore.service: Deactivated successfully.
Nov 07 19:22:18 pve systemd: Finished modprobe@efi_pstore.service - Load Kernel Module efi_pstore.
Nov 07 19:22:18 pve systemd: modprobe@fuse.service: Deactivated successfully.
Nov 07 19:22:18 pve systemd: Finished modprobe@fuse.service - Load Kernel Module fuse.
Nov 07 19:22:18 pve systemd: modprobe@loop.service: Deactivated successfully.
Nov 07 19:22:18 pve systemd: Finished modprobe@loop.service - Load Kernel Module loop.
Nov 07 19:22:18 pve systemd: Mounting sys-fs-fuse-connections.mount - FUSE Control File System...
Nov 07 19:22:18 pve systemd: Mounting sys-kernel-config.mount - Kernel Configuration File System...
Nov 07 19:22:18 pve systemd: systemd-repart.service - Repartition Root Disk was skipped because no trigger condition checks were met.
Nov 07 19:22:18 pve systemd: Mounted sys-kernel-config.mount - Kernel Configuration File System.
Nov 07 19:22:18 pve systemd: Mounted sys-fs-fuse-connections.mount - FUSE Control File System.
Nov 07 19:22:18 pve kernel: ACPI: bus type drm_connector registered
Nov 07 19:22:18 pve systemd: modprobe@drm.service: Deactivated successfully.
Nov 07 19:22:18 pve systemd: Finished modprobe@drm.service - Load Kernel Module drm.
Nov 07 19:22:18 pve kernel: EXT4-fs (dm-1): re-mounted c42157fb-441f-487c-97d1-71bb6e51f4f2. Quota mode: none.
Nov 07 19:22:18 pve systemd: Finished systemd-remount-fs.service - Remount Root and Kernel File Systems.
Nov 07 19:22:18 pve systemd: systemd-firstboot.service - First Boot Wizard was skipped because of an unmet condition check (ConditionFirstBoot=yes).
Nov 07 19:22:18 pve systemd: systemd-pstore.service - Platform Persistent Storage Archival was skipped because of an unmet condition check (ConditionDirectoryNotEmpty=/sys/fs/pstore).
Nov 07 19:22:18 pve systemd: Starting systemd-random-seed.service - Load/Save Random Seed...
Nov 07 19:22:18 pve systemd: Starting systemd-sysusers.service - Create System Users...
Nov 07 19:22:18 pve kernel: VFIO - User Level meta-driver version: 0.3
Nov 07 19:22:18 pve systemd: Started dm-event.service - Device-mapper event daemon.
Nov 07 19:22:18 pve systemd: Finished systemd-random-seed.service - Load/Save Random Seed.
Nov 07 19:22:18 pve systemd: first-boot-complete.target - First Boot Complete was skipped because of an unmet condition check (ConditionFirstBoot=yes).
Nov 07 19:22:18 pve systemd: Finished systemd-sysusers.service - Create System Users.
Nov 07 19:22:18 pve systemd: Starting systemd-tmpfiles-setup-dev.service - Create Static Device Nodes in /dev...
Nov 07 19:22:18 pve kernel: spl: loading out-of-tree module taints kernel.
Nov 07 19:22:18 pve kernel: znvpair: module license 'CDDL' taints kernel.
Nov 07 19:22:18 pve kernel: Disabling lock debugging due to kernel taint
Nov 07 19:22:18 pve systemd: Finished systemd-tmpfiles-setup-dev.service - Create Static Device Nodes in /dev.
Nov 07 19:22:18 pve systemd: Starting systemd-udevd.service - Rule-based Manager for Device Events and Files...
Nov 07 19:22:18 pve systemd-journald[348]: Journal started
Nov 07 19:22:18 pve systemd-journald[348]: Runtime Journal (/run/log/journal/0cc9347330104bc28ba4493c0a06400b) is 8.0M, max 320.1M, 312.1M free.
Nov 07 19:22:18 pve systemd-modules-load[349]: Inserted module 'vfio'
Nov 07 19:22:18 pve dmeventd[361]: dmeventd ready for processing.
Nov 07 19:22:18 pve systemd-modules-load[349]: Inserted module 'vfio_pci'
Nov 07 19:22:18 pve dmeventd[361]: Monitoring thin pool pve-data-tpool.
Nov 07 19:22:18 pve systemd-modules-load[349]: Failed to find module 'vfio_virqfd'
Nov 07 19:22:18 pve systemd-modules-load[349]: Inserted module 'vhost_net'
Nov 07 19:22:18 pve lvm[341]:   13 logical volume(s) in volume group "pve" monitored
Nov 07 19:22:18 pve systemd: Started systemd-journald.service - Journal Service.
Nov 07 19:22:18 pve systemd-udevd[370]: Using default interface naming scheme 'v252'.
Nov 07 19:22:19 pve lvm[462]: PV /dev/sda3 online, VG pve is complete.
Nov 07 19:22:19 pve lvm[462]: VG pve finished
Nov 07 19:22:19 pve systemd[1]: Starting systemd-journal-flush.service - Flush Journal to Persistent Storage...
Nov 07 19:22:19 pve systemd[1]: Started systemd-udevd.service - Rule-based Manager for Device Events and Files.
Nov 07 19:22:19 pve systemd[1]: Finished lvm2-monitor.service - Monitoring of LVM2 mirrors, snapshots etc. using dmeventd or progress polling.
Nov 07 19:22:19 pve systemd[1]: Finished systemd-udev-trigger.service - Coldplug All udev Devices.
Nov 07 19:22:19 pve kernel: ee1004 0-0050: 512 byte EE1004-compliant SPD EEPROM, read-only
Nov 07 19:22:19 pve kernel: ee1004 0-0052: 512 byte EE1004-compliant SPD EEPROM, read-only
Nov 07 19:22:19 pve kernel: input: PC Speaker as /devices/platform/pcspkr/input/input6
Nov 07 19:22:19 pve kernel: mei_me 0000:00:16.0: enabling device (0000 -> 0002)
Nov 07 19:22:19 pve systemd-journald[348]: Time spent on flushing to /var/log/journal/0cc9347330104bc28ba4493c0a06400b is 13.386ms for 982 entries.
-- Reboot --
```
