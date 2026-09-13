using System.Net;
namespace BizX.InternetScanner;
public static class InternetScanner {
 public static string Classify(string ip){ var a=IPAddress.Parse(ip); var b=a.GetAddressBytes(); if(a.AddressFamily==System.Net.Sockets.AddressFamily.InterNetwork && (b[0]==10 || (b[0]==172&&b[1]>=16&&b[1]<=31)||(b[0]==192&&b[1]==168))) return "local/intranet"; if(IPAddress.IsLoopback(a)||a.IsIPv6LinkLocal) return "local/intranet"; return "public"; }
 public static bool Authorized(string ip,ISet<string> allow)=>Classify(ip)!="public"||allow.Contains(ip);
}
