import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import routes from '../src/App'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {createProxyMiddleware} from 'http-proxy-middleware'
import {getServerStore } from '../src/store/store'
import Header from '../src/component/Header'
import path from 'path'
import fs from 'fs'
import config from './config'
const store = getServerStore();
const app = express()

app.use(express.static('public'))
//客户端来的请求
app.use(
    '/api',
    createProxyMiddleware({target: 'http://localhost:9090', changeOrigin: true})
)
app.get('*', (req, res) => {
    // if(req.query._mode === 'csr'){
    //     const filename = path.resolve(process.cwd(), 'public/index.csr.html')
    //     const html = fs.readFileSync(filename, 'utf-8')
    //     return res.send(html)
    // }
    //配置开关开启csr
    if(config.csr){
        const filename = path.resolve(process.cwd(), 'public/index.csr.html')
        const html = fs.readFileSync(filename, 'utf-8')
        return res.send(html)
    }
    //负载过高，开启csr
    //根据路由渲染出的组件，拿到loadData方法 获取数据
    const promises = [];
    routes.some(route=>{
        const match = matchPath(req.path, route)
        if (match) {
            const {loadData} = route.component
            if(loadData) {
                //规避报错
                const promise = new Promise((resolve, reject) => {
                    loadData(store).then(resolve).catch(resolve)
                })
                promises.push(promise)
            }
            
        }
        return match
    })
    //等待所有网络请求在渲染
    Promise.all(promises).then(()=>{
        //css
        const context = {
            css: []
        }
        //把react组件解析成html
        const content = renderToString(
            
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header></Header>
                    {routes.map(route=><Route  {...route}>
                       
                    </Route>)}
                </StaticRouter>
            </Provider>
        )

        const css = context.css.join('\n')
        res.send(`
        <html>
            <head>
                <meta charset="utf-8">
                <title>react ssr </title>
                <style>
                     ${css}   
                </style>
            </head>
            <body>
                <div id="root">${content} </div>
                <script>
                    window.__context = ${JSON.stringify(store.getState())}
                </script>
                <script src="/bundle.js"></script>
            </body>
        </html>
        `)
    })
    
})

app.listen(9093, ()=>{
    console.log('监听完毕');
    
})