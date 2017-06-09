var proxy=require('http-proxy').createProxyServer({});
proxy.on(function(err,req,res){
  res.writeHead(500,{
       'Content-Type':'text/plain'
  });
});
var server=require('http').createServer(function(req,res){
  var host= req.headers.host;
  switch(host){
    case 'www.zhishangzhi.com:6060':
      proxy.web(req,res,{target:'http://129.189.199.235:6060'});
      break;
    case 'zhishangzhi.com:6060':
      proxy.web(req,res,{target:'http://129.189.199.235:6060'});
      break;
    case 'www.zhishangzhi.com':
      proxy.web(req,res,{target:'http://129.189.199.235:3030'});
      break;
    case 'zhishangzhi.com':
      proxy.web(req,res,{target:'http://129.189.199.235:3030'});
      break;
    case 'www.zhishangzhi.com:3000':
      proxy.web(req,res,{target:'http://129.189.199.235:3000'});
      break;
    case 'zhishangzhi.com:3000':
      proxy.web(req,res,{target:'http://129.189.199.235:3000'});
      break;
    default: 
      res.writeHead(200, { 
          'Content-Type': 'text/plain' 
      }); 
      res.end('Welcome to my server!');
  }
});
console.log("listening on port 80");
server.listen(80);