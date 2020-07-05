
let express = require('express')
const app = express()

app.get('/api/user/list', (req, res)=>{
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    // res.header('Content-Type', 'application/json; charset=utf-8')
    res.json({
        code:0,
        list: [{
            name: 'youjiajing0', id: 1
        }, {
            name: 'youjiajing1', id: 2
        }, {
            name: 'youjiajing2', id: 3
        },{
            name: 'youjiajing3', id: 4
        }]
    })
})
app.get('/api/user/info', (req, res)=>{
    // res.header('Access-Control-Allow-Origin', '*')
    // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    // res.header('Content-Type', 'application/json; charset=utf-8')
    res.json({
        code:0,
        info: {
            name:'牛牛',
            work: '前端开发' 
        }
    })
})
app.listen(9090, ()=>{
    console.log('mock启动完毕');
    
})