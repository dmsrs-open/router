
# handle_request_update: Could not read RRD file

notice: RRDC update error Or RDC create error

```log
Dec 28 11:21:56 pm-81 rrdcached[4513]: handle_request_update: Could not read RRD file.
Dec 28 11:21:56 pm-81 pmxcfs[4527]: [status] notice: RRDC update error /var/lib/rrdcached/db/pve2-vm/85235: -1
Dec 28 11:21:56 pm-81 pmxcfs[4527]: [status] notice: RRD update error /var/lib/rrdcached/db/pve2-vm/85235: mmaping file '/var/lib/rrdcached/db/pve2-vm/85235': Invalid argument
Dec 28 11:21:56 pm-81 rrdcached[4513]: handle_request_update: Could not read RRD file.
Dec 28 11:21:56 pm-81 pmxcfs[4527]: [status] notice: RRDC update error /var/lib/rrdcached/db/pve2-vm/85237: -1
Dec 28 11:21:56 pm-81 pmxcfs[4527]: [status] notice: RRD update error /var/lib/rrdcached/db/pve2-vm/85237: mmaping file '/var/lib/rrdcached/db/pve2-vm/85237': Invalid argument
Dec 28 11:22:07 pm-81 rrdcached[4513]: handle_request_update: Could not read RRD file.
Dec 28 11:22:07 pm-81 pmxcfs[4527]: [status] notice: RRDC update error /var/lib/rrdcached/db/pve2-vm/85237: -1
Dec 28 11:22:07 pm-81 pmxcfs[4527]: [status] notice: RRD update error /var/lib/rrdcached/db/pve2-vm/85237: mmaping file '/var/lib/rrdcached/db/pve2-vm/85237': Invalid argument
Dec 28 11:22:07 pm-81 rrdcached[4513]: handle_request_update: Could not read RRD file.
Dec 28 11:22:07 pm-81 pmxcfs[4527]: [status] notice: RRDC update error /var/lib/rrdcached/db/pve2-vm/85235: -1
Dec 28 11:22:07 pm-81 pmxcfs[4527]: [status] notice: RRD update error /var/lib/rrdcached/db/pve2-vm/85235: mmaping file '/var/lib/rrdcached/db/pve2-vm/85235': Invalid argument
Dec 28 11:22:16 pm-81 rrdcached[4513]: handle_request_update: Could not read RRD file.
Dec 28 11:22:16 pm-81 pmxcfs[4527]: [status] notice: RRDC update error /var/lib/rrdcached/db/pve2-vm/85235: -1
Dec 28 11:22:16 pm-81 pmxcfs[4527]: [status] notice: RRD update error /var/lib/rrdcached/db/pve2-vm/85235: mmaping file '/var/lib/rrdcached/db/pve2-vm/85235': Invalid argument
Dec 28 11:22:16 pm-81 rrdcached[4513]: handle_request_update: Could not read RRD file.
Dec 28 11:22:16 pm-81 pmxcfs[4527]: [status] notice: RRDC update error /var/lib/rrdcached/db/pve2-vm/85237: -1
```

解决办法

```bash
rm -r /var/lib/rrdcached/db
systemctl restart rrdcached.service
```
