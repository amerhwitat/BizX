from ipaddress import ip_address, ip_network
import socket
PRIVATE = [ip_network('10.0.0.0/8'), ip_network('172.16.0.0/12'), ip_network('192.168.0.0/16'), ip_network('127.0.0.0/8'), ip_network('169.254.0.0/16')]
def classify(ip): return 'local/intranet' if any(ip_address(ip) in n for n in PRIVATE) else 'public'
def authorized(ip, cfg): return classify(ip) != 'public' or ip in cfg.get('public',{}).get('allowlistedTargets',[])
def inspect(ip,cfg):
    if cfg.get('authorizedOnly',True) and not authorized(ip,cfg): raise PermissionError('Public target is not allowlisted')
    try: names=socket.gethostbyaddr(ip)[0:1]
    except OSError: names=()
    return {'ip':ip,'scope':classify(ip),'authorized':True,'reverseDns':list(names)}
