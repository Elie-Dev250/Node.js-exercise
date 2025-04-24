const {Client}=require('pg')
const cors=require('cors')
const express=require('express')


 const app=express()
 app.use(cors())
 app.use(express.json())
 const con=new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "0786690541@Elie",
    database: "Student"
 })


 con.connect().then(()=>console.log('server is running...'))


 app.post('/posting',(req,res)=>{
    const {username,password}=req.body
    const insert_query="INSERT INTO workers(username,password) VALUES ($1,$2)"
    con.query(insert_query,[username,password],(error,result)=>{
        if(error){
            res.send(error)
        }else{
            res.send('USER POSTED SUCCESSFULL')
            console.log(result)
        }
    })
 })


 app.listen(5000,()=>console.log('my server is running'))