import Foundation
public enum InternetScanner {
 public static func classify(_ ip:String)->String { guard let a=IPv4Address(ip) else{return "public"}; let o=a.rawValue; if o[0]==10 || (o[0]==172 && (16...31).contains(o[1])) || (o[0]==192 && o[1]==168) || o[0]==127 { return "local/intranet" }; return "public" }
 public static func authorized(_ ip:String, allow:Set<String>)->Bool { classify(ip) != "public" || allow.contains(ip) }
}
