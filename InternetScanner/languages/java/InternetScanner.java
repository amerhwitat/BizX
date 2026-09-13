package bizx.internetscanner;
import java.net.*; import java.util.*;
public final class InternetScanner {
 public static String classify(String s)throws Exception{ InetAddress a=InetAddress.getByName(s); return (a.isAnyLocalAddress()||a.isLoopbackAddress()||a.isLinkLocalAddress()||a.isSiteLocalAddress())?"local/intranet":"public"; }
 public static boolean authorized(String s, Set<String> allow)throws Exception { return !classify(s).equals("public")||allow.contains(s); }
}
