import React from 'react'
import {renderToString} from 'react-dom/server'
import express from 'express'
import routes from '../src/App'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import {getServerStore } from '../src/store/store'
import Header from '../src/component/Header'
const store = getServerStore();
const app = express()
app.use(express.static('public'))
app.get('*', (req, res) => {
    //根据路由渲染出的组件，拿到loadData方法 获取数据
    const promises = [];
    routes.some(route=>{
        const match = matchPath(req.path, route)
        if (match) {
            const {loadData} = route.component
            if(loadData) {
                promises.push(loadData(store))
            }
            
        }
        return match
    })
    //等待所有网络请求在渲染
    Promise.all(promises).then(()=>{
        //把react组件解析成html
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <Header></Header>
                    {routes.map(route=><Route  {...route}>
                       
                    </Route>)}
                </StaticRouter>
            </Provider>
        )
        res.send(`
        <html>
            <head>
                <meta charset="utf-8">
                <title>react ssr </title>
        
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