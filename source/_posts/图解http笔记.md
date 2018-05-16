---
title: 图解http笔记
date: 2018-05-16 22:36:11
toc: true
tags:
    - http
---

- FTP：文件传输协议
- DNS：域名系统
- TCP: 传输控制协议
- UDP: 用户数据报协议
- URI：统一资源标识符
- URL：统一资源定位符，是URI的子集

<!--more-->

## 一、
### TCP/IP
- 把与互联网相关联的协议集合起来总称为 TCP/IP
- 分为四层：应用层、传输层、网络层和数据链路层
    - 应用层：决定了向用户提供应用服务时通信的活动。(FTP,DNS,HTTP)
    - 传输层：传输层对上层应用层，提供处于网络连接中的两台计算机之间的数据传输。(TCP,UDP)
    - 网络层: 网络层用来处理在网络上流动的数据包。该层规定了通过怎样的路径（所谓的传输路线）到达对方计算机，并把数据包传送给对方。(IP协议)
    - 链路层：用来处理连接网络的硬件部分

### IP、TCP和DNS
##### IP协议
- 作用是把各种数据包传送给对方。
- IP 地址指明了节点被分配到的地址，MAC 地址是指网卡所属的固定地址。IP 地址可以和 MAC 地址进行配对。IP 地址可变换，但 MAC地址基本上不会更改。

##### TCP协议
- 三次握手
    - 发送(SYN)
    - 确认，回传（SYN/ACK）
    - 发送表示收到(ACK)
- 四次挥手

##### DNS服务
DNS 协议提供通过域名查找 IP 地址，或逆向从 IP 地址反查域名的服务。

## 二、HTTP
HTTP协议用于客户端和服务器之间的通信

- 请求报文：
    - 请求行：请求方法，请求URI，协议版本
    - 可选的请求首部字段
    - 内容实体
- 请求报文：
    - 报文首部：
        - 请求行
        - HTTP首部：请求首部字段，通用首部字段，实体首部字段等
    - 报文主体
```
//方法 URI 协议版本
POST /form/entry HTTP/1.1
// 请求首部字段
Host: hackr.jp
Connection: keep-alive
Content-Type: appclication/x-www-form-urlencoded
Content-Length: 16
// 内容实体
name=ueno&age=37
```
- 响应报文：
    -  状态行：协议版本，状态码，状态描述
    -  可选的响应首部字段
    -  实体主体
- 响应报文：
    - 报文首部
        - 状态行
        - HTTP首部字段：响应首部字段，通用首部字段，实体首部字段等
    - 报文主体
```
HTTP、1.1 200 OK
Date: Tue, 10 Jul 2016 06:50:15 GMT
Content-Length: 362
Content-Type: text/html

// 资源实体的主体(entity body)
<html>
...
```
##### 无状态
HTTP不保存状态(无状态)的协议，不对通信状态进行保存
##### 请求URI定位资源
##### HTTP方法
- GET：获取资源：指定的资源经服务器端解析后返回响应内容
    - 若get一个网站，只返回选择的时间以后更新过的页面资源，如果没有更新则返回304
- POST:传输实体的主体
- PUT：传输文件，(自身不带验证机制)
- HEAD：获得报文首部(请求行/状态行+首部字段)
- DELETE：删除文件，按请求URI删除指定的资源，(自身不带验证机制)
- OPTIONS：询问支持的方法
- TRACE：追踪路径，可以设置Max-Forwards来设置传输次数
- CONNECT：要求用隧道协议连接代理

### 持久连接
当发送请求一份包含多张图片的HTML页面，会产生大量的开销
##### 持久连接
- 持久连接的特点是， 只要任意一端没有明确提出断开连接， 则保持 TCP 连接状态。
- 在HTTP/1.1中，所有的连接默认都是持久连接。在1.0中不是。

### Cookie
Cookie会根据从服务器端发送的响应报文内的一个叫做 Set-Cookie 的首部字段信息， 通知客户端保存 Cookie。
```
// 响应报文（服务器端生成 Cookie 信息）
HTTP/1.1 200 OK
Date: Thu, 12 Jul 2012 07:12:20 GMT
Server: Apache
＜Set-Cookie: sid=1342077140226724; path=/; expires=Wed,
10-Oct-12 07:12:20 GMT＞
Content-Type: text/plain; charset=UTF-8
```
```
// 请求报文（自动发送保存着的 Cookie 信息）
GET /image/ HTTP/1.1
Host: hackr.jp
Cookie: sid=1342077140226724
```

