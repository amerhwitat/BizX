use std::net::IpAddr;
use std::str::FromStr;

pub fn classify(s:&str)->Result<&'static str,String>{
 let ip=IpAddr::from_str(s).map_err(|e|e.to_string())?;
 Ok(match ip { IpAddr::V4(v) if v.is_private() || v.is_loopback() || v.is_link_local() => "local/intranet", _=>"public" })
}
pub fn authorized(s:&str, allow:&[String])->bool { classify(s).map(|x| x!="public" || allow.iter().any(|a|a==s)).unwrap_or(false) }
