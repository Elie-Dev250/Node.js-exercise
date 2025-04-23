const { error } = require('console')
const fs=require('fs')

const book='jaavaaaaaaaaaaaaaaaaaaaaa'
 




fs.writeFile('booking',book,(error)=>{
    if(error){
        console.log(error)
        return;
    } 
    console.log("sucess written")
})

const multply=require('./fabr')
const memery=multply(2,7)
console.log(memery)






const database= require ('fs')
const data ='Manirakiza fABRIZE'
database.writeFile('clikhere.txt',data,(error)=>{
    if(error){
        console.log(error)
    }
    console.log('successfully')
    })


const http=require('http')


const server=http.createServer((req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain')
    res.end("hello again am coming right now")
})
server.listen(3000)
console.log(`my server is running on : http://localhost:3000`)














