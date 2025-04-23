const { error } = require('console')
const filesysytem = require('fs')

filesysytem.readFile('fab.txt','utf-8',(error,data)=>{
    if(error){
        console.error(error)
    }console.log(data)
})



const http = require('http')

const server=http.createServer((req,resp)=>{
    resp.statusCode=200
    resp.setHeader('Content-Type','text/html')
    resp.end('hello wordl')

})
server.listen(3000)
console.log('my server is running on http://localhost:3000')


const path = require('path')


const path1='/user/local/files'
const path2 ='disc'
const fullpath=path.join(path1,path2)
console.log(fullpath)

const os=require('os')
console.log('my platform is',os.platform())
console.log('my cpu am using is',os.arch())
console.log('total memery am using ',os.totalmem())
console.log('my free memory is ',os.freemem())

const crypto=require('crypto')
const hashed=crypto.createHash('sha256')
hashed.update("iradukunda")

const result =hashed.digest('hex')
console.log(result)


const addind=require('./fabr')
const resulut=addind(1,3)
console.log(resulut)