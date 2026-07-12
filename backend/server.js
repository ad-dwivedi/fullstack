require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

// Connect Database
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed");
        console.log(err);
    } else {
        console.log("Database Connected Successfully");
    }
});

// Home Route
app.get("/", (req, res) => {
    res.send("Todo Backend Running...");
});

// Add Task API
app.post("/addTask", (req, res) => {

    const { task } = req.body;

    const sql = "INSERT INTO tasks (task) VALUES (?)";

    db.query(sql, [task], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error");
        }

        res.send("Task Added Successfully");

    });

});

// Get All Tasks API
app.get("/tasks", (req, res) => {

    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).send("Error");
        }

        res.json(result);

    });

});

// Server Start
app.listen(5000, () => {
    console.log("Server Running on http://localhost:5000");
});