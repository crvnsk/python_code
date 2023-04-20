import argparse
import os
import sys

from scapy.utils import RawPcapReader
from scapy.layers.l2 import Ether, ARP
from scapy.layers.inet import IP

def process_pcap(file_name):
    print('Opening {}...'.format(file_name))

    count = 0
    ip_packet_count = 0
    arp_packet_count = 0

    for (pkt_data, pkt_metadata, ) in RawPcapReader(file_name):
        count += 1

        ether_pkt = Ether(pkt_data)
        
        if ether_pkt.type == 0x0800:
            ip_pkt = ether_pkt[IP]
            print('{} [SrcIP: {} - DstIP: {}]'.format(count, ip_pkt.src, ip_pkt.dst))
            ip_packet_count += 1
            continue       
        
        if ether_pkt.type == 0x0806:
            arp_pkt = ether_pkt[ARP]
            print('{} [SrcMAC: {} - DstMAC: {}]'.format(count, arp_pkt.hwsrc, arp_pkt.hwdst))
            arp_packet_count += 1
            continue              

    print('{} file contains {} packets ({} ip, {} arp)'.
          format(file_name, count, ip_packet_count, arp_packet_count))

if __name__ == '__main__':
    
    parser = argparse.ArgumentParser(description='PCAP reader')
    parser.add_argument('--pcap', metavar='<pcap file name>',
                        help='pcap file to parse', required=True)
    args = parser.parse_args()
    
    file_name = args.pcap
    if not os.path.isfile(file_name):
        print('"{}" does not exist'.format(file_name), file=sys.stderr)
        sys.exit(-1)

    process_pcap(file_name)
    sys.exit(0)