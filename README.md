# ssr-camp
react-ssr redux 同构

## ssr思路：
      1.同构架构
      2.puppeteer实现ssr
      
## 1.同构架构思想
### 1.
## SSR，CSR
      能够做到用户量较少的时候使用ssr，用户量大切换到csr
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
            const { createProxyMiddleware } = require('http-proxy-middleware');
            app.use(
                '/api',
                createProxyMiddleware({target: 'http://localhost:9090', changeOrigin: true})
            )
## css支持
      node端documnet报错问题：
      webpack.server.js：
            isomorphic-style-loader(解决同构问题的style-loader)
            use: ['isomorphic-style-loader', 'css-loader']
      
      细节优化：
            use: ['isomorphic-style-loader', {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    } ]
            高阶组件：
            function withStyle(Comp, styles) {
                return function (props) {
                    if(props.staticContext) {
                        props.staticContext.css.push(styles._getCss())
                    }
                    return <Comp {...props}></Comp>
                }
            }
## 放弃seo的降级渲染实现优化
      设置ssr开关，用户量的的情况下关闭ssr，打开csr
      
      webpack.client.js：
          plugins:[
              new HtmlWebpackPlugin({
                  filename: 'index.csr.html',
                  template: 'src/index.csr.html',
                  inject: true
              })
          ]
      client/index.js：
            if(window.__context){
                //ssr
                ReactDom.hydrate(Page, document.getElementById('root'))
            } else {
                //csr
                ReactDom.render(Page, document.getElementById('root'))
            }
      server/index.js：
            if(req.query._mode = 'csr'){
                    const filename = path.resolve(process.cwd(), 'public/index.csr.html')
                    const html = fs.readFileSync(filename, 'utf-8')
                    return res.send(html)
                }
## 2.puppeteer实现ssr

      const url = 'http://localhost:9093/' + req.url
          const browser = await puppeteer.launch()
          const page = await browser.newPage()
          await page.goto(url, {
              waitUntil: ['networkidle0']
          })
          const html = await page.content()
          res.send(html)
