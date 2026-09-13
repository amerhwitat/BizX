package scanner
import("net";"strings")
func Classify(s string)string{ ip:=net.ParseIP(s); if ip!=nil && (ip.IsPrivate()||ip.IsLoopback()||ip.IsLinkLocalUnicast()){return "local/intranet"}; return "public" }
func Authorized(s string,allow []string)bool{ if Classify(s)!="public" {return true}; for _,a:=range allow{if strings.TrimSpace(a)==s{return true}}; return false }
