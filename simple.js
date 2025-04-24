const {Client}=require('pg')
const express=require('express')

const app=express()
app.use(express.json())

const con=new Client({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"0786690541@Elie",
    database:"Student"
})

con.connect().then(()=>console.log("connected"))


app.post('/postData',(req,res)=>{


const {name,id}=req.body

const insert_query='INSERT INTO student(name,id) VALUES($1,$2)'
con.query(insert_query,[name,id],(error,result)=>{
    if(error){
        res.send(error)
        console.error(error)
    }
    else{
        res.send('POSTED DATA')
        console.log(result)
    }
})


})


app.get('/fetchData',(req,res)=>{
    const query="SELECT * FROM student"
    con.query(query,(error,result)=>{
        if(error){
            res.send(error)
        }
        else{
            res.send(result.rows)
            console.log(result)
        }
    })
})

app.get('/fetchbyid/:id',(req,res)=>{
    const id=req.params.id
    const fetch_query1="SELECT * FROM student WHERE id= $1"
    con.query(fetch_query1,[id],(error,result)=>{
        if(error){
            res.send(error)

        }else{
            res.send(result.rows[0])
        }
    })
})

app.put('update/:id',(req,res)=>{
    const id=req.params.id;
    const name=req.body.name;

    const updated_query="UPDATE student SET name=$1 WHERE id=$2"
    con.query(updated_query,[name,id],(error,result)=>{
        if(error){
            res.send(error)
        }else{
            res.send("UPDATED")
        }
    })
})

app.listen(3000,()=>{
    console.log('server is running....')
})