## 三、HTTP报文内的HTTP信息
请求和响应是怎样运作的
### HTTP报文
- 用于 HTTP 协议交互的信息被称为 HTTP 报文。 
- 请求端（客户端） 的HTTP 报文叫做请求报文
- 响应端（服务器端） 的叫做响应报文。
- HTTP 报文本身是由多行（用 CR+LF 作换行符） 数据构成的字符串文本。

### 编码提升传输速率
- 报文主体和实体主体
- 压缩传输的内容编码
- 分割发送的分块传输编码

### 发送多种数据
```
multipart/form-data //在 Web 表单文件上传时使用。
multipart/byteranges    //状态码 206（Partial Content， 部分内容） 响应报文包含了多个范围的内容时使用。
multipart/form-data
multipart/byteranges
```

### 获取部分内容的范围请求
例如：图片下载了一半，中断后再下载另一半
```
GET /tip.jpg HTTP/1.1
Host: www.usagidesign.jp
Range: bytes=5001-10000 //一个10000字节的，可以只下载后一半

Range:butes=5001-   //5001后面的全部
Range: bytes=-3000, 5000-7000   //从一开始到 3000 字节和 5000~7000 字节的多重范围
```

### 内容协商返回最合适的内容
- 例如：浏览器默认语言是中文或英文，则网站显示为中文或英文的版式
- 以请求报文中的某些头部字段来判断
    ```
    Accept
    Accept-Charset
    Accept-Encoding
    Accept-Language
    Content-Language
    ```
- 可以通过与无服务、客户端、服务器和客户端的形式协商


## 四、HTTP状态码

状态码 | 类别 | 原因短语
---|---|---
1XX | Informational（信息性状态码） | 接收的请求正在处理
2XX | Success（成功状态码） | 请求正常处理完毕
3XX | Redirection（重定向状态码） | 需要进行附加操作以完成请求
4XX | Client Error（客户端错误状态码） | 服务器无法处理请求
5XX | Server Error（服务器错误状态码） | 服务器处理请求出错

## 五、与HTTP协作的Web服务器
- 代理：代理是一种有转发功能的应用程序，它扮演了位于服务器和客户端“中间人”的角色，接收由客户端发送的请求并转发给服务器， 同时也接收服务器返回的响应并转发给客户端。
- 网关：网关是转发其他服务器通信数据的服务器，接收从客户端发送来的请求时，它就像自己拥有资源的源服务器一样对请求进行处理。 有时客户端可能都不会察觉，自己的通信目标是一个网关。
- 隧道：隧道是在相隔甚远的客户端和服务器两者之间进行中转， 并保持双方通信连接的应用程序。

#### 1.代理：
- 每次通过代理服务器转发请求或响应时， 会追加写入 Via 首部信息
- 使用代理的优势：
    - 利用缓存技术减少网络带宽的流量
    - 组织内部针对特定网站的访问控制
    - 以获取访问日志为主要目的
    - 等等
- 使用方法：
    - 是否使用缓存
    - 是否会修改报文
- 缓存代理：
    - 代理转发响应时， 缓存代理（Caching Proxy） 会预先将资源的副本（缓存） 保存在代理服务器上。
    - 当代理再次接收到对相同资源的请求时， 就可以不从源服务器那里获取资源， 而是将之前缓存的资源作为响应返回。
- 透明代理：
    - 转发请求或响应时， 不对报文做任何加工的代理类型被称为透明代理。

#### 2. 网关
- 利用网关可以由 HTTP 请求转化为其他协议通信
- 利用网关能提高通信的安全性， 因为可以在客户端与网关之间的通信线路上加密以确保连接的安全。

#### 3. 隧道
- 隧道可按要求建立起一条与其他服务器的通信线路， 届时使用 SSL等加密手段进行通信。 
- 隧道的目的是确保客户端能与服务器进行安全的通信。
- 隧道本身不会去解析 HTTP 请求。 也就是说， 请求保持原样中转给之后的服务器。 隧道会在通信双方断开连接时结束。

### 缓存
- 缓存有有效期
- 缓存不仅可以存在于缓存服务器内，还可以存在客户端浏览器中。

## 六、HTTP首部
首部字段是为了给浏览器和服务器提供报文主体大小、 所使用的语言、 认证信息等内容。

#### 首部字段结构
结构：
```
首部字段名：字段值
```
结构例子：
```
Content-Type:text/html  // 表示报文主体的对象类型
```
字段值对应单个HTTP首部字段可以有多个值
```
Keep-Alive: timeout=15, max=100
```

