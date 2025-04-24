const { Client } = require('pg');
const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());

const connection = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "0786690541@Elie",
    database: "Student"
});

connection.connect().then(() => console.log('Connected'));

app.post('/postData', (req, res) => {
    const { name, id } = req.body;
    const postq = "INSERT INTO doctor(name, id) VALUES ($1, $2)";
    connection.query(postq, [name, id], (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send('POSTED');
            console.log(result);
        }
    });
});

app.get('/fetchData', (req, res) => {
    const fetch_query = "SELECT * FROM doctor";
    connection.query(fetch_query, (error, result) => {
        if (error) {
            console.log(error);
            res.send(error);
        } else {
            res.send(result.rows);
            console.log("Fetched");
        }
    });
});

app.delete('/deleteData/:id', (req, res) => {
    const id = req.params.id;
    const deletequery = "DELETE FROM doctor where id=$1";
    connection.query(deletequery, [id], (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send(result.rows);
            console.log("Deleted");
        }
    });
});

app.get('/fetchbyid/:id', (req, res) => {
    const id = req.params.id;
    const query2 = "SELECT * FROM doctor where id=$1";
    connection.query(query2, [id], (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send(result.rows);
            console.log('SELECTED');
        }
    });
});

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const updatequery = "UPDATE doctor SET name=$1 WHERE id=$2";
    connection.query(updatequery, [name, id], (error, result) => {
        if (error) {
            res.send(error);
        } else {
            res.send("updated");
            console.log(result);
        }
    });
});

app.listen(3000, () => {
    console.log("server is running...");
});
