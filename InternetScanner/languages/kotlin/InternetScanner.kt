package bizx.internetscanner
import java.net.InetAddress
object InternetScanner {
 fun classify(ip:String):String { val a=InetAddress.getByName(ip); return if(a.isAnyLocalAddress||a.isLoopbackAddress||a.isLinkLocalAddress||a.isSiteLocalAddress) "local/intranet" else "public" }
 fun authorized(ip:String,allow:Set<String>)=classify(ip)!="public"||allow.contains(ip)
}
