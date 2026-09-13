#include <iostream>
#include <cstdlib>
#ifdef _WIN32
#include <winsock2.h>
#pragma comment(lib,"Ws2_32.lib")
#else
#include <arpa/inet.h>
#include <sys/socket.h>
#include <unistd.h>
#endif
int main(){int port=8787;if(const char*e=std::getenv("NETWORK_API_PORT"))port=std::atoi(e);std::cout<<"{\"schema\":\"bizx.network.api.v1\",\"implementation\":\"cpp\",\"port\":"<<port<<",\"endpoints\":[\"catalog\",\"health\",\"config\",\"interfaces\",\"classify\",\"authorize\",\"tcp-check\"]}\n";std::cout<<"scope 127.0.0.1 = local/intranet\n";
#ifdef _WIN32
WSADATA w; WSAStartup(MAKEWORD(2,2),&w);
#endif
int s=socket(AF_INET,SOCK_STREAM,0);sockaddr_in a{};a.sin_family=AF_INET;a.sin_port=htons(port);inet_pton(AF_INET,"127.0.0.1",&a.sin_addr);bool ok=connect(s,(sockaddr*)&a,sizeof(a))==0;std::cout<<"local API port reachable = "<<(ok?"true":"false")<<"\n";
#ifdef _WIN32
closesocket(s);WSACleanup();
#else
close(s);
#endif
}
