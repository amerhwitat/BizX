require 'ipaddr'
module BizX
 module InternetScanner
  PRIVATE=[IPAddr.new('10.0.0.0/8'),IPAddr.new('172.16.0.0/12'),IPAddr.new('192.168.0.0/16'),IPAddr.new('127.0.0.0/8'),IPAddr.new('169.254.0.0/16')]
  def self.classify(ip); a=IPAddr.new(ip); PRIVATE.any?{|n|n.include?(a)} ? 'local/intranet' : 'public'; rescue IPAddr::InvalidAddressError; 'public'; end
  def self.authorized(ip,allow); classify(ip)!='public'||allow.include?(ip); end
 end
end
