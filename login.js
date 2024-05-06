const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const app = express();

app.use("/login.css", express.static("login.css"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "customer2",
    port: "3306"
});

connection.connect(function(error) {
    if (error) {
        console.error("Error connecting to database:", error);
    } else {
        console.log("Connected to database successfully!!");
    }
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    connection.query("SELECT * FROM loginuser WHERE user_name = ? AND user_pass = ?", [username, password], function(error, results, fields) {
  
            if (results.length > 0) {
                res.redirect("/welcome");
            } else {
                res.redirect("/");
            }
            res.end();
        })
    });


app.get("/index.html", function(req, res) {
    res.sendFile(__dirname + "/welcome.html");
})

app.listen(4500);