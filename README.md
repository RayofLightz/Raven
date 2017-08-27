# Raven
An ARP poisoning packet sniffer

# install
download dependences
```bash
sudo apt-get install libpcap-dev
```
and
```bash
git clone https://github.com/RayofLightz/Raven
npm install -g
```
# usage
first run
```bash
echo 1 >> /proc/sys/net/ipv4/ip_forward
```
this allows for your box to forward traffic

then run as root (not sudo)
```bash
raven <gateway ip> <target>
```
# tcp filter
```bash
raven <gateway ip> <target> -t
```
it dose not matter where -t is as long as it is in the command