> 首部字段重复时，不同浏览器的结果可能不一致

#### 4种首部字段类型
- 通用首部字段
- 请求首部字段
    - 补充了请求的附加内容、 客户端信息、 响应内容相关优先级等信息。
- 响应首部字段
    - 补充了响应的附加内容， 也会要求客户端附加额外的内容信息。
- 实体首部字段
    - 补充了资源内容更新时间等与实体有关的信息。

###### 1. 通用首部字段

首部字段名 | 说明
---|---
Cache-Control | 控制缓存的行为
Connection | 逐跳首部、 连接的管理
Date | 创建报文的日期时间
Pragma | 报文指令
Trailer | 报文末端的首部一览
Transfer-Encoding | 指定报文主体的传输编码方式
Upgrade | 升级为其他协议
Via | 代理服务器的相关信息
Warning | 错误通知

###### 2. 请求首部字段
首部字段名 | 说明
---|---
Accept | 用户代理可处理的媒体类型
Accept-Charset | 优先的字符集
Accept-Encoding | 优先的内容编码
Accept-Language | 优先的语言（自然语言）
Authorization | Web认证信息
Expect | 期待服务器的特定行为
From | 用户的电子邮箱地址
Host | 请求资源所在服务器
If-Match | 比较实体标记（ETag）
If-Modified-Since | 比较资源的更新时间
If-None-Match | 比较实体标记（与 If-Match 相反）
If-Range | 资源未更新时发送实体 Byte 的范围请求
If-Unmodified-Since | 比较资源的更新时间（与If-Modified-Since相反）
Max-Forwards | 最大传输逐跳数
Proxy-Authorization | 代理服务器要求客户端的认证信息
Range | 实体的字节范围请求
Referer | 对请求中 URI 的原始获取方
TE | 传输编码的优先级
User-Agent | HTTP 客户端程序的信息

###### 3.响应首部字段
首部字段名 | 说明
---|---
Accept-Ranges | 是否接受字节范围请求
Age | 推算资源创建经过时间
ETag | 资源的匹配信息
Location | 令客户端重定向至指定URI
Proxy-Authenticate | 代理服务器对客户端的认证信息
Retry-After | 对再次发起请求的时机要求
Server | HTTP服务器的安装信息
Vary | 代理服务器缓存的管理信息
WWW-Authenticate | 服务器对客户端的认证信息

###### 4. 实体首部字段
首部字段名 | 说明
---|---
Allow | 资源可支持的HTTP方法
Content-Encoding | 实体主体适用的编码方式
Content-Language | 实体主体的自然语言
Content-Length | 实体主体的大小（单位： 字节）
Content-Location | 替代对应资源的URI
Content-MD5 | 实体主体的报文摘要
Content-Range | 实体主体的位置范围
Content-Type | 实体主体的媒体类型
Expires | 实体主体过期的日期时间
Last-Modified | 资源的最后修改日期时间

#### HTTP1.1 首部字段
###### 通用首部
```
Cache-Control: public
Cache-Control: public
Cache-Control: no-cache=Location
Cache-Control: no-store
```
- Cache-Control：操作缓存的工作机制
    - 表示是否能缓存的指令
        - public指令：明确表明其他用户也可利用缓存。
        - private:响应只以特定的用户作为对象，
        - no-cache：防止从缓存中返回过期的资源。
        - no-store: 暗示请求（和对应的响应） 或响应中包含机密信息。
    - 指定缓存期限和认证的指令
        - s-maxage:
        - max-age: 如果判定缓存资源的缓存时间数值比指定时间的数值更小， 那么客户端就接收缓存的资源.
            - 当服务器返回的响应中包含max-age指令时，缓存服务器将不对资源的有效性再作确认，而max-age数值代表资源保存为缓存的最长时间。
            - s-maxage指令的功能和max-age指令的相同，它们的不同点是smaxage指令只适用于供多位用户使用的公共缓存服务器。也就是说，对于向同一用户重复返回响应的服务器来说，这个指令没有任何作用.另外， 当使用 s-maxage指令后， 则直接忽略对 Expires 首部字段及max-age 指令的处理。
            - 应用 HTTP/1.1 版本的缓存服务器遇到同时存在 Expires首部字段的情况时，会优先处理 max-age 指令，而忽略掉Expires首部字段。而HTTP/1.0版本的缓存服务器的情况却相反，max-age 指令会被忽略
        - min-fresh: 要求缓存服务器返回至少还未过指定时间的缓存资源
        - max-stale: 可指示缓存资源，即使过期也照常接收。
        - only-if-cached: 客户端仅在缓存服务器本地缓存目标资源的情况下才会要求其返回
        - must-revalidate:代理会向源服务器再次验证即将返回的响应缓存目前是否仍然有效
        - proxy-revalidate:所有的缓存服务器在接收到客户端带有该指令的请求返回响应之前，必须再次验证缓存的有效性。
        - no-transform: 无论是在请求还是响应中，缓存都不能改变实体主体的媒体类型。(这样做可防止缓存或代理压缩图片等类似操作。)
