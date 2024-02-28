const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors())
app.use(express.json())

//ROUTES


//create a todo
app.post("/todos", async(req, res) => {
    try{
        const { description } = req.body;
        const result = await pool.query(
            "INSERT INTO todo (description) VALUES($1)  RETURNING *",
         [description]
         );
         const newTodo = result.rows[0];
         res.json(newTodo);
    }
    catch(err) {
        console.error(err.message);
    }
});

// get all todo

app.get("/todos", async(req, res) => {
    try{
        const result = await pool.query(
            "SELECT * FROM todo"
         );
         const newTodo = result.rows;
         res.json(newTodo);
    }
    catch(err) {
        console.error(err.message);
    }
});

//get a todo

app.get("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
         );
         const newTodo = result.rows[0];
         res.json(newTodo);
    }
    catch(err) {
        console.error(err.message);
    }
});

//update a todo

app.put("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const { description } = req.body;
        const result = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
         );
         res.json("Todo was updated");
    }
    catch(err) {
        console.error(err.message);
    }
});


//delete a todo

app.delete("/todos/:id", async(req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
         );f
         res.json("Todo was updated");
    }
    catch(err) {
        console.error(err.message);
    }
});


app.listen(5000, () =>{
    console.log("server has started on port 5000")
})