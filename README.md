# ssr-camp
react-ssr redux 同构

## 同构架构思想
### 1.
## SSR，CSR
## concurrently
      将几条启动命令合并执行 npm start
     "start": "concurrently \"npm run dev:client\" \"npm run dev:server\" \"npm run dev:start\" \"npm run dev:mock\""
## Route 
      server
            react-router-dom:<StaticRouter location={req.url}>{App}<StaticRouter>
            
      client
            react-router-dom:<BrowserRouter>{App}<BrowserRouter>

## 数据流redux 同构支持
      redux react-redux redux-thunk axios
      
      server
            数据->初始化store
      client
            didmount->axios
            
      异步获取数据：
            1、首屏的异步数据怎么获取
            2、路由加载时怎么知道哪些数据需要获取
            3、多个数据怎么加载到props里
      ### server层获取异步数据
      ### 关于一个页面两个请求的容错处理
      ### axios代理实现：
      1：
            const serverAxios = axios.create({
                baseURL: 'http://localhost:9090/'
            })
            const clientAxios = axios.create({
                baseURL: '/'
            })
      2：applyMiddleware(thunk.withExtraArgument(serverAxios))
      3：server层做转发
            http-proxy-middleware
            app.use(
                '/api',
                proxy({target: 'http://localhost:9090', changeOrigin: true})
            )
