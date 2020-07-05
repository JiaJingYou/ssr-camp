const express = require('express') 
const puppeteer = require('puppeteer') 
const axios = require('axios') 
const app = express()

async function test() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.taobao.com/')
    await page.screenshot({path: 'taobao.png'})
    await browser.close()
}
test()
app.get('*', async (req, res) => {
    if(req.url == '/favicon.ico') {
        return res.send({code:0})
    }
    const url = 'http://localhost:9093/' + req.url
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: ['networkidle0']
    })
    const html = await page.content()
    res.send(html)
})
app.listen(8081, ()=>{
    console.log('ssr server start');
    
})