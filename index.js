const { error } = require('console')
const fs=require('fs')
fs.readFile('janvier.js','utf-8',(error,data)=>{
    if(error){
        console.error(error)
        return;
    }
    console.log(data)
})










