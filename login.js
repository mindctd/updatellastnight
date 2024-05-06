var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "accounts",
});
var app = express();
app.use("/login.css", express.static("login.css"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});
app.post('/auth', function (request, response) {
  var username = request.body.username;
  var password = request.body.password;
  if (username && password) {
    connection.query(
    'select * from accounts where username=? and password =?',
      [username, password],
      function (error, results, fields) {
        if (results.lenght > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect('/home');
        } else {
          response.send('Incorrect Username and/or Password');
        }
        response.end();
      }
    );
  } else {
    request.send('Please enter Username and Password');
    response.end();
  }
});

app.get('/home', function(request,response){
    if (request.session.loggedin){
        response.send('Welcome,'+ request.session.username + '!');

    }else{
        response.send('Please login to view this page');
    }
     response.end();
});
app.listen(3000);