const express = require('express');
const app = express();
const port = 5000;
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("PERN Todo API is running");
});

//get method
app.get("/todos", async (req, res) => {
    try {
        console.log("GET /todos hit");
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});

//get specific todo
app.get("/todos/:id", async(req,res)=>{
    try {
        const {id} =req.params;
        const todo= await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0]);
        
    } catch (error) {
        console.error(error.nessage);
    }
})

//update
app.put("/todos/:id", async(req,res)=>{
    try {
        const {id}=req.params;
        const {description}=req.body;
        const updateTodo= await pool.query("UPDATE todo SET description=$1 WHERE todo_id=$2", [description,id])
        res.json("todo was updated")
        
    } 
    catch (error) {
        console.error(error.message)
    }
})


//delete

app.delete("/todos/:id", async(req,res)=>{
    try {
        const {id}= req.params;
        const deleteTodo= await pool.query("DELETE FROM todo WHERE todo_id=$1",[id]);
        res.json("todo was deleted")
    } catch (error) {
        console.error(error.message)
    }
})


//post method
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
