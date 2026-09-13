// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "BizXMobile",
    platforms: [.iOS(.v16)],
    products: [.library(name: "BizXMobile", targets: ["BizXMobile"])],
    targets: [.target(name: "BizXMobile")]
)