- Connection:
    - 控制不再转发给代理的首部字段；
    - 管理持久连接(因为HTTP/1.1 版本的默认连接都是持久连接)
- Date：表明创建 HTTP 报文的日期和时间
- Pragma：历史遗留字段
- Trailer：事先说明在报文主体后记录了哪些首部字段
- Transfer-Encoding：规定了传输报文主体时采用的编码方式
- Upgrade：用于检测 HTTP 协议及其他协议是否可使用更高的版本进行通信
- Via：追踪客户端与服务器之间的请求和响应报文的传输路径。
- Warning：告知用户一些与缓存相关的问题的警告

###### 请求首部字段
- Accept：通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。
- Accept-Charset：通知服务器用户代理支持的字符集及字符集的相对优先顺序
- Accept-Encoding：首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。
- Accept-Language：告知服务器用户代理能够处理的自然语言集（指中文或英文等）
- Authorization：用户代理的认证信息（证书值）(通常解决401问题)
- Expect：所期望的扩展
- From：告知服务器使用用户代理的用户的电子邮件地址
- Host：首部字段 Host 会告知服务器，请求的资源所处的互联网主机名和端口号。
    - 虚拟主机运行在同一个 IP 上，因此使用首部字段 Host 加以区分
- If-Match：服务器会比对 If-Match 的字段值和资源的 ETag 值，仅当两者一致时，才会执行请求。
- If-Modified-Since
- If-None-Match
- If-Range
- If-Unmodified-Since
- Max-Forwards

###### 实体首部字段
- Allow：于通知客户端能够支持 Request-URI 指定资源的所有 HTTP 方法。(GET,POST等)
- Content-Encoding：告知客户端服务器对实体的主体部分选用的内容编码方式
- Content-Language
- Content-Length
- Content-Location
- Content-MD5
- Content-Range
- Content-Type：说明了实体主体内对象的媒体类型
- Expires：
- Last-Modified

###### Cookie

属性 | 说明
---|---
NAME=VALUE | 赋予 Cookie 的名称和其值（必需项）
expires=DATE | Cookie 的有效期
path=PATH | 将服务器上的文件目录作为Cookie的适用对象
domain=域名 | 作为 Cookie 适用对象的域名
Secure | 仅在 HTTPS 安全通信时才会发送 Cookie
HttpOnly | 加以限制，使 Cookie 不能被 JavaScript 脚本访问

## 七、HTTPS
- HTTP安全
    - 通信加密：
        - HTTP与SSL/TLS结合，加密通信内容。
    - 内容加密：(仍然有风险)
        - 对HTTP报文里的内容进行加密。
- HTTPS：
    - 性能：因为用了SSL，所以慢。并且可能会大量消耗CPI及内存资源。
    - 需要购买证书

#### 验证身份
SSL不仅提供了加密处理，还是用了证书。所以可以通过确认通信方持有的证书，即可判断通信安全性。

#### HTTP无法证明报文完整性
- HTTP没有任何办法确认， 发出的请求 / 响应和接收到的请求 / 响应是前后相同的。
- 请求或响应在传输途中， 遭攻击者拦截并篡改内容的攻击称为中间人攻击(MITM)

### HTTP+加密+认证+完整性保护=HTTPS
- HTTPS：HTTP先和SSL通信，再右SSL和TCP通信。
- 公钥和私钥：用公钥进行加密，用私钥进行解密。
    - 公钥：可以随意发布
    - 私钥：不能让其他任何人知道，用来解密对应公钥。

## 其他协议
##### WebSocket协议（建立在HTTP基础上）
- 使用浏览器进行全双工通信
- 一旦 Web 服务器与客户端之间建立起WebSocket协议的通信连接，之后所有的通信都依靠这个专用协议进行。通信过程中可互相发送JSON、 XML、 HTML或图片等任意格式的数据。
- 功能：
    - 推送：服务器可以直接发送数据，不必等待客户端的请求
    - 减少通信量：WebSocket的首部信息很小
    - 




