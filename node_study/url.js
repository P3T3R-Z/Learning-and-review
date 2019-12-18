//url模块
var url=require('url');

/*
url.parse()解析url
url.format(urlObject) url.parse的逆向操作
url.resolve(from, to) 添加或者替换地址
*/

var parsedata=url.parse("http://www.baidu.com?age=20")
console.log(parsedata)
var urls={
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: 'www.baidu.com',
    port: null,
    hostname: 'www.baidu.com',
    hash: null,
    search: '?age=20',
    query: 'age=20',
    pathname: '/',
    path: '/?age=20',
    href: 'http://www.baidu.com/?age=20' }
    console.log(url.format(urls))


//添加
    console.log(url.resolve("http://www.baidu.com/", "news"))

    
//替换
console.log(url.resolve("http://www.baidu.com/as", "news"))