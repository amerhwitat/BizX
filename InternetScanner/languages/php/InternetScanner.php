<?php
namespace BizX\InternetScanner;
final class InternetScanner { public static function classify(string $ip):string { if(filter_var($ip,FILTER_VALIDATE_IP,FILTER_FLAG_IPV4)===false)return 'public'; if(filter_var($ip,FILTER_VALIDATE_IP,FILTER_FLAG_NO_PRIV_RANGE|FILTER_FLAG_NO_RES_RANGE)!==false)return 'public'; return 'local/intranet'; } public static function authorized(string $ip,array $allow):bool{return self::classify($ip)!=='public'||in_array($ip,$allow,true);} }
