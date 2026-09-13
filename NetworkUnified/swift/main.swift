import Foundation
import Network
let port=Int(ProcessInfo.processInfo.environment["NETWORK_API_PORT"] ?? "8787") ?? 8787
print("{\"schema\":\"bizx.network.api.v1\",\"implementation\":\"swift\",\"port\":\(port),\"endpoints\":[\"catalog\",\"health\",\"config\",\"interfaces\",\"classify\",\"authorize\",\"tcp-check\"]}")
print("scope 127.0.0.1 = local/intranet")
let s=NWConnection(host:NWEndpoint.Host("127.0.0.1"),port:NWEndpoint.Port(integerLiteral: UInt16(port)),using:.tcp);let sem=DispatchSemaphore(value:0);s.stateUpdateHandler={state in switch state{case .ready: print("local API port reachable");sem.signal();case .failed: print("local API port not reachable (normal if server not running)");sem.signal();default:break}};s.start(queue:.global());_ = sem.wait(timeout:.now()+1);s.cancel()
